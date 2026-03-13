export type AliasValidationResult = {
  valid: boolean;
  error?: string;
};

const reserved = ["sign-in", "sign-up", "profile", "admin", "api", "404"];

export function validateAlias(alias: string): AliasValidationResult {
  const trimmed = alias.trim();

  if (reserved.includes(trimmed.toLowerCase())) {
    return {
      valid: false,
      error: "This alias is reserved",
    };
  }

  //ignore cause alias is gonna be generated
  if (trimmed.length === 0) return { valid: true };

  if (trimmed.length < 5) {
    return {
      valid: false,
      error: "Alias must be at least 5 characters long",
    };
  }

  if (trimmed.length > 30) {
    return {
      valid: false,
      error: "Alias must be less than 30 characters",
    };
  }

  if (!/^[a-zA-Z0-9]/.test(trimmed)) {
    return {
      valid: false,
      error: "Alias must start with a letter or number",
    };
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    return {
      valid: false,
      error: "Only letters, numbers, - and _ are allowed",
    };
  }

  return { valid: true };
}
