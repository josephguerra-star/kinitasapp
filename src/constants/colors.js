/**
 * @file colors.js
 * @description Design token constants mapping CSS variable names to JavaScript identifiers.
 *
 * AI USAGE: These tokens define the entire visual palette of the Kinitas app.
 * All color references in components should come from this file.
 * When migrating to React Native, map each key to a StyleSheet color value.
 *
 * DEV USAGE: Add new colors here before using them in components.
 * Use the CSS variable equivalent in global.css and reference this object in JS code.
 */

/**
 * @constant COLOR_TOKENS
 * @type {Object.<string, string>}
 * @description Map of semantic color names to CSS variable strings.
 * Mirrors the :root CSS variables defined in global.css.
 */
export const COLOR_TOKENS = {
  /** Primary navy brand color — used for backgrounds, hero sections, and primary buttons */
  navy: 'var(--navy)',
  /** Lighter navy — used for banners and secondary dark surfaces */
  navy2: 'var(--navy2)',
  /** Teal accent — used for active states, CTAs, and success indicators */
  teal: 'var(--teal)',
  /** Light teal background — used for chip and card backgrounds */
  tealBg: 'var(--teal-bg)',
  /** Medium teal — used for teal-on-dark text */
  tealMid: 'var(--teal-mid)',
  /** Aqua — used for highlight buttons on dark backgrounds */
  aqua: 'var(--aqua)',
  /** Gold — used for rewards, gifts, and premium indicators */
  gold: 'var(--gold)',
  /** Light gold background */
  goldBg: 'var(--gold-bg)',
  /** Gold border color */
  goldBorder: 'var(--gold-border)',
  /** Surface background — primary app background */
  surf: 'var(--surf)',
  /** Surface 2 — secondary card/input background */
  surf2: 'var(--surf2)',
  /** Surface 3 — disabled/tertiary background */
  surf3: 'var(--surf3)',
  /** Primary text color */
  text: 'var(--text)',
  /** Muted text — secondary descriptions */
  muted: 'var(--muted)',
  /** Hint text — placeholder and tertiary labels */
  hint: 'var(--hint)',
  /** Default border color */
  border: 'var(--border)',
  /** Stronger border color */
  border2: 'var(--border2)',
  /** Pure white */
  white: 'var(--white)',
  /** Danger/error red */
  danger: 'var(--danger)',
  /** Danger background */
  dangerBg: 'var(--danger-bg)',
  /** Danger border */
  dangerBorder: 'var(--danger-border)',
};

/**
 * @constant PLAN_COLORS
 * @type {Object.<string, string>}
 * @description Background colors for each membership plan card.
 */
export const PLAN_COLORS = {
  BASIC: '#eff6ff',
  PLUS: 'var(--teal-bg)',
  SUPER: 'var(--gold-bg)',
  PREMIUM: '#fdf2f8',
};
