import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { LoginForm } from "@/components/login-form";

export function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white text-slate-900">
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-white">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
