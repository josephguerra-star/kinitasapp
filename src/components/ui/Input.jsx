/**
 * @file Input.jsx
 * @description Labeled text input with support for plate and code variants.
 *
 * AI USAGE: Corresponds to <TextInput> in React Native. The `variant` prop
 * switches font family and transforms (for plates/promo codes).
 *
 * DEV USAGE: Always provide a `label` for accessibility. Use `variant='plate'`
 * for license plates and `variant='code'` for promo codes.
 *
 * @param {string} [label]
 * @param {'default'|'plate'|'code'} [variant='default']
 * @param {boolean} [error=false]
 */
export default function Input({
  label,
  variant    = 'default',
  error      = false,
  className  = '',
  style      = {},
  ...rest
}) {
  const variantClass = variant === 'plate' ? 'input-plate'
                     : variant === 'code'  ? 'input-code'
                     : '';

  return (
    <div className="field">
      {label && <label>{label}</label>}
      <input
        className={`input ${variantClass} ${error ? 'err' : ''} ${className}`.trim()}
        style={style}
        {...rest}
      />
    </div>
  );
}
