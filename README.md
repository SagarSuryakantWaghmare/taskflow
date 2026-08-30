# 🚀 TaskFlow - Modern Task Management Application

<div align="center">

![TaskFlow - Modern Task Management Application](screenshots/home.png)

**The ultimate full-stack task management platform** — built with React, Node.js, Express, and MongoDB.
Manage tasks, organize projects, and boost productivity with a beautiful, responsive interface.

### 📊 Project Stats

![Stars](https://img.shields.io/badge/Project-Open%20Source-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Java Tests](https://img.shields.io/badge/Tests-31%20API%20%2B%207%20UI-success?style=flat-square)
![Build](https://img.shields.io/badge/Build-Maven%20%2B%20Vite-orange?style=flat-square)

### 🔗 Quick Links

[![🌐 Live Demo](https://img.shields.io/badge/→-Live%20Demo-0070f3?style=for-the-badge)](https://taskflow-sagar.vercel.app/)
[![📖 Documentation](https://img.shields.io/badge/→-Documentation-34a853?style=for-the-badge)](#-quick-start-guide)
[![🧪 API Tests](https://img.shields.io/badge/→-Test%20Automation-ff6b6b?style=for-the-badge)](#-test-automation)
[![💬 Issues](https://img.shields.io/badge/→-Report%20Issue-d73a49?style=for-the-badge)](https://github.com/SagarSuryakantWaghmare/taskflow/issues)

### 🛠 Tech Stack at a Glance

| Frontend | Backend | Database | Testing | Deployment |
|----------|---------|----------|---------|------------|
| React 18 | Node.js | MongoDB | TestNG + Selenium | Vercel + Render |
| Vite | Express | Mongoose | REST Assured | MongoDB Atlas |
| Tailwind CSS | JWT Auth | Compass | Maven | GitHub Actions |

</div>

---

## ✨ What Makes TaskFlow Special

> **Full-featured task management** meets **production-grade automation**. Not just another todo app — this is a complete MERN stack project with 38+ automated tests, comprehensive API documentation, and deployment-ready architecture.

### 🎯 For Users
- ✅ Organize tasks by priority, category, and due date
- ✅ Track progress with completion status and filtering
- ✅ Beautiful dark-mode UI with responsive design
- ✅ Instant notifications and toast feedback
- ✅ Completely free, no ads, no sign-up walls

### 💻 For Developers
- ✅ **31 REST API tests** — complete auth, task and category coverage
- ✅ **7 UI automation tests** — login, signup, task flows with Selenium
- ✅ **Clean architecture** — separation of concerns, Page Object Model
- ✅ **Fully documented** — API contract, environment setup, run commands
- ✅ **Production deployment** — live on Vercel (frontend) + Render (backend)

## 🎯 What is TaskFlow?

TaskFlow is a **production-ready full-stack task management platform** that demonstrates modern web development best practices. It's not just a feature-complete application — it's a learning resource with a professional automation suite, comprehensive documentation, and deployment infrastructure.

### 🔍 Who's This For?

| Role | Use Case |
|------|----------|
| **Students & Developers** | Learn full-stack development with a real project; study the automation test suite |
| **Teams & Freelancers** | Free, self-hosted alternative to paid task managers with team collaboration |
| **Portfolio Builders** | Production-grade code to showcase in interviews and portfolios |
| **Open Source Contributors** | Well-documented codebase with clear conventions (see `CLAUDE.md`) |

---

## 🚀 Key Highlights

> ### 🎯 The Complete Package
> - **Frontend:** Responsive React dashboard with real-time updates
> - **Backend:** RESTful API with JWT authentication and role validation  
> - **Database:** MongoDB with Mongoose schemas and indexing
> - **Testing:** 38+ automated tests (REST Assured + Selenium) with CI/CD ready
> - **Docs:** API reference, setup guide, and developer playbook included
> - **Deployed:** Live on Vercel (UI) and Render (API) — see it working now

### 📈 Project Statistics

| Metric | Value |
|--------|-------|
| **Lines of Code** | 5000+ (excluding node_modules) |
| **API Endpoints** | 18+ (auth, todos, categories) |
| **Test Coverage** | 31 API tests + 7 UI tests |
| **Automation Frameworks** | Maven, TestNG, REST Assured, Selenium |
| **Documentation Pages** | README + CLAUDE.md + inline comments |
| **Deployment Targets** | Vercel, Render, MongoDB Atlas |

## ⚡ Quick Start (60 seconds)

```bash
# 1. Clone the repository
git clone https://github.com/SagarSuryakantWaghmare/taskflow.git
cd taskflow

# 2. Install and start (frontend + backend together)
npm install
npm run dev

# 3. Open your browser
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000
# Try the demo login: atharvawandhare@gmail.com / 12345678
```

> ✨ **First time?** Full setup instructions are in the [🚀 Quick Start Guide](#-quick-start-guide) below.

---

## ✨ Feature Showcase

### 🎨 **User Interface**
- Dark mode dashboard with glassmorphism design
- Responsive layout (mobile, tablet, desktop)
- Real-time task updates and notifications
- Kanban and list views
- Task filtering by status, priority, category

### 🔐 **Authentication & Security**
- JWT-based stateless authentication
- Secure password hashing with bcrypt
- Protected API endpoints with middleware
- Auto-logout on token expiry
- CORS enabled for cross-origin requests

### 📝 **Task Management**
- Create, read, update, delete (CRUD) operations
- Assign priority levels (low, medium, high)
- Organize by categories and due dates
- Mark tasks complete or archive them
- Search and filter capabilities

### 🤖 **Automation Suite**
- 31 REST API tests with RestAssured
- 7 Selenium UI tests covering auth & tasks
- Page Object Model for maintainability
- TestNG for grouping and prioritization
- Maven profiles for easy suite selection

### 📊 **Backend API**
- 18+ RESTful endpoints
- Comprehensive error handling
- Input validation with Mongoose
- Pagination on list endpoints
- JSON request/response format

---

## 📋 Table of Contents

- [🎯 What is TaskFlow?](#-what-is-taskflow)
- [✨ Features & Benefits](#-features--benefits)
- [🚀 Quick Start Guide](#-quick-start-guide)
- [🎯 Live Demo & Examples](#-live-demo--examples)
- [�️ Technology Stack](#️-technology-stack)
- [📁 Project Architecture](#-project-architecture)
- [🎨 Screenshots & UI Gallery](#-screenshots--ui-gallery)
- [🔧 Setup & Configuration](#-setup--configuration)
- [📱 API Reference](#-api-reference)
- [🧪 Test Automation](#-test-automation)
- [🤝 Contributing & Community](#-contributing--community)
- [📄 License & Legal](#-license--legal)
- [👨‍💻 About the Developer](#-about-the-developer)
- [🔗 Related Projects](#-related-projects)

## ✨ Features & Benefits

### 🎯 Core Task Management Features
- **Smart Task Creation** - Quickly create tasks with rich descriptions, priorities, and categories
- **Advanced Filtering** - Find tasks instantly with powerful search and filter options
- **Priority Management** - Organize tasks by urgency with visual priority indicators (High, Medium, Low)
- **Category Organization** - Create custom categories with color coding for better organization
- **Due Date Tracking** - Never miss deadlines with calendar integration and notifications
- **Task Status Management** - Track progress from todo → in-progress → completed
- **Bulk Operations** - Edit, delete, or move multiple tasks simultaneously
- **Task Archiving** - Keep completed tasks for reference while maintaining clean workspace

### 🎨 Modern User Experience
- **Dark Theme Design** - Beautiful, eye-friendly dark interface with blue accents
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile devices
- **Real-time Updates** - See changes instantly without page refreshes
- **Smooth Animations** - Polished interactions with Framer Motion animations
- **Intuitive Navigation** - Clean, user-friendly interface design
- **Keyboard Shortcuts** - Power-user friendly with keyboard navigation support
- **Accessibility** - WCAG compliant with screen reader support

### 🔒 Security & Performance
- **JWT Authentication** - Industry-standard secure user authentication
- **Data Privacy** - Your tasks are private and isolated from other users
- **Fast Performance** - Optimized React frontend with efficient data loading
- **Data Validation** - Comprehensive input validation on client and server
- **Error Handling** - Graceful error recovery with user-friendly messages
- **Cross-platform** - Works on Windows, macOS, Linux, iOS, and Android browsers

### 🆓 Why Choose TaskFlow?
- **100% Free Forever** - No premium plans, no feature limitations
- **Open Source** - Transparent code you can audit and contribute to
- **No Vendor Lock-in** - Export your data anytime
- **Privacy Focused** - No tracking, no ads, no data selling
- **Self-hostable** - Run on your own servers for complete control
- **Modern Tech Stack** - Built with latest React, Node.js, and MongoDB

## 🎯 Live Demo & Examples

🌐 **Try TaskFlow Now**: [https://taskflow-sagar.vercel.app/](https://taskflow-sagar.vercel.app/)

### 🎮 Interactive Demo
Experience TaskFlow without signing up! Use our demo account to explore all features:

```
📧 Demo Email: atharvawandhare@gmail.com
🔑 Demo Password: 12345678
```

### 🌟 What You Can Try:
- ✅ Create and manage tasks with different priorities
- 🎨 Organize tasks with custom categories and colors
- 📅 Set due dates and track deadlines
- 📱 Test the responsive design on your mobile device
- 🔍 Use advanced search and filtering options
- 📊 View task analytics and progress tracking

### 🎯 Perfect Use Cases:
- **Software Development**: Track bugs, features, and sprint tasks
- **Project Management**: Coordinate team deliverables and milestones  
- **Academic Work**: Organize assignments, research, and study schedules
- **Personal Productivity**: Manage daily tasks, goals, and habits
- **Small Business**: Track client work, deadlines, and business tasks

## 🛠️ Technology Stack

### 🎨 Frontend Technologies
- **React 18** - Latest React with hooks, context, and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Production-ready motion library for React animations
- **Lucide React** - Beautiful, customizable icon library
- **Radix UI** - Low-level UI primitives for accessibility and customization
- **React Router** - Declarative routing for React applications

### ⚙️ Backend Technologies  
- **Node.js** - JavaScript runtime built on Chrome's V8 JavaScript engine
- **Express.js** - Fast, unopinionated web framework for Node.js
- **MongoDB** - Document-oriented NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling for Node.js
- **JWT (jsonwebtoken)** - Industry standard for secure token-based authentication
- **bcryptjs** - Password hashing library for Node.js
- **CORS** - Cross-Origin Resource Sharing middleware

### 🚀 DevOps & Deployment
- **Vercel** - Frontend deployment with automatic deployments from Git
- **Render** - Backend hosting with auto-scaling and monitoring
- **MongoDB Atlas** - Cloud database with built-in security and monitoring
- **Git & GitHub** - Version control and collaborative development
- **ESLint & Prettier** - Code linting and formatting for consistency

### 🧪 Testing & Automation
- **Java 21 & Maven** - Automation project setup and build
- **TestNG** - Test runner with groups, priorities and data providers
- **REST Assured** - API testing for the auth, task and category endpoints
- **Selenium WebDriver** - Browser automation for the login, signup and task flows
- **Page Object Model** - Design pattern keeping locators separate from the tests

### 📱 Development Tools
- **VS Code** - Recommended IDE with React and Node.js extensions
- **Postman** - API testing and documentation
- **MongoDB Compass** - GUI for MongoDB database management
- **React DevTools** - Browser extension for debugging React components

## 🚀 Quick Start Guide

### ⚡ Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/atlas) account)
- **Git** for version control

### 📦 Installation Steps

#### 1. Clone the Repository
```bash
# Clone TaskFlow repository
git clone https://github.com/SagarSuryakantWaghmare/taskflow.git
cd taskflow
```

#### 2. Install Dependencies
```bash
# Install root dependencies for concurrent development
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies  
cd ../server
npm install
cd ..
```

#### 3. Environment Setup

Create environment files for both client and server:

**📁 Client Environment (client/.env)**
```env
# Client Configuration
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=TaskFlow
VITE_APP_VERSION=1.0.0
```

**📁 Server Environment (server/.env)**
```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/taskflow
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

#### 4. Start Development Servers
```bash
# Option 1: Start both client and server simultaneously (Recommended)
npm run dev

# Option 2: Start them separately in different terminals
# Terminal 1 - Start server
cd server && npm run dev

# Terminal 2 - Start client  
cd client && npm run dev
```

#### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs (if configured)

### 🎯 First Steps After Installation
1. **Create Account** - Register a new user account
2. **Create Categories** - Set up task categories for organization
3. **Add Your First Task** - Start with a simple task to test functionality
4. **Explore Features** - Try different priorities, due dates, and filters

## 📁 Project Architecture

TaskFlow follows a clean, scalable architecture pattern separating frontend and backend concerns:

```
taskflow/                           # Root project directory
├── 📁 client/                     # React Frontend Application
│   ├── 📁 public/                 # Static assets and favicon
│   │   ├── vite.svg              # Vite logo
│   │   └── index.html            # HTML template
│   ├── 📁 src/                   # Source code
│   │   ├── 📁 components/        # Reusable React components
│   │   │   ├── 📁 landing/       # Landing page components
│   │   │   │   ├── hero-section.jsx
│   │   │   │   ├── features-section.jsx
│   │   │   │   ├── cta-section.jsx
│   │   │   │   └── pricing-section.jsx
│   │   │   ├── 📁 layout/        # Layout and navigation components
│   │   │   │   ├── navbar.jsx
│   │   │   │   ├── footer.jsx
│   │   │   │   └── not-found.jsx
│   │   │   └── 📁 ui/            # UI components (shadcn/ui)
│   │   │       ├── button.jsx
│   │   │       ├── card.jsx
│   │   │       ├── input.jsx
│   │   │       ├── form.jsx
│   │   │       └── dialog.jsx
│   │   ├── 📁 lib/               # Utilities and configurations
│   │   │   ├── utils.js          # Helper functions
│   │   │   └── api.js            # API configuration
│   │   ├── 📁 pages/             # Page components and routes
│   │   │   ├── landing-page.jsx  # Marketing landing page
│   │   │   ├── login-page.jsx    # User authentication
│   │   │   ├── signup-page.jsx   # User registration
│   │   │   ├── dashboard.jsx     # Main task management dashboard
│   │   │   ├── about-page.jsx    # About page
│   │   │   ├── privacy-page.jsx  # Privacy policy
│   │   │   └── terms-page.jsx    # Terms of service
│   │   ├── 📁 assets/            # Images and static files
│   │   │   ├── react.svg
│   │   │   ├── auth.png
│   │   │   └── image.png
│   │   ├── App.jsx               # Main App component
│   │   ├── main.jsx              # Application entry point
│   │   ├── index.css             # Global styles
│   │   └── App.css               # Component styles
│   ├── package.json              # Client dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   └── eslint.config.js          # ESLint configuration
├── 📁 server/                     # Node.js Backend API
│   ├── 📁 src/                   # Server source code
│   │   ├── 📁 controllers/       # Route controllers (business logic)
│   │   │   ├── authControllers.js    # Authentication logic
│   │   │   └── todoController.js     # Task management logic
│   │   ├── 📁 middleware/        # Custom middleware functions
│   │   │   └── auth.js           # JWT authentication middleware
│   │   ├── 📁 models/            # MongoDB data models
│   │   │   ├── user.models.js    # User schema and methods
│   │   │   ├── todo.models.js    # Task schema and methods
│   │   │   └── category.models.js # Category schema and methods
│   │   ├── 📁 routes/            # API route definitions
│   │   │   ├── auth.js           # Authentication routes
│   │   │   └── todos.js          # Task management routes
│   │   ├── 📁 db/                # Database configuration
│   │   │   └── index.js          # MongoDB connection setup
│   │   ├── app.js                # Express app configuration
│   │   ├── index.js              # Server entry point
│   │   └── constant.js           # Application constants
│   ├── package.json              # Server dependencies
│   └── render.yaml               # Render deployment configuration
├── 📁 automation/                # Java test automation suite
│   ├── 📁 src/test/java/         # Test sources
│   │   ├── 📁 base/              # BaseTest, ApiBaseTest, UiBaseTest
│   │   ├── 📁 pages/             # Page Object Model classes
│   │   ├── 📁 tests/             # API and UI test classes
│   │   └── 📁 utils/             # Config, driver, token and data helpers
│   ├── 📁 src/test/resources/    # config.properties and testdata.json
│   ├── pom.xml                   # Maven build configuration
│   ├── testng.xml                # Full regression suite
│   ├── testng-api.xml            # API suite
│   └── testng-ui.xml             # UI suite
├── 📁 screenshots/               # Application screenshots for README
│   ├── home.png                  # Landing page screenshot
│   ├── features.png              # Features showcase
│   ├── signin.png                # Authentication interface
│   ├── macui.png                 # MacBook UI demo
│   └── footer.png                # Footer design
├── package.json                  # Root package.json for concurrent development
├── README.md                     # Project documentation
└── LICENSE                       # MIT license file
```

### 🏗️ Architecture Patterns
- **Frontend**: Component-based React architecture with hooks and context
- **Backend**: RESTful API with Express.js and MongoDB
- **Authentication**: JWT-based stateless authentication
- **Database**: Document-oriented storage with Mongoose ODM
- **Styling**: Utility-first CSS with Tailwind CSS
- **State Management**: React Context API and local state

## 🎨 Screenshots

### 🏠 Landing Page
![Landing Page](screenshots/home.png)
*Modern landing page with hero section and feature highlights*

### 📊 Dashboard
![Dashboard](screenshots/features.png)
*Comprehensive dashboard with analytics and task overview*

### 🔐 Authentication
![Sign In](screenshots/signin.png)
*Clean and secure authentication interface*

### 💻 MacBook UI Demo
![MacBook UI](screenshots/macui.png)
*Interactive MacBook scroll component showcasing the application*

### 📱 Footer
![Footer](screenshots/footer.png)
*Professional footer with links and developer information*

## 🔧 Configuration

### Database Setup

**MongoDB Local Setup:**
```bash
# Install MongoDB
# macOS
brew install mongodb/brew/mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB
mongod
```

**MongoDB Atlas Setup:**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Add to server `.env` file

### Environment Variables

**Required Server Environment Variables:**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLIENT_URL` - Frontend URL for CORS
- `PORT` - Server port (default: 3000)

**Optional Server Environment Variables:**
- `NODE_ENV` - Environment (development/production)
- `JWT_EXPIRES_IN` - JWT expiration time
- `BCRYPT_SALT_ROUNDS` - Password hashing rounds

## 📱 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Task Endpoints

```http
GET /api/todos
Authorization: Bearer <token>

POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task Description",
  "priority": "high",
  "category": "work",
  "dueDate": "2024-12-31"
}
```

### Category Endpoints

```http
GET /api/categories
Authorization: Bearer <token>

POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Category Name",
  "color": "bg-blue-500"
}
```

## 🧪 Test Automation

TaskFlow ships with its own **automation suite** that tests the live application end to end — the REST API with **REST Assured** and the browser flows with **Selenium WebDriver**, both driven by **TestNG** and built with **Maven**.

The suite lives in the [`automation/`](automation) folder and is completely independent of the app, so it can be pointed at local, staging or production URLs by editing a single properties file.

### 🧰 Automation Tech Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Language | **Java 21** | Test implementation language |
| Build | **Maven** | Dependency management and test execution |
| Test Runner | **TestNG 7.12** | Grouping, priorities, data providers, suites |
| API Testing | **REST Assured 6.0** | Request building and JSON response assertions |
| UI Testing | **Selenium WebDriver 4.21** | Browser automation on Chrome |
| Driver Setup | **WebDriverManager 5.8** | Downloads and wires up ChromeDriver automatically |
| Test Data | **Jackson Databind** | Reads `testdata.json` into the tests |
| Design Pattern | **Page Object Model** | Keeps locators out of the test classes |

### 📂 Automation Structure

```
automation/
├── pom.xml                              # Maven build + Surefire suite runner
├── testng.xml                           # Full regression suite (API + UI)
├── testng-api.xml                       # API tests only (no browser)
├── testng-ui.xml                        # UI tests only
└── src/test/
    ├── java/
    │   ├── base/
    │   │   ├── BaseTest.java             # Environment URLs + per-test logging
    │   │   ├── ApiBaseTest.java          # api() and authApi() request specs
    │   │   └── UiBaseTest.java           # Opens and closes the browser
    │   ├── pages/                        # Page Object Model
    │   │   ├── BasePage.java             # Shared explicit-wait helpers
    │   │   ├── LoginPage.java            # /login screen
    │   │   ├── SignupPage.java           # /signup screen
    │   │   └── DashboardPage.java        # Sidebar, task modal, task cards
    │   ├── tests/
    │   │   ├── AuthTest.java             # API - register, login, profile, logout
    │   │   ├── TaskTest.java             # API - full task CRUD lifecycle
    │   │   ├── CategoryTest.java         # API - category CRUD + default rules
    │   │   ├── UiLoginTest.java          # UI  - login journeys
    │   │   ├── UiSignupTest.java         # UI  - signup journeys
    │   │   └── UiTaskTest.java           # UI  - create and delete a task
    │   └── utils/
    │       ├── ConfigReader.java         # Reads config.properties
    │       ├── DriverManager.java        # Thread-safe Chrome driver
    │       ├── TokenManager.java         # Logs in once, caches the JWT
    │       └── TestDataReader.java       # Builds request bodies from JSON
    └── resources/
        ├── config.properties             # URLs, endpoints, credentials, waits
        └── testdata.json                 # Login, user, task and category data
```

### ⚡ Running the Tests

**Prerequisites**

- **Java 21** or newer (`java -version`)
- **Maven 3.9+** (`mvn -version`)
- **Google Chrome** installed — the driver itself is downloaded automatically

**Commands**

```bash
# Move into the automation module
cd automation

# Run everything (API + UI)
mvn test

# Run only the API tests - fast, no browser is opened
mvn test -Papi

# Run only the Selenium UI tests
mvn test -Pui

# Run a single test class
mvn test -Dtest=TaskTest

# Run by TestNG group: smoke, regression, api, ui, auth, task, category
mvn test -Dgroups=smoke
```

> **Windows PowerShell note:** run `cd automation` on its own line — PowerShell 5.1
> does not support the `&&` chaining operator. The `-Papi` / `-Pui` profiles are used
> instead of `-Dsuite=...` because PowerShell splits an unquoted `-D` argument that
> contains a file extension.

**Headless mode** — for CI or a machine without a display, flip one line in
`src/test/resources/config.properties`:

```properties
headless=true
```

### 🎯 Test Configuration

Everything environment-specific lives in `src/test/resources/config.properties`, so no
URL or credential is ever hard-coded inside a test:

```properties
# Application under test
base.url=https://taskflow-2075.onrender.com     # Backend API
ui.base.url=https://taskflow-sagar.vercel.app   # Frontend

# Demo user used by the suite
email=atharvawandhare@gmail.com
password=12345678

# Browser and waits
browser=chrome
headless=false
implicit.wait=10
explicit.wait=15
```

To run against a local build, point `base.url` at `http://localhost:5000` and
`ui.base.url` at `http://localhost:5173`.

### ✅ API Test Coverage

| Test Class | Scenario | Expected |
|------------|----------|----------|
| `AuthTest` | Register a brand new user | `201` + JWT returned |
| `AuthTest` | Register with an email that already exists | `401` *Account is already existed* |
| `AuthTest` | Register with missing fields | `400` *Please provide all required fields* |
| `AuthTest` | Login with valid credentials | `200` + JWT + user payload |
| `AuthTest` | Login with invalid / empty credentials *(data provider)* | `401` *Invalid credentials* |
| `AuthTest` | Get profile with a valid token | `200`, password never exposed |
| `AuthTest` | Get profile with no token | `401` *Access denied* |
| `AuthTest` | Get profile with a tampered token | `401` *Invalid token* |
| `AuthTest` | Logout | `200` *Logout successfully* |
| `TaskTest` | Create a task | `201` + task id |
| `TaskTest` | List all tasks | `200` + todos array + pagination |
| `TaskTest` | Get a single task by id | `200` + matching task |
| `TaskTest` | Filter tasks by `completed=false` | `200`, no completed tasks returned |
| `TaskTest` | Update a task | `200` + updated fields |
| `TaskTest` | Toggle task status | `200`, task becomes completed |
| `TaskTest` | Delete a task | `200` *Todo deleted successfully* |
| `TaskTest` | Read a deleted / unknown task | `404` *Todo not found* |
| `TaskTest` | Create a task without a token | `401` *Access denied* |
| `TaskTest` | Create a task without a title | `400` validation error |
| `TaskTest` | Create a task with a description under 10 chars | `400` validation error |
| `CategoryTest` | Create a custom category | `201` + category id |
| `CategoryTest` | List categories | `200` + 4 defaults + custom ones |
| `CategoryTest` | Create a duplicate category name | `400` *already exists* |
| `CategoryTest` | Create a category without a name | `400` *Category name is required* |
| `CategoryTest` | Update a custom category | `200` + new name and colour |
| `CategoryTest` | Update / delete a **default** category | `403` *Cannot modify default categories* |
| `CategoryTest` | Call the category API without a token | `401` *Access denied* |
| `CategoryTest` | Delete a custom category | `200` *Category deleted successfully* |
| `CategoryTest` | Delete the same category again | `404` *not found or access denied* |

### 🖥️ UI Test Coverage

| Test Class | Journey | Verified |
|------------|---------|----------|
| `UiLoginTest` | Login with the demo user | Success banner, redirect to `/dashboard` |
| `UiLoginTest` | Login with wrong credentials | *Invalid credentials* banner, stays on `/login` |
| `UiLoginTest` | Follow the **Sign up** link | Lands on `/signup` |
| `UiSignupTest` | Register a fresh user | *Account created successfully!* banner |
| `UiSignupTest` | Passwords that do not match | *Passwords do not match* banner |
| `UiSignupTest` | Register with an existing email | Backend error surfaced in the form |
| `UiTaskTest` | Login → Tasks → add a task → delete it | Toast message, task card appears then disappears |

### 🏗️ How the Framework is Built

- **Config driven** — every URL, endpoint, credential and wait comes from
  `config.properties` through `ConfigReader`, so switching environments never
  touches a test file.
- **Data driven** — request bodies are built by `TestDataReader` from
  `testdata.json`, and TestNG `@DataProvider` runs the login test across
  valid, invalid and empty credentials.
- **Re-runnable** — registration and category tests generate unique emails and
  names, so the suite can be executed repeatedly without hitting
  "already exists" failures.
- **One login per run** — `TokenManager` authenticates once with the demo user
  and caches the JWT for every protected API call.
- **Page Object Model** — locators live in `pages/`, assertions live in
  `tests/`. A UI change means editing one page class, not every test.
- **Clean browser handling** — `UiBaseTest` opens Chrome before each UI test
  and `DriverManager` always quits it afterwards, even when a test fails, so
  no orphan browser processes are left behind.
- **Grouped execution** — every test is tagged (`smoke`, `regression`, `api`,
  `ui`, `auth`, `task`, `category`) so CI can run a quick smoke pass or the
  full regression.

### 📊 Test Reports

TestNG writes its HTML and XML reports after every run:

```
automation/target/surefire-reports/    # Surefire output (index.html, emailable-report.html)
automation/test-output/                # TestNG default report folder
```

Open `automation/target/surefire-reports/index.html` in a browser for the
pass / fail breakdown of the last run.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
git commit -m 'Add some amazing feature'
```
4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

### Code Style

- Use ESLint and Prettier for formatting
- Follow React best practices
- Use TypeScript-style JSDoc comments
- Maintain consistent naming conventions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

<div align="center">

### Sagar Suryakant Waghmare
*Full Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-SagarSuryakantWaghmare-black?style=for-the-badge&logo=github)](https://github.com/SagarSuryakantWaghmare)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sagarwaghmare44-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/sagarwaghmare44)
[![Email](https://img.shields.io/badge/Email-sagarwaghmare1384@gmail.com-red?style=for-the-badge&logo=gmail)](mailto:sagarwaghmare1384@gmail.com)
[![Behance](https://img.shields.io/badge/Behance-sagarwaghmare-blue?style=for-the-badge&logo=behance)](https://www.behance.net/sagarwaghmare)

</div>

### About the Developer

Passionate full-stack developer with expertise in modern web technologies. Specializing in:

- **Frontend**: React.js, Tailwind CSS, Modern UI/UX Design
- **Backend**: Node.js, Express.js, MongoDB, RESTful APIs
- **Mobile**: Responsive Design, Progressive Web Apps

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

**🚀 [Visit TaskFlow Live](https://taskflow-indol-six.vercel.app) | 📖 [Read the Docs](#) | 🐛 [Report Bug](https://github.com/SagarSuryakantWaghmare/taskflow/issues)**

Made with ❤️ by [Sagar Waghmare](https://github.com/SagarSuryakantWaghmare)

</div>