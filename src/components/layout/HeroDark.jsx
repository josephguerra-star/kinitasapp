/**
 * @file HeroDark.jsx
 * @description Navy hero header with decorative rings, label, title, and optional stats grid.
 *
 * AI USAGE: Maps to a dark <View> with decorative <View> circles in React Native.
 *
 * @param {string}   label
 * @param {string}   title
 * @param {Array.<{value: string, label: string}>} [stats]
 * @param {React.ReactNode} [children] - Additional content below title/stats
 */
export default function HeroDark({ label, title, stats, children }) {
  return (
    <div className="hero-dark">
      <div className="hero-ring ring-lg" />
      <div className="hero-ring ring-sm" />
      {label && <div className="hero-label">{label}</div>}
      {title && <div className="hero-title">{title}</div>}
      {stats && (
        <div className="hero-stats">
          {stats.map((s, i) => (
            <div className="hero-stat" key={i}>
              <div className="hero-stat-val">{s.value}</div>
              <div className="hero-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
