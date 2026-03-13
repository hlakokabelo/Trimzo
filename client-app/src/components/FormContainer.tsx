import * as React from "react";

import { useState } from "react";
import {
  FiLink,
  FiGlobe,
  FiEdit2,
  FiNavigation,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { createShortUrl } from "../util/dbServices";
import { Link } from "react-router-dom";
import type { ILink } from "./Container";
import urlValidation, {
  type IUrlValidationResult,
} from "../util/urlValidation";
import { validateAlias } from "../util/validateAlias";

interface IFormContainerProps {
  setLinks: React.Dispatch<React.SetStateAction<ILink[]>>;
}

const saveRecentLink_ToStorage = (link: any) => {
  const existing = JSON.parse(localStorage.getItem("recentLinks") || "[]");

  const updated = [link, ...existing].slice(0, 6); // keep only last 5

  localStorage.setItem("recentLinks", JSON.stringify(updated));
};

const FormContainer: React.FunctionComponent<IFormContainerProps> = ({
  setLinks,
}) => {
  const domain = import.meta.env.VITE_DOMAIN_URL;

  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [urlError, setUrlError] = useState("");
  const [AliasError, setAliasError] = useState("");
  const [btnText, setBtnText] = useState("Shorten Link");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  {
    submitted ? "Shorten Another Link" : "Shorten Link";
  }

  const btnTextVals = ["Shorten Link", "Shorten Another Link", "Shortening..."];
  const resetData = () => {
    setBtnText(btnTextVals[0]);
    setUrlError("");
    setUrl("");
    setAlias("");
    setSubmitted(false);
  };

  const handleShorten = async () => {
    if (AliasError !== "") return;

    if (submitted) {
      return resetData();
    }
    //url validation
    const validation: IUrlValidationResult = urlValidation(url);

    if (!validation.isValid) {
      setUrlError(validation.error || "Invalid URL");
      return;
    }

    const url_ = validation.url!;

    setBtnText(btnTextVals[2]);
    const data = await createShortUrl(url_, alias);

    setAlias(data.shortId);
    setError(false);
    setSubmitted(true);
    setBtnText(btnTextVals[1]);

    setLinks((prev) => [data, ...prev].slice(0, 6));
    saveRecentLink_ToStorage(data);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlError("");
    setUrl(e.target.value);
    if (e.target.value.trim()) setError(false);
    setSubmitted(false);
  };

  function handleAlias(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ): void {
    const value = e.target.value;

    setAlias(value);

    const result = validateAlias(value);

    if (!result.valid) {
      setAliasError(result.error!);
    } else {
      setAliasError("");
    }
    setSubmitted(false);
  }

  return (
    <div className="flex justify-center mr-1 ml-1 mt-[1rem] items-center min-w-[100px]">
      <div className=" bg-slate-300 rounded-2xl shadow-lg shadow-slate-600 hover:shadow-xl overflow-hidden ">
        <div className="flex">
          <div
            className={`flex-1  flex bg-white items-center justify-center gap-2 py-4 text-sm font-semibold transition-colorsbg-white text-gray-800`}
          >
            <FiLink className="w-4 h-4" />
            Shorten a Link
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Long URL */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <FiNavigation className="w-4 h-4" />
              Long URL
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={handleUrlChange}
                placeholder="Paste long URL here"
                className={`w-full px-4 py-3 pr-10 rounded-lg border text-sm outline-none transition-colors placeholder-gray-400 ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-teal-600"
                }`}
                disabled={submitted}
              />
              <div className="flex justify-center text-sm text-red-700">
                {urlError}
              </div>
              {error && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <FiAlertCircle className="w-5 h-5 text-red-500" />
                </div>
              )}
            </div>
            {error && <p className="text-xs text-red-500">Required field</p>}
          </div>

          {/* Domain + Alias */}
          <div className="grid grid-cols-2 gap-3">
            {/* Domain */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <FiGlobe className="w-4 h-4 text-gray-500" />
                Domain
              </label>
              <div className="relative">
                <div className="w-full appearance-none px-3 py-3 pr-8 rounded-lg border border-gray-300 text-sm text-gray-700 bg-white outline-none focus:border-teal-600 cursor-pointer">
                  <p>{domain}</p>
                </div>
              </div>
            </div>
            {/* Alias */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <FiEdit2 className="w-4 h-4 text-gray-500" />
                Alias
                <span className="text-gray-400 font-normal text-xs">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                value={alias}
                onChange={(e) => handleAlias(e)}
                minLength={5}
                placeholder="Add alias here"
                className="w-full px-3 py-3 rounded-lg border border-gray-300 text-sm outline-none focus:border-teal-600 placeholder-gray-400"
                disabled={submitted}
              />
              {AliasError === "" ? (
                <p className="text-xs text-gray-400">
                  Must be at least 5 characters
                </p>
              ) : (
                <div className="text-xs text-red-700">{AliasError}</div>
              )}
            </div>
          </div>

          {/* Shortened URL result */}
          {submitted && (
            <div className="flex items-start gap-2 p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700 break-all">
              <FiCheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                Shortened:{" "}
                <Link
                  to={`/${alias}`}
                  className="font-semibold underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {domain}/{alias || "abc123"}
                </Link>
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleShorten}
            className={`w-full ${submitted ? " bg-slate-600 hover:bg-slate-700 " : " bg-teal-700 hover:bg-teal-800 "} active:scale-[0.98] text-white font-semibold py-3.5 rounded-lg text-sm transition-all duration-150`}
          >
            {btnText}{" "}
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-500 leading-relaxed">
            By clicking Shorten Link, you agree to our{" "}
            <a href="#" className="text-teal-600 hover:underline">
              Terms of Service
            </a>
            ,{" "}
            <a href="#" className="text-teal-600 hover:underline">
              Privacy Policy
            </a>
            , and{" "}
            <a href="#" className="text-teal-600 hover:underline">
              Use of Cookies
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
