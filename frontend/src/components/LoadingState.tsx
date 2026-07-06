import { useAuthStore } from "../stores/authStore";

export function LoadingState() {
  const { isServerAwake } = useAuthStore();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        
        <div className="mx-auto h-14 w-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

        {/* Main message */}
        <h2 className="mt-6 text-xl sm:text-2xl font-semibold text-gray-900">
          Loading...
        </h2>

        {/* Server waking notice */}
        {!isServerAwake && (
          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">☕</span>

              <div className="text-left">
                <p className="font-semibold text-amber-900">
                  Server is waking up
                </p>

                <p className="mt-1 text-sm text-amber-800">
                  This usually takes 30–60 seconds. 
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}