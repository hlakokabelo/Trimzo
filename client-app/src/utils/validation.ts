// src/utils/validation.ts

export interface ValidationResult {
  field?: string;
  message?: string;
  value?: any;
  isValid: boolean; // true if no error, false if error
}

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return {
      field: 'password',
      message: 'Password is required',
      isValid: false,
    };
  }

  if (password.length < 6) {
    return {
      field: 'password',
      message: `Password must be at least 6 characters (current: ${password.length})`,
      value: password.length,
      isValid: false,
    };
  }
  // No error
  return {
    field: 'password',
    message: '',
    isValid: true,
  };
};

// Username validation
export const validateUsername = (username: string): ValidationResult => {
  if (!username) {
    return {
      field: 'username',
      message: 'Username is required',
      isValid: false,
    };
  }

  const trimmed = username.trim();
  
  if (trimmed.length < 3) {
    return {
      field: 'username',
      message: `Username must be at least 3 characters (current: ${trimmed.length})`,
      value: trimmed.length,
      isValid: false,
    };
  }

  if (trimmed.length > 20) {
    return {
      field: 'username',
      message: `Username must not exceed 20 characters (current: ${trimmed.length})`,
      value: trimmed.length,
      isValid: false,
    };
  }

  // Check for valid characters (alphanumeric and underscore only)
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(trimmed)) {
    return {
      field: 'username',
      message: 'Username can only contain letters, numbers, and underscores',
      isValid: false,
    };
  }

  // Check if starts with letter or underscore
  if (!/^[a-zA-Z_]/.test(trimmed)) {
    return {
      field: 'username',
      message: 'Username must start with a letter or underscore',
      isValid: false,
    };
  }

  // No error
  return {
    field: 'username',
    message: '',
    isValid: true,
  };
};

// Name validation
export const validateName = (name?: string): ValidationResult => {
  // Name is optional, so empty is valid
  if (!name || !name.trim()) {
    return {
      field: 'name',
      message: '',
      isValid: true,
    };
  }

  const trimmed = name.trim();
  
  if (trimmed.length > 80) {
    return {
      field: 'name',
      message: `Name must not exceed 80 characters (current: ${trimmed.length})`,
      value: trimmed.length,
      isValid: false,
    };
  }

  // Optional: Check for valid characters
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(trimmed)) {
    return {
      field: 'name',
      message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
      isValid: false,
    };
  }

  // No error
  return {
    field: 'name',
    message: '',
    isValid: true,
  };
};
