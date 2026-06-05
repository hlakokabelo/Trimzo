import { useAuthStore } from "../stores/authStore";


export function LoadingSate() {
  const { isServerAwake } = useAuthStore();
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-6 text-black text-lg"></p>
{!isServerAwake && (
  <div>
    Server is waking up... this may take a minute ☕
  </div>
)}
    </div>
  );
}
