/**
 * @file authService.js
 * @description Authentication service layer for the Carwash API.
 *
 * Follows the Single Responsibility Principle — this module is solely
 * responsible for making HTTP calls to the auth endpoints.
 * All business logic (state updates, navigation) stays in the calling layer.
 *
 * Endpoints consumed:
 *   POST /carwash/auth/register  → Create a new user account
 *   POST /carwash/auth/login     → Authenticate and obtain a JWT token
 */

import { API_BASE_URL } from '../config/api.js';

// ─── Response Helper ────────────────────────────────────────────────────────────

/**
 * Parse an API response and normalise it into a consistent shape.
 *
 * @param {Response} response - Fetch API Response object
 * @returns {Promise<{ ok: boolean, status: number, data: Object }>}
 */
const parseResponse = async (response) => {
  const data = await response.json();
  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};

// ─── Public API ─────────────────────────────────────────────────────────────────

/**
 * Register a new user account.
 *
 * @param {Object}  credentials
 * @param {string}  credentials.name     - Full name of the user
 * @param {string}  credentials.email    - Valid email address
 * @param {string}  credentials.password - Password (min 6 characters)
 * @param {string} [credentials.role]    - Optional ObjectId of the assigned Role
 *
 * @returns {Promise<{ ok: boolean, status: number, data: Object }>}
 *   On success (201): `{ message, user: { name, email } }`
 *   On failure (400): `{ message, error?, errors? }`
 *
 * @example
 *   const result = await registerUser({ name: 'Jane', email: 'jane@test.com', password: '123456' });
 *   if (result.ok) { // navigate to dashboard }
 */
export const registerUser = async ({ name, email, password, role }) => {
  const body = { name, email, password };

  // Only include `role` when a non-empty value is provided
  if (role) body.role = role;

  const response = await fetch(`${API_BASE_URL}/carwash/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return parseResponse(response);
};

/**
 * Authenticate an existing user and retrieve a JWT token.
 *
 * @param {Object} credentials
 * @param {string} credentials.email    - Registered email address
 * @param {string} credentials.password - Account password (min 6 characters)
 *
 * @returns {Promise<{ ok: boolean, status: number, data: Object }>}
 *   On success (200): `{ message, token, user: { name, email, role } }`
 *   On failure (400/404): `{ message, error? }`
 *
 * @example
 *   const result = await loginUser({ email: 'jane@test.com', password: '123456' });
 *   if (result.ok) { saveToken(result.data.token); }
 */
export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/carwash/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  return parseResponse(response);
};
