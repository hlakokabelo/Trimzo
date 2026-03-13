export interface IUrlValidationResult {
  isValid: boolean;
  error?: string;
  url?: string;
}

const urlValidation = (urlString: string): IUrlValidationResult => {
  urlString = urlString.trim();

  if (!urlString) {
    return { isValid: false, error: "URL cannot be empty" };
  }

  // Check minimum length
  if (urlString.length < 4) {
    return { isValid: false, error: "URL is too short" };
  }

  // Check for spaces
  if (urlString.includes(" ")) {
    return { isValid: false, error: "URL cannot contain spaces" };
  }

  // Add protocol if missing
  let normalizedUrl = urlString;
  if (!/^https?:\/\//i.test(urlString)) {
    normalizedUrl = "http://" + urlString;
  }

  // Validate URL structure
  try {
    const parsedUrl = new URL(normalizedUrl);

    // Check if hostname has at least one dot
    if (!parsedUrl.hostname.includes(".")) {
      return {
        isValid: false,
        error: "Invalid domain format (e.g., example.com)",
      };
    }

    // Check for valid TLD (at least 2 characters after last dot)
    const tld = parsedUrl.hostname.split(".").pop() || "";
    if (tld.length < 2) {
      return {
        isValid: false,
        error: "Invalid top-level domain",
      };
    }

    // Optional: Block common malicious patterns
    const blockedPatterns = [
      /javascript:/i,
      /data:/i,
      /vbscript:/i,
      /%00/,
      /\\/,
      /\.\.\//,
    ];

    if (blockedPatterns.some((pattern) => pattern.test(urlString))) {
      return {
        isValid: false,
        error: "URL contains invalid characters or patterns",
      };
    }

    return { isValid: true, url: parsedUrl+"" };
  } catch {
    return {
      isValid: false,
      error: "Invalid URL format. Please include http:// or https://",
    };
  }
};
export default urlValidation;
