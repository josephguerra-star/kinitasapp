/**
 * @file ProgressBar.jsx
 * @description Horizontal progress bar with configurable fill percentage and color.
 *
 * AI USAGE: Maps to a custom progress View in React Native.
 *
 * @param {number}  percentage - Progress value 0–100
 * @param {string}  [color='var(--teal)'] - CSS color for the fill
 */
export default function ProgressBar({ percentage, color = 'var(--teal)' }) {
  const clampedPct = Math.min(100, Math.max(0, percentage));
  return (
    <div className="pbar">
      <div
        className="pbar-fill"
        style={{ width: `${clampedPct}%`, background: color }}
      />
    </div>
  );
}
