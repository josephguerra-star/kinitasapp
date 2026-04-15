/**
 * @file StatusBar.jsx
 * @description Simulated mobile status bar with time and signal indicators.
 *
 * AI USAGE: In React Native, use react-native-status-bar or platform StatusBar API.
 * This component is only needed for the browser prototype.
 *
 * DEV USAGE: Rendered once at the top of <App> inside the phone frame.
 */
export default function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <span>●●●● ▓</span>
    </div>
  );
}
