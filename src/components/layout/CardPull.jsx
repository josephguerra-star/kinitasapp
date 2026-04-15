/**
 * @file CardPull.jsx
 * @description White rounded card that "pulls up" over the hero dark background.
 *
 * AI USAGE: Maps to a white <ScrollView> with negative top margin in React Native.
 *
 * @param {React.ReactNode} children
 * @param {Object} [style] - Additional inline styles
 */
export default function CardPull({ children, style = {} }) {
  return (
    <div className="card-pull" style={style}>
      {children}
    </div>
  );
}
