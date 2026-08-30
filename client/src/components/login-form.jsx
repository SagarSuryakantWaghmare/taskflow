import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api"
export function LoginForm({
  className,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const[error, setError] = useState("");
  
  const navigate = useNavigate();
  const submitHandle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    setSuccess("");

    try {
      const formData = new FormData(e.target);
      const data = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      console.log("Sending login request:", data);

      const response = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        setSuccess("Login successful! Redirecting...");
        // Store token in localStorage
        const token = response.data.data?.token || response.data.token;
        if (token) {
          localStorage.setItem('token', token);
        }
        // Navigate to dashboard after 2 seconds
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      }
    } catch (error) {
      console.error("Login form submission error:", error);
      if (error.response) {
        setError(error.response.data.message || "Login failed. Please try again.");
      } else if (error.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
      return;
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-sm mx-auto", className)} {...props}>
      <Card className="border-gray-800 bg-gray-900/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to your TaskFlow account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          )}
          <form className="space-y-4" onSubmit={submitHandle}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 text-sm font-medium">Email address</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="Enter your email" 
                required 
                disabled={isLoading}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-11 rounded-lg transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Input 
                id="password" 
                name="password"
                type="password" 
                placeholder="Enter your password"
                required 
                disabled={isLoading}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-11 rounded-lg transition-all duration-200"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 h-11 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl mt-6"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <div className="text-center pt-4">
              <span className="text-gray-400 text-sm">Don't have an account? </span>
              <button 
                type="button"
                onClick={() => navigate('/signup')} 
                className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
              >
                Sign up
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-center text-xs text-gray-500 leading-relaxed">
        By signing in, you agree to our{" "}
        <a href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}