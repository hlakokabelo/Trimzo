import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="relative bg-slate-500">

    
      {/* Content */}
      <div className="relative">
        <Outlet />
      </div>

    </main>
  );
}