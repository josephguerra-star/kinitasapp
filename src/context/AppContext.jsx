/**
 * @file AppContext.jsx
 * @description Global application state provider using React Context API.
 *
 * AI USAGE: This context acts as the app's state machine. It controls:
 * - Current screen (navigation)
 * - Active modal (overlay system)
 * - Authenticated user data (from API or localStorage session)
 * - Authentication actions (login, register, logout)
 * - Notification preferences
 * When migrating to React Native, replace `currentScreen` with a navigation stack.
 *
 * DEV USAGE:
 * - Wrap the app with <AppProvider> in main.jsx
 * - Consume via `useAppContext()` hook in any component
 * - Add state slices here for new global features (e.g., cart, theme)
 * - Never put screen-local state here; keep it in the screen component
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SCREEN_IDS } from '../constants/routes.js';
import { loginUser, registerUser } from '../services/authService.js';
import {
  saveToken,
  saveUser,
  getUser,
  clearSession,
  isAuthenticated,
} from '../services/tokenService.js';

// ─── Context Definition ────────────────────────────────────────────────────────

/**
 * @typedef {Object} AppContextValue
 * @property {string}      currentScreen          - The currently active screen ID
 * @property {Function}    navigateTo             - Navigate to a screen by ID
 * @property {string|null} activeModal            - Currently open modal ID (or null)
 * @property {Function}    openModal              - Open a modal by ID
 * @property {Function}    closeModal             - Close the active modal
 * @property {Object|null} currentUser            - Authenticated user object (null = logged out)
 * @property {boolean}     isLoading              - True while an auth request is in-flight
 * @property {Function}    handleLogin            - Calls the login API and updates state
 * @property {Function}    handleRegister         - Calls the register API and updates state
 * @property {Function}    handleLogout           - Clears session and returns to login
 * @property {Object}      notifications          - Notification toggle states
 * @property {Function}    toggleNotification     - Toggle a notification preference
 * @property {string}      selectedGiftCardAmount - Currently selected gift card value label
 * @property {Function}    setSelectedGiftCardAmount
 */

const AppContext = createContext(null);

// ─── Fallback User Data ────────────────────────────────────────────────────────

/**
 * @constant FALLBACK_USER
 * @description Default user shape used when the API response does not include
 * all expected fields. Keeps the rest of the UI from breaking.
 */
const FALLBACK_USER = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  initials: '??',
  plan: {
    id: 'PLUS',
    name: 'Plus',
    priceMonthly: 12,
    status: 'active',
    nextRenewal: 'N/A',
    homeSite: 'N/A',
  },
  plate: {
    number: 'N/A',
    state: 'N/A',
    isActive: false,
    canChangeon: 'N/A',
  },
  loyalty: {
    points: 0,
    badges: 0,
    gifts: 0,
    referrals: 0,
    referralCode: '',
    referralLink: '',
  },
  stats: {
    totalWashes: 0,
    pointsBalance: 0,
    badgesCount: 0,
  },
  payment: {
    cardType: 'N/A',
    lastFour: '0000',
    expiry: 'N/A',
    holderName: 'N/A',
  },
};

// ─── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Build a full user object from an API response, merging with fallback data.
 *
 * @param {Object} apiUser - The `user` object from the login/register response
 * @returns {Object} Normalised user object safe for the rest of the app
 */
