
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 mb-8 border-b border-neutral-200">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">UCS</span>
              </div>
              <span className="font-semibold text-lg text-neutral-900">
                Ultimate Chatbot Station
              </span>
            </Link>
            <p className="text-neutral-600 mb-4 max-w-md">
              A comprehensive platform for building, managing, and deploying multi-agent collaborative chatbot systems powered by Claude API.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-blue-500 transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-blue-500 transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-blue-500 transition-colors text-sm">
                  Bot Teams
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-blue-500 transition-colors text-sm">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-blue-500 transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-blue-500 transition-colors text-sm">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-blue-500 transition-colors text-sm">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-blue-500 transition-colors text-sm">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-blue-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-blue-500 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-blue-500 transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-blue-500 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Ultimate Chatbot Station. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-neutral-500 hover:text-blue-500 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/" className="text-neutral-500 hover:text-blue-500 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/" className="text-neutral-500 hover:text-blue-500 transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
