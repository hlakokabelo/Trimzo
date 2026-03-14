import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AuthLayout() {
  const { user } = useAuth();

  if (user !== null) return <Navigate to="/" />;

  return (
    <>
      <main className="relative bg-slate-400">
        {/* Content */}
        <div className="relative">
          <Outlet />
        </div>
      </main>
    </>
  );
}
