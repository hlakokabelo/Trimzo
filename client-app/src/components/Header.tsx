import { FiLink } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getAppName } from "../utils/getAppName.ts";
import { useAuthStore } from "../stores/authStore.ts";

const Header = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-teal-700 font-extrabold text-xl hover:text-teal-800 transition-colors"
        >
          <FiLink className="w-6 h-6" />
          {getAppName()}
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {authUser ? (
            // Logged-in state
            <>
              <span className="text-sm text-gray-700 hidden sm:inline">
                Hello, {authUser.name}
              </span>

              {/* Profile Button / Avatar */}
              <Link
                to="/profile"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Profile"
              >
                <FiUser className="w-5 h-5 text-gray-700" />
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            // Logged-out state
            <>
              <Link
                to="/sign-in"
                className="text-sm font-semibold px-1 py-2 rounded-lg text-teal-700 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-colors"
              >
                Sign In
              </Link>

              <Link
                to="/sign-up"
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-teal-700 text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
