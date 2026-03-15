import { useState } from "react";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  showIcon?: boolean;
  copyMessage?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  className = "",
  showIcon = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {}
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-2 text-2xl font-medium
        rounded-md transition-all duration-200
        ${
          copied
            ? "text-green-900 hover:text-green-600"
            : "text-black hover:text-slate-500"
        }
        ${className}
      `}
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
    >
      {showIcon && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="flex-shrink-0"
        >
          {copied ? (
            // Check icon
            <path
              d="M20 6L9 17L4 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            // Copy icon
            <>
              <rect
                x="9"
                y="9"
                width="13"
                height="13"
                rx="2"
                ry="2"
                fill="none"
              />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </>
          )}
        </svg>
      )}
    </button>
  );
};

export default CopyButton;
