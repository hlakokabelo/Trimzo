import { useEffect, useState } from "react";
import { FiUser, FiMail, FiLock, FiEdit2, FiSave, FiX } from "react-icons/fi";
import {
  validateName,
  validatePassword,
  validateUsername,
  type ValidationResult,
} from "../utils/validation";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import type { User } from "../types/user.types";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authUser, updateProfile } = useAuthStore();

  const validateProfileData = (): ValidationResult => {
    let validationResult: ValidationResult;

    validationResult = validateName(name);
    if (!validationResult.isValid) return validationResult;

    validationResult = validateUsername(username);
    if (!validationResult.isValid) return validationResult;

    validationResult = validatePassword(password);
    if (!validationResult.isValid) return validationResult;

    return validationResult;
  };
  const handleSave = async () => {
    let validationResult: ValidationResult = validateProfileData();
    if (!validationResult.isValid) {
      setErrorMessage(`${validationResult.message}`);
      return;
    }
    setErrorMessage(``);
    setEditing(false);

    const userData: User = {
      name,
      username,
      email,
      password,
    };

    const { error } = await updateProfile(userData);

    if (error) {
      setErrorMessage(error.message);
    }

    setPassword("");

  };

  const resetState = async (resetErrorM: boolean = false) => {
    setEditing(false);
    if (!resetErrorM) setErrorMessage("");

    if (!authUser) return;
    setName(authUser.name);
    setUsername(authUser.username);
    setEmail(authUser.email);
    setPassword("");
  };

  const cancelEdit = () => {
    resetState();
  };

  useEffect(() => {
    resetState();
  }, [authUser]);

  if (!authUser) return <Navigate to={"/"} />;

  return (
    <div className="flex justify-center px-2 py-36 sm:py-8">
      <div className="bg-slate-300 rounded-2xl shadow-lg overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="flex">
          <div className="flex-1 flex bg-white items-center justify-center gap-2 py-4 text-sm font-semibold text-gray-800">
            <FiUser className="w-4 h-4" />
            Profile
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Name */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <FiUser className="w-4 h-4" />
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editing}
              className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition
              ${
                editing
                  ? "border-gray-300 focus:border-teal-600 bg-white"
                  : "border-gray-200 bg-gray-100 text-gray-500"
              }`}
            />
          </div>

          {/* Username */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <FiUser className="w-4 h-4" />
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!editing}
              className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition
              ${
                editing
                  ? "border-gray-300 focus:border-teal-600 bg-white"
                  : "border-gray-200 bg-gray-100 text-gray-500"
              }`}
            />
          </div>

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
              disabled={!editing}
              className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition
              ${
                editing
                  ? "border-gray-300 focus:border-teal-600 bg-white"
                  : "border-gray-200 bg-gray-100 text-gray-500"
              }`}
            />
          </div>

          {/* Password */}
          {editing && (
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <FiLock className="w-4 h-4" />
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank if unchanged"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm outline-none focus:border-teal-600"
              />
            </div>
          )}

          {/* Buttons */}
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="w-full bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white font-semibold py-3.5 rounded-lg text-sm flex items-center justify-center gap-2 transition"
            >
              <FiEdit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white font-semibold py-3.5 rounded-lg text-sm flex items-center justify-center gap-2 transition"
              >
                <FiSave className="w-4 h-4" />
                Save
              </button>

              <button
                onClick={cancelEdit}
                className="flex-1 bg-slate-600 hover:bg-slate-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-lg text-sm flex items-center justify-center gap-2 transition"
              >
                <FiX className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}

          <p className="text-sm text-center text-red-500">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
}
