import { useState } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen px-2">
      <div className="bg-slate-300 rounded-2xl shadow-lg shadow-slate-600 hover:shadow-xl overflow-hidden w-full max-w-md">

        {/* Header */}
        <div className="flex">
          <div className="flex-1 flex bg-white items-center justify-center gap-2 py-4 text-sm font-semibold text-gray-800">
            <FiLogIn className="w-4 h-4" />
            Sign In
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">

          {/* Email */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <FiMail className="w-4 h-4" />
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm outline-none focus:border-teal-600 placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <FiLock className="w-4 h-4" />
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm outline-none focus:border-teal-600 placeholder-gray-400"
            />
          </div>

          {/* Submit */}
          <button className="w-full bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white font-semibold py-3.5 rounded-lg text-sm transition-all duration-150">
            Sign In
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-teal-600 hover:underline"
            >
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}