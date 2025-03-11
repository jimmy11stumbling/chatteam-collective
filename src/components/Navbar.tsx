
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-in-out",
        isScrolled ? "navbar-blur" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center transition-transform group-hover:rotate-3 duration-300">
            <span className="text-white font-bold text-lg">UCS</span>
          </div>
          <span className={cn(
            "font-semibold text-lg transition-colors duration-300",
            isScrolled ? "text-neutral-900" : "text-neutral-900"
          )}>
            Ultimate Chatbot Station
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-500", 
              isActive("/") ? "text-blue-500" : "text-neutral-600"
            )}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-500", 
              isActive("/dashboard") ? "text-blue-500" : "text-neutral-600"
            )}
          >
            Dashboard
          </Link>
          <Link 
            to="/teams" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-500", 
              isActive("/teams") ? "text-blue-500" : "text-neutral-600"
            )}
          >
            Teams
          </Link>
          <Link 
            to="/conversation" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-500", 
              isActive("/conversation") ? "text-blue-500" : "text-neutral-600"
            )}
          >
            Demo
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="hidden sm:flex hover:bg-blue-50 text-neutral-700"
          >
            Log In
          </Button>
          <Button 
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
