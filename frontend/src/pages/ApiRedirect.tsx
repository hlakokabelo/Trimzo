const ApiRedirect = () => {
  window.location.href = "https://trimzo-api.onrender.com/api";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-6 text-black text-lg"></p>
    </div>
  );
};

export default ApiRedirect;
