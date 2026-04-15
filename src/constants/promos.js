/**
 * @file promos.js
 * @description Promo code database and gift prize configuration.
 *
 * AI USAGE: VALID_PROMO_CODES contains promo metadata for display and validation.
 * EXPIRED_PROMO_CODES contains codes that are no longer active.
 * GIFT_PRIZES defines the possible post-wash gift rewards.
 *
 * DEV USAGE: To add new promo codes, append entries to VALID_PROMO_CODES or
 * EXPIRED_PROMO_CODES. To add new prize types, extend GIFT_PRIZES.
 */

/**
 * @typedef {Object} PromoCode
 * @property {string} title - Short success headline
 * @property {string} subtitle - Explanation of what the code grants
 * @property {string} icon - Emoji icon for the promo entry
 * @property {string} savings - Display string for the savings value
 * @property {'free_month' | 'percent' | 'flat'} type - Type of discount
 */

/**
 * @constant VALID_PROMO_CODES
 * @type {Object.<string, PromoCode>}
 * @description Currently valid promotion codes keyed by uppercase code string.
 */
export const VALID_PROMO_CODES = {
  FIRSTMONTH: {
    title: 'First month free!',
    subtitle: 'Your first billing cycle is on us.',
    icon: '🎉',
    savings: '$12.00',
    type: 'free_month',
  },
  SUMMER20: {
    title: '20% off for 3 months',
    subtitle: '20% discount on your next 3 renewals.',
    icon: '☀️',
    savings: '−$2.40/mo',
    type: 'percent',
  },
  LOYAL10: {
    title: '10% loyalty discount',
    subtitle: '10% off for 3 months.',
    icon: '⭐',
    savings: '−$1.20/mo',
    type: 'percent',
  },
};

/**
 * @constant EXPIRED_PROMO_CODES
 * @type {Object.<string, string>}
 * @description Expired promotion codes mapped to their expiry message string.
 */
export const EXPIRED_PROMO_CODES = {
  EXPIRED99: 'This promotion ended on Dec 31, 2024.',
};

/**
 * @typedef {Object} GiftPrize
 * @property {string} emoji - Large display emoji
 * @property {string} title - Prize name headline
 * @property {string} description - Short description of the reward
 * @property {boolean} hasCode - Whether this prize is redeemed via a code
 * @property {string} [code] - Alphanumeric gift code (when hasCode is true)
 * @property {string} actionLabel - CTA button label
 * @property {string} [claimedTitle] - Confirmation title (when hasCode is false)
 * @property {string} [claimedSubtitle] - Confirmation subtitle
 */

/**
 * @constant GIFT_PRIZES
 * @type {Object.<string, GiftPrize>}
 * @description All available gift prize types that can be won after a wash.
 */
export const GIFT_PRIZES = {
  upgrade: {
    emoji: '🌟',
    title: 'Free Upgrade',
    description: 'Your next wash is bumped to SUPER tier — on us. Applies automatically on your next visit.',
    hasCode: true,
    code: 'GIFT7Z9',
    actionLabel: 'Copy Code',
  },
  credit: {
    emoji: '💧',
    title: '$3.00 Credit',
    description: '$3.00 has been added to your account balance.',
    hasCode: false,
    actionLabel: 'Claim Reward',
    claimedTitle: 'Credit saved to your account',
    claimedSubtitle: 'Applies automatically on your next renewal.',
  },
  wash: {
    emoji: '🚗',
    title: 'Free Single Wash',
    description: 'Use the code at the kiosk or it applies via LPR.',
    hasCode: true,
    code: 'WASH4K1',
    actionLabel: 'Copy Code',
  },
  discount: {
    emoji: '🎫',
    title: '20% Off Next Renewal',
    description: 'Your next renewal is discounted by 20%.',
    hasCode: false,
    actionLabel: 'Claim Reward',
    claimedTitle: 'Discount saved to your account',
    claimedSubtitle: 'Applied automatically to your next renewal.',
  },
};

/**
 * @constant GIFT_CARD_AMOUNTS
 * @type {Array.<{label: string, value: number | null}>}
 * @description Preset gift card denominations. null value = custom amount.
 */
export const GIFT_CARD_AMOUNTS = [
  { label: '$10', value: 10 },
  { label: '$25', value: 25 },
  { label: '$50', value: 50 },
  { label: '✏️', value: null }, // custom
];

/**
 * @constant DEFAULT_GIFT_CARD_AMOUNT
 * @type {number}
 */
export const DEFAULT_GIFT_CARD_AMOUNT = 25;
