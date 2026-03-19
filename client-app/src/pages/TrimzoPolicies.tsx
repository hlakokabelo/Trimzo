import React from "react";
import { FiLink, FiCheckCircle, FiShield, FiLock, FiCpu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getAppName } from "../utils/getAppName";

const TrimzoPolicies: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl">
        {/* Main Card - matching FormContainer style */}
        <div className="bg-slate-300 rounded-2xl shadow-lg shadow-slate-600 hover:shadow-xl overflow-hidden">
          {/* Header Tabs - matching FormContainer tab style */}
          <div className="flex">
            <div className="flex-1 flex bg-white items-center justify-center gap-2 py-4 text-sm font-semibold text-gray-800">
              <FiShield className="w-4 h-4" />
              Terms & Policies
            </div>
          </div>

          {/* Content Area - matching FormContainer p-6 spacing */}
          <div id="terms" className="p-6 space-y-5 bg-white">
            {/* API Badge - matching domain display style */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <FiCpu className="w-4 h-4" />
                API Endpoint
              </label>
              <div className="relative">
                <div className="w-full px-3 py-3 rounded-lg border border-gray-300 text-sm text-gray-700 bg-white outline-none">
                  <code
                    onClick={() => navigate("/api")}
                    className="text-teal-700 cursor-pointer"
                  >
                    https://trimzo-api.onrender.com
                  </code>
                </div>
              </div>
            </div>

            {/* Terms of Service */}
            <div id="terms" className="space-y-3 border-b border-gray-200 pb-5">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <FiLink className="w-4 h-4" />
                Terms of Service
              </label>
              <div className="bg-slate-50 rounded-lg p-4 text-sm text-gray-600 space-y-3">
                <p className="text-xs text-gray-500">
                  last updated: 19 March 2026
                </p>
                <p className="font-medium text-teal-700">
                  ✨ tl;dr: Users are expected to behave respectfully and must not use the service to shorten malicious or harmful links..
                </p>
                <ul className="list-disc pl-4 space-y-2 text-xs">
                  <li>
                    <span className="font-semibold">Acceptable use:</span> No
                    spam, phishing, malware, or illegal activities.
                  </li>
                  <li>
                    <span className="font-semibold">Account-free:</span> No
                    accounts needed, but abuse may lead to IP blocks.
                  </li>
                  <li>
                    <span className="font-semibold">Link removal:</span> We
                    reserve the right to remove violating links.
                  </li>
                  <li>
                    <span className="font-semibold">No warranty:</span> Service
                    provided "as is" with no guarantees.
                  </li>
                </ul>
              </div>
            </div>

            {/* Privacy Policy */}
            <div
              id="privacy"
              className="space-y-3 border-b border-gray-200 pb-5"
            >
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <FiLock className="w-4 h-4" />
                Privacy Policy
              </label>
              <div className="bg-slate-50 rounded-lg p-4 text-sm text-gray-600 space-y-3">
                <p className="text-xs text-gray-500">
                  last updated: 19 March 2026
                </p>
                <p className="font-medium text-teal-700">
                  ✨ we collect almost nothing.
                </p>
                <ul className="list-disc pl-4 space-y-2 text-xs">
                  <li>
                    <span className="font-semibold">Data collected:</span>{" "}
                    Original URL, short code, timestamp, IP (30 days only).
                  </li>
                  <li>
                    <span className="font-semibold">No tracking:</span> No
                    analytics, fingerprinting, or data selling.
                  </li>
                  <li>
                    <span className="font-semibold">API privacy:</span> Same
                    rules apply to API usage.
                  </li>
                </ul>
              </div>
            </div>

            {/* Use of Cookies */}
            <div
              id="cookies"
              className="space-y-3 border-b border-gray-200 pb-5"
            >
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <span className="text-lg">🍪</span>
                Use of Cookies
              </label>
              <div className="bg-slate-50 rounded-lg p-4 text-sm text-gray-600 space-y-3">
                <p className="text-xs text-gray-500">
                  last updated: 19 March 2026
                </p>
                <p className="font-medium text-teal-700">
                  ✨ strictly necessary only. nothing creepy.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-white px-3 py-1.5 rounded-full text-xs border border-gray-300 flex items-center gap-1">
                    session_cookie{" "}
                    <span className="bg-teal-100 text-teal-700 px-1.5 rounded-full text-[10px]">
                      essential
                    </span>
                  </span>

                  <span className="bg-white px-3 py-1.5 rounded-full text-xs border border-gray-300 flex items-center gap-1">
                    csrf_token{" "}
                    <span className="bg-teal-100 text-teal-700 px-1.5 rounded-full text-[10px]">
                      security
                    </span>
                  </span>
                </div>
                <p className="text-xs">
                  No advertising or tracking cookies. Blocking may affect
                  functionality.
                </p>
              </div>
            </div>

            {/* API Specific Terms - matching the style of shortened URL result */}
            <div className="flex items-start gap-2 p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700">
              <FiCheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <span className="font-semibold">⚙️ API Service</span>
                <p className="text-xs">
                  Rate limited: 60/min • No API key required • Same privacy
                  rules apply
                </p>
                <p className="text-xs">
                  GET on{" "}
                  <code className="bg-teal-100 px-1 rounded">/shortenUrl</code>{" "}
                  with{" "}
                  <code className="bg-teal-100 px-1 rounded">{`?link=https://example.com}&alias=usedApi`}</code>
                </p>
              </div>
            </div>

            {/* Submit Button - matching FormContainer button style */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white font-semibold py-3.5 rounded-lg text-sm transition-all duration-150"
            >
              I Understand
            </button>

            {/* Warning text - matching FormContainer warning style */}
            <p className="text-xs text-amber-600 text-center">
              By using {getAppName()} (web or API) you agree to these terms.
            </p>

            {/* Footer links - matching FormContainer footer style */}
            <p className="text-xs text-gray-500 leading-relaxed text-center">
              <a href="#terms" className="text-teal-600 hover:underline">
                Terms of Service
              </a>
              {" • "}
              <a href="#privacy" className="text-teal-600 hover:underline">
                Privacy Policy
              </a>
              {" • "}
              <a href="#cookies" className="text-teal-600 hover:underline">
                Use of Cookies
              </a>
              {" • "}
              <a href="/api" className="text-teal-600 hover:underline">
                API
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrimzoPolicies;
