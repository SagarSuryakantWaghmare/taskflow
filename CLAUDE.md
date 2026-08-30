# CLAUDE.md

Guidance for working in this repository. Read this first to get the overall picture
before changing code.

## What this project is

**TaskFlow** is a full-stack task management application.

| Part | Stack | Deployed at |
|------|-------|-------------|
| `client/` | React 18 + Vite + Tailwind CSS + shadcn/ui | Vercel |
| `server/` | Node.js + Express + MongoDB (Mongoose) | Render |
| `automation/` | Java 21 + Maven + TestNG + REST Assured + Selenium | Runs locally / CI |

The frontend and backend are written and maintained by the repository owner. The
`automation/` module is a separate Maven project that tests the deployed
application from the outside — it never imports app code.

## Repository layout

```
taskflow/
├── client/         # React frontend (Vite dev server on :5173)
├── server/         # Express API (default :5000)
├── automation/     # Java test automation suite (API + UI)
├── screenshots/    # Images used by README.md
├── package.json    # Root scripts to run client and server together
├── README.md       # Public project documentation
└── CLAUDE.md       # This file
```

## Commands

```bash
# Frontend + backend together (from the repo root)
npm run dev

# Frontend only
cd client && npm run dev

# Backend only
cd server && npm run dev

# Automation - everything
cd automation && mvn test

# Automation - API only (no browser opens)
cd automation && mvn test -Dsuite=testng-api.xml

# Automation - UI only
cd automation && mvn test -Dsuite=testng-ui.xml

# Automation - by group: smoke, regression, api, ui, auth, task, category
cd automation && mvn test -Dgroups=smoke
```

## Backend API contract

All responses are JSON. Protected routes need `Authorization: Bearer <jwt>`.
JWTs are issued at register and login and are valid for 7 days.

### Auth — `/api/auth`

| Method | Path | Auth | Success | Notes |
|--------|------|------|---------|-------|
| POST | `/register` | no | `201` | Returns `data.user` + `data.token`. Duplicate email returns **`401`**, not 409. Missing fields return `400`. |
| POST | `/login` | no | `200` | Returns `data.user` + `data.token`. Bad credentials return `401` *Invalid credentials*. |
| GET | `/profile` | yes | `200` | Returns `data.user`. Password is stripped by the model's `toJSON`. |
| POST | `/logout` | yes | `200` | Stateless — the client just drops the token. |

### Tasks — `/api/todos`

> The UI calls these "tasks" but every route, model and message says **todo**.
> There is no `/api/tasks` endpoint.

| Method | Path | Success | Notes |
|--------|------|---------|-------|
| GET | `/` | `200` | Returns `data.todos` + `data.pagination`. Query params: `page`, `limit`, `completed`, `priority`, `category`, `search`. |
| POST | `/` | `201` | Returns `data.todo`. |
| GET | `/:id` | `200` | `404` *Todo not found* when missing. |
| PUT | `/:id` | `200` | Runs mongoose validators. |
| DELETE | `/:id` | `200` | *Todo deleted successfully*. |
| PATCH | `/:id/toggle` | `200` | Flips `completed`. |

Todo validation rules that tests rely on:

- `title` — required, max 100 characters
- `description` — **required, minimum 10 characters**, max 500
- `priority` — `low` | `medium` | `high`, defaults to `medium`
- `category` — free text, defaults to `general`
- `dueDate` — optional, must be today or in the future

Validation failures come back as `400` with the raw mongoose message.

### Categories — `/api/categories`

| Method | Path | Success | Notes |
|--------|------|---------|-------|
| POST | `/` | `201` | `400` if the name is missing or already used. |
| GET | `/` | `200` | Returns four hard-coded defaults (`Work`, `Personal`, `Shopping`, `Health`) with ids `default-0`…`default-3`, followed by the user's own categories. |
| PUT | `/:id` | `200` | `403` on a `default-*` id, `404` if not owned. |
| DELETE | `/:id` | `200` | `403` on a `default-*` id, `404` if not owned. |

`color` must be a valid hex colour (`#3b82f6`). The default categories exist only
in the controller — they are never stored in MongoDB.

### Auth failure messages

These exact strings are asserted by the automation suite, so do not reword them
without updating the tests:

- No token → `Access denied. No token Provided.`
- Bad token → `Invalid token`
- Bad login → `Invalid credentials`
- Duplicate register → `Account is already existed with this account`

## Frontend notes

- Routes live in `client/src/App.jsx`: `/`, `/login`, `/signup`, `/dashboard`,
  `/about`, `/privacy`, `/terms`, and a catch-all 404.
- `client/src/lib/api.js` is a bare axios instance using `VITE_API_URL`. There is
  no interceptor — each dashboard call attaches the `Authorization` header itself.
- The JWT is kept in `localStorage` under `token`. The dashboard redirects to
  `/login` when it is missing.
- After a successful login the form shows a banner and redirects to `/dashboard`
  **after a 2 second `setTimeout`** — any UI automation must wait for that.
- Form feedback is rendered as plain paragraphs: errors use `text-red-400`,
  successes use `text-green-400`. Dashboard actions raise a toast that lives for
  3 seconds.
- `client/src/pages/dashboard.jsx` is a single large component holding the
  sidebar, task list, kanban view, task modal, category modal and toasts.

## Automation module

Standalone Maven project in `automation/`. It targets the deployed URLs listed in
`src/test/resources/config.properties`.

```
automation/src/test/java/
├── base/     BaseTest (env + logging), ApiBaseTest (request specs), UiBaseTest (browser)
├── pages/    BasePage, LoginPage, SignupPage, DashboardPage
├── tests/    AuthTest, TaskTest, CategoryTest, UiLoginTest, UiSignupTest, UiTaskTest
└── utils/    ConfigReader, DriverManager, TokenManager, TestDataReader
```

Conventions to follow when adding tests:

- **Nothing hard-coded.** URLs, endpoints, credentials and waits come from
  `config.properties` via `ConfigReader`; request payloads come from
  `testdata.json` via `TestDataReader`.
- **API tests extend `ApiBaseTest`** and use `api()` for public calls or
  `authApi()` for protected ones. `TokenManager` logs in once per run and caches
  the JWT — do not add another login call.
- **UI tests extend `UiBaseTest`.** The browser is opened before and quit after
  every test method automatically.
- **Locators belong in `pages/`.** Test classes should only contain the journey
  and the assertions.
- **Tag every test** with `groups` — one of `api`/`ui`, the module
  (`auth`/`task`/`category`) and `smoke` or `regression`.
- **Keep re-runs green.** Anything that creates a unique record (a user, a
  category) must use `TestDataReader.uniqueEmail()` or `uniqueName()`.
- Lifecycle chains (create → read → update → delete) are ordered with TestNG
  `priority` and share state through a private static field.

Suites: `testng.xml` (all), `testng-api.xml`, `testng-ui.xml`. Set
`headless=true` in `config.properties` for a display-less machine.

## Working conventions

- **Commits are authored by the repository owner only.** Do not add
  `Co-Authored-By` trailers or any other AI attribution.
- Use focused commits — build config, framework code, tests and documentation
  each get their own commit rather than one large drop.
- Commit messages use `type(scope): summary` with a short body explaining what
  changed and why.
- Match the surrounding style. The app code is deliberately straightforward, so
  keep tests and helpers simple too rather than introducing heavy abstractions.
- The automation suite runs against the **live deployed** app. Creating data has
  real effect, so tests clean up what they create.
