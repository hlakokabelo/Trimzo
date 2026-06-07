import { useAuthStore } from "../stores/authStore";

export function LoadingState() {
  const { isServerAwake } = useAuthStore();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        {/* Spinner */}
        <div className="mx-auto h-14 w-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

        {/* Main message */}
        <h2 className="mt-6 text-xl sm:text-2xl font-semibold text-gray-900">
          Loading...
        </h2>

        {/* Sub message */}
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Preparing everything for you.
        </p>

        {/* Server waking notice */}
        {!isServerAwake && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm sm:text-base text-amber-800">
              ☕ The server is waking up from sleep mode. This can take up to a
              minute on the first visit.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}