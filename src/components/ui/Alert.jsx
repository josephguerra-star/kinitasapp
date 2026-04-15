/**
 * @file Alert.jsx
 * @description Inline alert banner for form validation and feedback.
 *
 * AI USAGE: Maps to a conditional <View> with text in React Native.
 *
 * @param {'error'|'success'} [variant='error']
 * @param {React.ReactNode} children
 */
export default function Alert({ variant = 'error', children }) {
  if (!children) return null;
  const variantClass = variant === 'success' ? 'alert-ok' : 'alert-err';
  return (
    <div className={`alert ${variantClass}`}>
      {children}
    </div>
  );
}
