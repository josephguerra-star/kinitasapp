/**
 * @file AppContext.jsx
 * @description Global application state provider using React Context API.
 *
 * AI USAGE: This context acts as the app's state machine. It controls:
 * - Current screen (navigation)
 * - Active modal (overlay system)
 * - Authenticated user mock data
 * - Notification preferences
 * When migrating to React Native, replace `currentScreen` with a navigation stack.
 *
 * DEV USAGE:
 * - Wrap the app with <AppProvider> in main.jsx
 * - Consume via `useAppContext()` hook in any component
 * - Add state slices here for new global features (e.g., cart, theme)
 * - Never put screen-local state here; keep it in the screen component
 */

import { createContext, useContext, useState } from 'react';
import { SCREEN_IDS } from '../constants/routes.js';

// ─── Context Definition ────────────────────────────────────────────────────────

/**
 * @typedef {Object} AppContextValue
 * @property {string}   currentScreen          - The currently active screen ID
 * @property {Function} navigateTo             - Navigate to a screen by ID
 * @property {string|null} activeModal         - Currently open modal ID (or null)
 * @property {Function} openModal              - Open a modal by ID
 * @property {Function} closeModal             - Close the active modal
 * @property {Object}   currentUser            - Mock authenticated user object
 * @property {Object}   notifications          - Notification toggle states
 * @property {Function} toggleNotification     - Toggle a notification preference
 * @property {string}   selectedGiftCardAmount - Currently selected gift card value label
 * @property {Function} setSelectedGiftCardAmount
 */

const AppContext = createContext(null);

// ─── Mock User Data ────────────────────────────────────────────────────────────

/**
 * @constant MOCK_USER
 * @description Simulated authenticated user data used across all screens.
 * Replace with API response data when connecting to a real backend.
 */
const MOCK_USER = {
  firstName: 'Marcus',
  lastName: 'Rivera',
  email: 'marcus@email.com',
  phone: '+1 (904) 555-0192',
  initials: 'MR',
  plan: {
    id: 'PLUS',
    name: 'Plus',
    priceMonthly: 12,
    status: 'active',
    nextRenewal: 'Feb 14, 2025',
    homeSite: 'Jacksonville, FL',
  },
  plate: {
    number: 'ABC 1234',
    state: 'Florida',
    isActive: true,
    canChangeon: 'Feb 14, 2025',
  },
  loyalty: {
    points: 340,
    badges: 3,
    gifts: 4,
    referrals: 2,
    referralCode: 'MARCUS22',
    referralLink: 'kinitas.app/join/RIVERA2025',
  },
  stats: {
    totalWashes: 42,
    pointsBalance: 340,
    badgesCount: 3,
  },
  payment: {
    cardType: 'Visa',
    lastFour: '4242',
    expiry: '09/28',
    holderName: 'Marcus Rivera',
  },
};

// ─── Provider Component ────────────────────────────────────────────────────────

/**
 * @component AppProvider
 * @description Root state provider. Wrap <App> with this in main.jsx.
 * @param {React.ReactNode} children
 */
export function AppProvider({ children }) {
  const [currentScreen, setCurrentScreen] = useState(SCREEN_IDS.LOGIN);
  const [activeModal, setActiveModal]     = useState(null);
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
  const navigateTo = (screenId) => {
    setActiveModal(null);
    setCurrentScreen(screenId);
  };

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

  const value = {
    currentScreen,
    navigateTo,
    activeModal,
    openModal,
    closeModal,
    currentUser: MOCK_USER,
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
