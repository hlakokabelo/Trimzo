import { useState, type SubmitEvent } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmitSignIn = async (
    e: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      return navigate("/");
    }

    setErrorMessage(result.error?.message ?? "Unknown error");
  };

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
        <form className="p-6 space-y-5" onSubmit={(e) => onSubmitSignIn(e)}>
          {/* Email */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <FiMail className="w-4 h-4" />
              Email
            </label>

            <input
              type="email"
              value={email}
              required
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm outline-none focus:border-teal-600 placeholder-gray-400"
            />
          </div>

          {/* Submit */}
          <input
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white font-semibold py-3.5 rounded-lg text-sm transition-all duration-150"
            value={"Sign In"}
          />

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-teal-600 hover:underline">
              Create one
            </Link>
          </p>
          <p className="text-sm text-red-700 text-center">{errorMessage}</p>
        </form>
      </div>
    </div>
  );
}
