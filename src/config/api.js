/**
 * @file api.js
 * @description Centralised API configuration constants.
 *
 * All service modules import their base URL from here so that
 * environment changes only need to be made in one place.
 *
 * DEV USAGE: Update `API_BASE_URL` to point to a staging or production
 * server when deploying. You can also pull from `import.meta.env.VITE_API_URL`
 * for Vite environment variable support.
 */

/**
 * @constant {string} API_BASE_URL
 * @description Root URL for the Carwash backend API.
 * Falls back to localhost:3000 when no environment variable is set.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';
