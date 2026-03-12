import { FiLink } from "react-icons/fi";
import * as React from "react";
import { getAppName } from "../util/utils";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 text-teal-700 font-black text-xl"
        >
          <FiLink className="w-5 h-5" />
          {getAppName()}
        </a>


  
        

        {/* Nav — hidden on small screens */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-500 font-medium">
          <a href="/" className="hover:text-teal-700 transition-colors">
            Home
          </a>
          <a href="/features" className="hover:text-teal-700 transition-colors">
            Features
          </a>
          <a href="/pricing" className="hover:text-teal-700 transition-colors">
            Pricing
          </a>
        </nav>

            {/* Auth Buttons */}
<div className="flex items-center gap-2">
  
  <a  href="/signin"
    className="text-sm font-semibold px-4 py-2 rounded-lg text-teal-700 hover:bg-teal-50 transition-colors"
  >
    Sign In
  </a>
  
   <a href="/signup"
    className="text-sm font-semibold px-4 py-2 rounded-lg bg-teal-700 text-white hover:bg-teal-800 transition-colors"
  >
    Sign Up
  </a>
</div></div>
    </header>
  );
};

export default Header;
