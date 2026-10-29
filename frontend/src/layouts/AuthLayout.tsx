import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Header from "../components/Header";

export default function AuthLayout() {
  const { authUser } = useAuthStore();

  if (authUser !== null) return <Navigate to="/" />;

  return (
    <>
      <main className="relative bg-slate-400">
        {/* Content */}
        <Header showAuthBtn={false} />
        <div className="relative">
          <Outlet />
        </div>
      </main>
    </>
  );
}
