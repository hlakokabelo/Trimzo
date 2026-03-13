import { Link } from "react-router-dom";
import { AlertTriangle, Search, Link2 } from "lucide-react";

export default function LinkNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">

      {/* Icon */}
      <AlertTriangle className="w-16 h-16 text-red-600 mb-6" />

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        404 Not Found
      </h1>

      {/* Message */}
      <p className="text-gray-600 mb-10 max-w-md">
        This short link does not exist. It may have been removed, expired,
        or typed incorrectly.
      </p>

      {/* Options */}
      <div className="flex flex-col md:flex-row gap-8">

        <div className="flex items-start gap-3 text-left">
          <Search className="text-blue-500 w-6 h-6 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800">Check the Link</h3>
            <p className="text-sm text-gray-600">
              Make sure the short URL was typed correctly.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-left">
          <Link2 className="text-blue-500 w-6 h-6 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800">
              Ask for the Correct Link
            </h3>
            <p className="text-sm text-gray-600">
              Contact the person who shared the link.
            </p>
          </div>
        </div>

      </div>

      {/* Back button */}
      <Link
        to="/"
        className="mt-10 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}