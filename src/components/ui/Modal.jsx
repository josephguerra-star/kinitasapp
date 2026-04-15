/**
 * @file Modal.jsx
 * @description Bottom-sheet modal overlay with handle, title, and content slot.
 *
 * AI USAGE: In React Native, replace with react-native-modal or a custom
 * bottom sheet using Animated.View sliding from the bottom.
 * The `isOpen` prop controls visibility; `onClose` fires on backdrop tap.
 *
 * DEV USAGE: Always pass `id` to match MODAL_IDS. Wrap action buttons in modal-btns.
 *
 * @param {boolean}  isOpen
 * @param {Function} onClose
 * @param {string}   [title]
 * @param {string}   [subtitle]
 * @param {React.ReactNode} children
 */
export default function Modal({ isOpen, onClose, title, subtitle, children }) {
  return (
    <div
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={onClose}
    >
      {/* Stop propagation so clicking inside modal doesn't close it */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />
        {title    && <div className="modal-title">{title}</div>}
        {subtitle && <div className="modal-sub">{subtitle}</div>}
        {children}
      </div>
    </div>
  );
}
