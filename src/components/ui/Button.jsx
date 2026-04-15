/**
 * @file Button.jsx
 * @description Reusable button component supporting all design-system variants.
 *
 * AI USAGE: Maps to a <Pressable> or <TouchableOpacity> in React Native.
 * The `variant` prop controls color scheme; `size` controls height/padding.
 *
 * DEV USAGE: Always prefer this component over raw <button> elements.
 * Do not add inline styles; use the variant system. Add new variants in global.css.
 *
 * @param {'navy'|'teal'|'aqua'|'surface'|'ghost'|'danger'} [variant='navy']
 * @param {'default'|'sm'} [size='default']
 * @param {Function} onClick
 * @param {string} [className] - Extra CSS class names
 * @param {React.ReactNode} children
 */
export default function Button({ variant = 'navy', size = 'default', onClick, className = '', children, style = {} }) {
  const variantClass = `btn-${variant}`;
  const sizeClass    = size === 'sm' ? 'btn-sm' : '';

  return (
    <div
      role="button"
      tabIndex={0}
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      style={style}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {children}
    </div>
  );
}
