/**
 * @file tokenService.js
 * @description JWT token persistence layer using localStorage.
 *
 * Follows the Single Responsibility Principle — this module only
 * handles reading, writing, and clearing the auth token.
 * No business logic or API calls belong here.
 *
 * DEV USAGE: When migrating to React Native, swap localStorage
 * calls with AsyncStorage or SecureStore equivalently.
 */

/** @constant {string} Storage key for the JWT auth token */
const TOKEN_KEY = 'carwash_auth_token';

/** @constant {string} Storage key for the authenticated user data */
const USER_KEY = 'carwash_auth_user';

// ─── Token Operations ───────────────────────────────────────────────────────────

/**
 * Persist the JWT token to local storage.
 * @param {string} token - Signed JWT string from the login response
 */
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Retrieve the stored JWT token.
 * @returns {string|null} The token string, or null if not authenticated
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove the JWT token from storage (logout).
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// ─── User Data Operations ───────────────────────────────────────────────────────

/**
 * Persist the authenticated user's data to local storage.
 * @param {Object} user - User object returned by the login endpoint
 */
export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Retrieve the stored user data.
 * @returns {Object|null} Parsed user object, or null if not found
 */
export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

/**
 * Remove the user data from storage (logout).
 */
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

// ─── Session Operations ─────────────────────────────────────────────────────────

/**
 * Clear all authentication data (token + user).
 * Call this on logout or when the token expires.
 */
export const clearSession = () => {
  removeToken();
  removeUser();
};

/**
 * Check if the user has an active session (token exists).
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getToken();
};
