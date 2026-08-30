import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, CheckSquare, User, Settings, LogOut, Home, BarChart3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/api";

export default function Navbar() {
  // Simple navigation function
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
  const loggedIn = !!token;
  const [user, setUser] = useState(null);
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  
  useEffect(() => {
    if (token) {
      api.get('/auth/profile', axiosConfig)
        .then(res => setUser(res.data.data.user))
        .catch(err => console.error('Error fetching profile:', err));
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Profile picture initials
  const profileInitials = user ? user.name.split(" ").map(name => name.charAt(0).toUpperCase()).join(" ") : "S";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Left side - Logo (hidden on mobile, shown on desktop) */}
          <div className="hidden sm:flex items-center flex-1 min-w-0 mr-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center focus:outline-none group transition-all duration-300 hover:scale-105"
              aria-label="Go to home"
            >
              <div className="relative">
                <CheckSquare className="text-blue-500 mr-3 transition-all duration-300 group-hover:text-blue-400 w-7 h-7" size={28} />
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl group-hover:bg-blue-500/30 transition-all duration-300"></div>
              </div>
              <span className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-blue-300 transition-all duration-300 truncate">
                TaskFlow
              </span>
            </button>
          </div>

          {/* Center - Logo (mobile only) */}
          <div className="flex sm:hidden items-center justify-center flex-1">
            <button
              onClick={() => navigate('/')}
              className="flex items-center focus:outline-none group transition-all duration-300 hover:scale-105"
              aria-label="Go to home"
            >
              <div className="relative">
                <CheckSquare className="text-blue-500 mr-2 transition-all duration-300 group-hover:text-blue-400" size={24} />
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl group-hover:bg-blue-500/30 transition-all duration-300"></div>
              </div>
              <span className="text-lg font-bold cursor-pointer bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-blue-300 transition-all duration-300 truncate">
                TaskFlow
              </span>
            </button>
          </div>

          {/* Right side - Auth buttons or User menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {loggedIn && user ? (
              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                   <button
                     type="button"
                     className="relative w-8 h-8 sm:w-10 sm:h-10 cursor-pointer bg-blue-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:scale-110 hover:bg-blue-700 focus:scale-110 focus:ring-4 focus:ring-blue-500/30 shadow-lg hover:shadow-xl"
                     style={{ zIndex: 60 }}
                     aria-label="Open profile menu"
                   >
                     <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl"></div>
                     <span className="relative z-10">{profileInitials}</span>
                   </button>
                 </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 text-white shadow-2xl rounded-2xl" 
                  align="end" 
                  forceMount 
                  style={{ zIndex: 60 }}
                >
                  <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {profileInitials}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold leading-none text-white">{user?.name}</p>
                          <p className="text-xs leading-none text-gray-400 mt-1">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700/50" />
                  <DropdownMenuItem 
                    onClick={() => navigate('/dashboard')} 
                    className="hover:bg-blue-600/20 hover:text-blue-300 font-medium p-4 transition-all duration-200 cursor-pointer rounded-lg mx-2 my-1"
                  >
                    <BarChart3 className="mr-3 h-5 w-5 text-blue-400" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700/50" />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="text-red-400 hover:bg-red-500/20 hover:text-red-300 font-semibold p-4 transition-all duration-200 cursor-pointer rounded-lg mx-2 my-1"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
                         ) : (
               <div className="flex items-center gap-2 sm:gap-3">
                 <Button 
                   variant="ghost" 
                   onClick={() => navigate('/login')} 
                   className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 sm:px-6 py-2 rounded-xl transition-all duration-300 font-medium text-sm sm:text-base"
                 >
                   Sign In
                 </Button>
                 <Button 
                   onClick={() => navigate('/signup')} 
                   className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105 text-sm sm:text-base"
                 >
                   Get Started
                 </Button>
               </div>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
}
