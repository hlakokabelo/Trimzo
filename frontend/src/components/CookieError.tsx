import { FiAlertTriangle, FiExternalLink, FiX } from "react-icons/fi";

interface CookieErrorProps {
  onClose: () => void;
}

const CookieError = ({ onClose }: CookieErrorProps) => {
  const query = encodeURIComponent(
    "How to allow cookies for a specific website in any browser",
  );

  return (
    <div
      role="alert"
      className="relative rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss cookie warning"
        className="absolute right-3 top-3 rounded p-1 hover:bg-amber-100"
      >
        <FiX className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <FiAlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

        <div className="space-y-2">
          <p className="font-semibold">Unable to verify your session</p>

          <p>
            Your login succeeded, but we couldn't verify your session. Your
            browser may be blocking cookies. Please check your cookie settings
            and try again.
          </p>

          <a
            href={`https://chatgpt.com/?q=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800"
          >
            How to enable cookies
            <FiExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CookieError;
