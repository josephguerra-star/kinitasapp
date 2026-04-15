/**
 * @file ListRow.jsx
 * @description Standard list row with icon, body (title + subtitle), and optional right content.
 *
 * AI USAGE: Maps to a row <View> in React Native with flex layout.
 *
 * @param {React.ReactNode} icon     - Emoji or element for the left icon slot
 * @param {string}          iconBg   - CSS background color for icon circle
 * @param {string}          title
 * @param {string}          [subtitle]
 * @param {React.ReactNode} [right]  - Content for the right slot
 * @param {Function}        [onClick]
 * @param {boolean}         [noBorder=false]
 */
export default function ListRow({ icon, iconBg, title, subtitle, right, onClick, noBorder = false, style = {} }) {
  return (
    <div
      className="list-row"
      style={{ ...(noBorder ? { borderBottom: 'none' } : {}), ...(onClick ? { cursor: 'pointer' } : {}), ...style }}
      onClick={onClick}
    >
      <div className="row-icon" style={{ background: iconBg }}>{icon}</div>
      <div className="row-body">
        <div className="row-title">{title}</div>
        {subtitle && <div className="row-sub">{subtitle}</div>}
      </div>
      {right && <div className="row-right">{right}</div>}
    </div>
  );
}
