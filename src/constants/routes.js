/**
 * @file routes.js
 * @description Screen identifier constants used for navigation throughout the app.
 *
 * AI USAGE: Every navigation target in the app corresponds to one of these IDs.
 * The AppContext `navigateTo(screenId)` function expects these values.
 * The router in App.jsx maps each ID to its screen component.
 *
 * DEV USAGE: Always use SCREEN_IDS constants instead of raw string literals.
 * To add a new screen: add its ID here, create its component, and register it in App.jsx.
 */

/**
 * @constant SCREEN_IDS
 * @type {Object.<string, string>}
 * @description All valid screen identifiers used for navigation.
 */
export const SCREEN_IDS = {
  /** Authentication: sign-in form */
  LOGIN: 'login',
  /** Authentication: 4-step registration wizard */
  REGISTER: 'register',
  /** Authentication: forgot password flow */
  FORGOT_PASSWORD: 'forgotPassword',
  /** Main: home dashboard */
  DASHBOARD: 'dashboard',
  /** Main: membership plans management */
  PLANS: 'plans',
  /** Main: FTC-compliant cancellation flow */
  CANCEL: 'cancel',
  /** Main: billing history and payment method */
  BILLING: 'billing',
  /** Main: loyalty points, gifts, badges, referrals */
  LOYALTY: 'loyalty',
  /** Main: post-wash gift reveal animation */
  GIFT_REVEAL: 'giftReveal',
  /** Main: user profile, plate, notifications */
  PROFILE: 'profile',
  /** Enterprise: fleet account management */
  FLEET: 'fleet',
  /** Social: family plan management */
  FAMILY: 'family',
  /** Promotions: promo code entry and history */
  PROMO: 'promo',
};

/**
 * @constant BOTTOM_NAV_SCREENS
 * @type {Array.<{screenId: string, label: string, icon: string}>}
 * @description Ordered list of screens displayed in the bottom navigation bar.
 */
export const BOTTOM_NAV_SCREENS = [
  { screenId: SCREEN_IDS.DASHBOARD, label: 'Home',    icon: '🏠' },
  { screenId: SCREEN_IDS.PLANS,     label: 'Plans',   icon: '✨' },
  { screenId: SCREEN_IDS.LOYALTY,   label: 'Loyalty', icon: '⭐' },
  { screenId: SCREEN_IDS.BILLING,   label: 'Billing', icon: '🧾' },
  { screenId: SCREEN_IDS.PROFILE,   label: 'Profile', icon: '👤' },
];

/**
 * @constant MODAL_IDS
 * @type {Object.<string, string>}
 * @description Identifiers for all bottom-sheet modals in the app.
 */
export const MODAL_IDS = {
  SWITCH_PLAN:   'switchPlan',
  PAUSE_PLAN:    'pausePlan',
  UPGRADE_PLAN:  'upgradePlan',
  EDIT_PROFILE:  'editProfile',
  ADD_PLATE:     'addPlate',
  INVITE_FAMILY: 'inviteFamily',
};
