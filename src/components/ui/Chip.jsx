/**
 * @file Chip.jsx
 * @description Status/label badge supporting four color variants.
 *
 * AI USAGE: Maps to a styled <View><Text> combination in React Native.
 *
 * @param {'teal'|'gold'|'red'|'grey'} [variant='teal']
 * @param {React.ReactNode} children
 */
export default function Chip({ variant = 'teal', children, style = {} }) {
  return (
    <span className={`chip chip-${variant}`} style={style}>
      {children}
    </span>
  );
}
