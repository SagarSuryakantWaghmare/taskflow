import { SignupForm } from "@/components/signup-form";

export function SignupPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-black">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </main>
    </div>
  );
}
