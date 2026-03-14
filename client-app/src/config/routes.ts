const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const ROUTES = {
  // Auth routes
  auth: {
    signup: `${API_BASE_URL}/auth/signup`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
  },
  
  // URL routes
  urls: {
    base: `${API_BASE_URL}/shortenUrl`,
    get: (id: string) => `${API_BASE_URL}/shortenUrl/${id}`,
    myUrls: `${API_BASE_URL}/urls/me`,
    delete: (id: string) => `${API_BASE_URL}/urls/${id}`,
    updateAlias: `${API_BASE_URL}/urls/alias`,
  },
  
  // User routes
  users: {
    base: `${API_BASE_URL}/users`,
    updateMe: `${API_BASE_URL}/users/me`,
  },
} as const;

export type Routes = typeof ROUTES;