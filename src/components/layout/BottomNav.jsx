/**
 * @file BottomNav.jsx
 * @description App-wide bottom navigation bar with 5 tabs.
 *
 * AI USAGE: Corresponds to a Tab.Navigator in React Navigation (React Native).
 * Each tab item maps to a BOTTOM_NAV_SCREENS entry.
 *
 * DEV USAGE: Receives `activeScreen` from AppContext. Highlights the matching tab.
 * To add tabs, update BOTTOM_NAV_SCREENS in constants/routes.js.
 *
 * @param {string}   activeScreen - Currently active SCREEN_IDS value
 * @param {Function} onNavigate   - Called with screenId when tab is tapped
 */
import { BOTTOM_NAV_SCREENS } from '../../constants/routes.js';

export default function BottomNav({ activeScreen, onNavigate }) {
  return (
    <div className="bnav">
      {BOTTOM_NAV_SCREENS.map(({ screenId, label, icon }) => {
        const isActive = activeScreen === screenId;
        return (
          <div
            key={screenId}
            className={`ni ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(screenId)}
          >
            <span className="ni-ico">{icon}</span>
            <span className="ni-lbl" style={isActive ? { color: 'var(--teal)' } : {}}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
