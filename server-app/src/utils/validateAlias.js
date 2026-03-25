
const reserved = ["sign-in", "sign-up", "profile","policies", "admin", "api", "404"];

export function validateAlias(alias) {
  const trimmed = alias.trim();

  if (reserved.includes(trimmed.toLowerCase())) {
    return {
      isValid: false,
      error: "This alias is reserved",
    };
  }

  //ignore cause alias is gonna be generated
  if (trimmed.length === 0) return { isValid: true };

  if (trimmed.length < 5) {
    return {
      isValid: false,
      error: "Alias must be at least 5 characters long",
    };
  }

  if (trimmed.length > 30) {
    return {
      isValid: false,
      error: "Alias must be less than 30 characters",
    };
  }

  if (!/^[a-zA-Z0-9]/.test(trimmed)) {
    return {
      isValid: false,
      error: "Alias must start with a letter or number",
    };
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    return {
      isValid: false,
      error: "Only letters, numbers, - and _ are allowed",
    };
  }

  return { isValid: true };
}