const buildUserFromApiResponse = (apiUser) => {
  const nameParts = (apiUser.name || '').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return {
    ...FALLBACK_USER,
    firstName,
    lastName,
    email: apiUser.email || '',
    initials: `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || '??',
    role: apiUser.role || null,
  };
};

// ─── Provider Component ────────────────────────────────────────────────────────

/**
 * @component AppProvider
 * @description Root state provider. Wrap <App> with this in main.jsx.
 * @param {React.ReactNode} children
 */
export function AppProvider({ children }) {
  // Restore session from localStorage on mount
  const savedUser = getUser();
  const initialScreen = isAuthenticated() && savedUser
    ? SCREEN_IDS.DASHBOARD
    : SCREEN_IDS.LOGIN;

  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [activeModal, setActiveModal]     = useState(null);
  const [currentUser, setCurrentUser]     = useState(savedUser);
  const [isLoading, setIsLoading]         = useState(false);
  const [notifications, setNotifications] = useState({
    email:   true,
    push:    true,
    wash:    true,
    loyalty: false,
  });
  const [selectedGiftCardAmount, setSelectedGiftCardAmount] = useState('$25');

  /**
   * Navigate to a screen by its SCREEN_IDS constant.
   * Closes any open modal when navigating.
   * @param {string} screenId - One of SCREEN_IDS values
   */
  const navigateTo = useCallback((screenId) => {
    setActiveModal(null);
    setCurrentScreen(screenId);
  }, []);

  /**
   * Open a bottom-sheet modal by ID.
   * @param {string} modalId - One of MODAL_IDS values
   */
  const openModal = (modalId) => setActiveModal(modalId);

  /** Close the currently open modal */
  const closeModal = () => setActiveModal(null);

  /**
   * Toggle a notification preference on/off.
   * @param {'email' | 'push' | 'wash' | 'loyalty'} key
   */
  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ─── Auth Actions ──────────────────────────────────────────────────────────

  /**
   * Authenticate a user via the login API.
   *
   * @param {Object}  credentials
   * @param {string}  credentials.email    - User's email
   * @param {string}  credentials.password - User's password
   * @returns {Promise<{ ok: boolean, errorMessage?: string }>}
   */
  const handleLogin = useCallback(async ({ email, password }) => {
    setIsLoading(true);

    try {
      const result = await loginUser({ email, password });

      if (!result.ok) {
        // Build a user-friendly error message from the API response
        const errorMessage = result.data.message
          || result.data.errors?.map((e) => e.msg).join('. ')
          || 'Login failed. Please try again.';
        return { ok: false, errorMessage };
      }

      // Persist token and user data
      const { token, user: apiUser } = result.data;
      const user = buildUserFromApiResponse(apiUser);

      saveToken(token);
      saveUser(user);
      setCurrentUser(user);
      navigateTo(SCREEN_IDS.DASHBOARD);

      return { ok: true };
    } catch (error) {
      console.error('Login error:', error);
      return { ok: false, errorMessage: 'Network error. Please check your connection.' };
    } finally {
      setIsLoading(false);
    }
  }, [navigateTo]);

  /**
   * Register a new user via the register API.
   * On success, automatically logs the user in (persists token/user)
   * but does NOT navigate — the calling screen controls post-register UX.
   *
   * @param {Object}  credentials
   * @param {string}  credentials.name     - Full name
   * @param {string}  credentials.email    - Email address
   * @param {string}  credentials.password - Password (min 6 chars)
   * @param {string} [credentials.role]    - Optional role ObjectId
   * @returns {Promise<{ ok: boolean, errorMessage?: string }>}
   */
  const handleRegister = useCallback(async ({ name, email, password, role }) => {
    setIsLoading(true);

    try {
      const result = await registerUser({ name, email, password, role });

      if (!result.ok) {
        const errorMessage = result.data.message
          || result.data.errors?.map((e) => e.msg).join('. ')
          || 'Registration failed. Please try again.';
        return { ok: false, errorMessage };
      }

      // Registration successful — auto-login to persist the session
      // but DON'T navigate (the Register wizard continues to Step 2)
      const loginResult = await loginUser({ email, password });

      if (loginResult.ok) {
        const { token, user: apiUser } = loginResult.data;
        const user = buildUserFromApiResponse(apiUser);
        saveToken(token);
        saveUser(user);
        setCurrentUser(user);
        // Navigation is intentionally omitted here
      }

      return { ok: true };
    } catch (error) {
      console.error('Register error:', error);
      return { ok: false, errorMessage: 'Network error. Please check your connection.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Log out the current user and return to the login screen.
   */
  const handleLogout = useCallback(() => {
    clearSession();
    setCurrentUser(null);
    navigateTo(SCREEN_IDS.LOGIN);
  }, [navigateTo]);

  // ─── Context Value ─────────────────────────────────────────────────────────

  const value = {
    currentScreen,
    navigateTo,
    activeModal,
    openModal,
    closeModal,
    currentUser: currentUser || FALLBACK_USER,
    isLoading,
    handleLogin,
    handleRegister,
    handleLogout,
    notifications,
    toggleNotification,
    selectedGiftCardAmount,
    setSelectedGiftCardAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ─── Custom Hook ───────────────────────────────────────────────────────────────

/**
 * @hook useAppContext
 * @description Access global app state. Must be used inside <AppProvider>.
 * @returns {AppContextValue}
 */
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
