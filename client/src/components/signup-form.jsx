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
import api from "@/lib/api"
export function SignupForm({
  className,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitHandle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData(e.target);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
      };

      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      console.log("Sending signup request:", data);
      
      const response = await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      console.log("Signup response:", response.data);

      if (response.data.success) {
        setSuccess("Account created successfully! Please log in.");
        // Navigate to login page after 2 seconds
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (error) {
      console.error("Signup form submission error:", error);
      if (error.response) {
        setError(error.response.data.message || "Signup failed. Please try again.");
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

  const handleSignInClick = () => {
    window.location.href = '/login';
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-sm mx-auto", className)} {...props}>
      <Card className="border-gray-800 bg-gray-900/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Create your account</CardTitle>
          <CardDescription className="text-gray-400">
            Join TaskFlow and start organizing your tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Error Message */}
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
              <Label htmlFor="name" className="text-gray-300 text-sm font-medium">Full Name</Label>
              <Input 
                id="name" 
                name="name"
                type="text" 
                placeholder="Enter your full name" 
                required 
                disabled={isLoading}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-11 rounded-lg transition-all duration-200"
              />
            </div>
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
              <Label htmlFor="password" className="text-gray-300 text-sm font-medium">Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password" 
                placeholder="Create a password" 
                required 
                disabled={isLoading}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-11 rounded-lg transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300 text-sm font-medium">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword"
                type="password" 
                placeholder="Confirm your password" 
                required 
                disabled={isLoading}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-11 rounded-lg transition-all duration-200"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 h-11 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <div className="text-center pt-4">
              <span className="text-gray-400 text-sm">Already have an account? </span>
              <button 
                type="button"
                onClick={handleSignInClick}
                disabled={isLoading}
                className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors disabled:opacity-50"
              >
                Sign in
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-center text-xs text-gray-500 leading-relaxed">
        By creating an account, you agree to our{" "}
        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}