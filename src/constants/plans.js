/**
 * @file plans.js
 * @description Membership plan configuration data.
 *
 * AI USAGE: This is the single source of truth for all plan metadata.
 * When the user selects a plan during registration or upgrade, the plan object
 * is retrieved from MEMBERSHIP_PLANS using the plan id.
 *
 * DEV USAGE: To add or modify plans, update MEMBERSHIP_PLANS.
 * To change password strength logic, update PASSWORD_STRENGTH_CONFIG.
 */

/**
 * @typedef {Object} MembershipPlan
 * @property {string} id - Unique plan identifier (BASIC | PLUS | SUPER | PREMIUM)
 * @property {string} name - Display name
 * @property {number} priceMonthly - Monthly price in USD
 * @property {string} emoji - Representative emoji icon
 * @property {string} bgColor - Card background CSS color
 * @property {boolean} isPopular - Whether to show the "Popular" badge
 */

/**
 * @constant MEMBERSHIP_PLANS
 * @type {MembershipPlan[]}
 * @description All available membership plans, ordered by price ascending.
 */
export const MEMBERSHIP_PLANS = [
  {
    id: 'BASIC',
    name: 'Basic',
    priceMonthly: 8,
    emoji: '🚗',
    bgColor: '#eff6ff',
    isPopular: false,
  },
  {
    id: 'PLUS',
    name: 'Plus',
    priceMonthly: 12,
    emoji: '✨',
    bgColor: 'var(--teal-bg)',
    isPopular: true,
  },
  {
    id: 'SUPER',
    name: 'Super',
    priceMonthly: 16,
    emoji: '💎',
    bgColor: 'var(--gold-bg)',
    isPopular: false,
  },
  {
    id: 'PREMIUM',
    name: 'Premium',
    priceMonthly: 22,
    emoji: '👑',
    bgColor: '#fdf2f8',
    isPopular: false,
  },
];

/**
 * @constant DEFAULT_PLAN_ID
 * @type {string}
 * @description The plan pre-selected by default in registration.
 */
export const DEFAULT_PLAN_ID = 'PLUS';

/**
 * @constant LOCATIONS
 * @type {{code: string, label: string, state: string}[]}
 * @description Available Kinitas car wash locations.
 */
export const LOCATIONS = [
  { code: 'JAX', label: 'Jacksonville', state: 'FL' },
  { code: 'TPA', label: 'Tampa',        state: 'FL' },
  { code: 'ORL', label: 'Orlando',      state: 'FL' },
];

/**
 * @constant PASSWORD_STRENGTH_COLORS
 * @type {string[]}
 * @description Colors used for the password strength indicator (indexed by strength score 0-4).
 */
export const PASSWORD_STRENGTH_COLORS = [
  '#b8bfcc',   // 0 — empty
  '#ba1a1a',   // 1 — too short
  '#e8a000',   // 2 — weak
  '#e8a000',   // 3 — fair
  '#006875',   // 4 — strong
];

/**
 * @constant PASSWORD_STRENGTH_LABELS
 * @type {string[]}
 * @description Label text for each strength level (indexed by score 0-4).
 */
export const PASSWORD_STRENGTH_LABELS = [
  'Enter a password',
  'Too short',
  'Weak',
  'Fair',
  'Strong',
];
