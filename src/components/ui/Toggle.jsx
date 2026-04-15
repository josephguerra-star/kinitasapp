/**
 * @file Toggle.jsx
 * @description iOS-style toggle switch for boolean preferences.
 *
 * AI USAGE: Maps to a <Switch> component in React Native.
 *
 * @param {boolean}  isOn
 * @param {Function} onToggle
 */
export default function Toggle({ isOn, onToggle }) {
  return (
    <div
      role="switch"
      aria-checked={isOn}
      tabIndex={0}
      className={`toggle ${isOn ? 'on' : 'off'}`}
      onClick={onToggle}
      onKeyDown={(e) => e.key === 'Enter' && onToggle?.()}
    >
      <div className="toggle-knob" />
    </div>
  );
}
