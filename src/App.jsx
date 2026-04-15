/**
 * @file App.jsx
 * @description Root application component. Acts as the screen router.
 *
 * AI USAGE: Reads `currentScreen` from AppContext and renders the matching screen component.
 * Modals are rendered in an overlay layer via ModalLayer. The phone frame provides the
 * visual wrapper for the browser-based prototype.
 *
 * DEV USAGE: To add a new screen, import it and add it to the SCREEN_MAP object.
 * The phone frame styles live in global.css under `.phone`.
 * When migrating to React Native, replace the SCREEN_MAP switch with a Stack.Navigator.
 */
import { useAppContext } from './context/AppContext.jsx';
import { SCREEN_IDS } from './constants/routes.js';

// Layout
import StatusBar from './components/layout/StatusBar.jsx';

// Screens (lazy-loaded for RN readiness)
import LoginScreen         from './screens/Login/index.jsx';
import RegisterScreen      from './screens/Register/index.jsx';
import ForgotPasswordScreen from './screens/ForgotPassword/index.jsx';
import DashboardScreen     from './screens/Dashboard/index.jsx';
import PlansScreen         from './screens/Plans/index.jsx';
import CancelScreen        from './screens/Cancel/index.jsx';
import BillingScreen       from './screens/Billing/index.jsx';
import LoyaltyScreen       from './screens/Loyalty/index.jsx';
import GiftRevealScreen    from './screens/GiftReveal/index.jsx';
import ProfileScreen       from './screens/Profile/index.jsx';
import FleetScreen         from './screens/Fleet/index.jsx';
import FamilyScreen        from './screens/Family/index.jsx';
import PromoScreen         from './screens/Promo/index.jsx';

// Modals
import ModalLayer from './screens/Modals/index.jsx';

// ─── Screen Map ────────────────────────────────────────────────────────────────

/**
 * @constant SCREEN_MAP
 * @type {Object.<string, React.ComponentType>}
 * @description Maps each SCREEN_IDS constant to its screen component.
 * All screens receive no props — they pull state from AppContext.
 */
const SCREEN_MAP = {
  [SCREEN_IDS.LOGIN]:            LoginScreen,
  [SCREEN_IDS.REGISTER]:         RegisterScreen,
  [SCREEN_IDS.FORGOT_PASSWORD]:  ForgotPasswordScreen,
  [SCREEN_IDS.DASHBOARD]:        DashboardScreen,
  [SCREEN_IDS.PLANS]:            PlansScreen,
  [SCREEN_IDS.CANCEL]:           CancelScreen,
  [SCREEN_IDS.BILLING]:          BillingScreen,
  [SCREEN_IDS.LOYALTY]:          LoyaltyScreen,
  [SCREEN_IDS.GIFT_REVEAL]:      GiftRevealScreen,
  [SCREEN_IDS.PROFILE]:          ProfileScreen,
  [SCREEN_IDS.FLEET]:            FleetScreen,
  [SCREEN_IDS.FAMILY]:           FamilyScreen,
  [SCREEN_IDS.PROMO]:            PromoScreen,
};

// ─── App Root ──────────────────────────────────────────────────────────────────

/**
 * @component App
 * @description Root component. Wraps the entire app in a phone frame for the web prototype.
 * Renders the active screen plus the modal overlay layer.
 */
export default function App() {
  const { currentScreen } = useAppContext();

  // Determine which status bar color is needed (dark screens show white StatusBar)
  const darkScreens = [SCREEN_IDS.LOGIN, SCREEN_IDS.REGISTER, SCREEN_IDS.FORGOT_PASSWORD, SCREEN_IDS.GIFT_REVEAL];
  const isDark = darkScreens.includes(currentScreen);

  const ActiveScreen = SCREEN_MAP[currentScreen] || LoginScreen;

  return (
    <div className="phone">
      {/* System status bar — white on dark screens, tinted on light */}
      <StatusBar isDark={isDark} />

      {/* Render only the active screen */}
      <ActiveScreen />

      {/* Modal overlay layer — positioned absolutely over the phone frame */}
      <ModalLayer />
    </div>
  );
}
