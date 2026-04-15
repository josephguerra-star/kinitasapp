/**
 * @file Profile/index.jsx
 * @description User profile screen with plate info, personal data, notification toggles, and account links.
 *
 * AI USAGE: Uses `currentUser` from AppContext. Notification toggles call `toggleNotification`.
 * Edit profile and sign-out actions use openModal/navigateTo.
 *
 * DEV USAGE: When building real save functionality, POST profile changes in handleSaveProfile.
 */
import { useAppContext } from '../../context/AppContext.jsx';
import { SCREEN_IDS, MODAL_IDS } from '../../constants/routes.js';
import BottomNav from '../../components/layout/BottomNav.jsx';
import Toggle from '../../components/ui/Toggle.jsx';
import Chip from '../../components/ui/Chip.jsx';

const NOTIFICATION_SETTINGS = [
  { key: 'email',   icon: '📧', iconBg: 'var(--teal-bg)', label: 'Email notifications', sub: 'Billing receipts, updates' },
  { key: 'push',    icon: '🔔', iconBg: 'var(--gold-bg)', label: 'Push notifications',  sub: 'Wash complete, gifts' },
  { key: 'wash',    icon: '🚗', iconBg: '#fce4ec',        label: 'Wash alerts',          sub: 'Notify when your car enters' },
  { key: 'loyalty', icon: '⭐', iconBg: 'var(--gold-bg)', label: 'Loyalty & rewards',   sub: 'Badges, point milestones' },
];

export default function ProfileScreen() {
  const { navigateTo, openModal, currentUser, notifications, toggleNotification } = useAppContext();
  const { firstName, lastName, email, phone, initials, plan, plate } = currentUser;

  return (
    <div className="screen active">
      <div className="scroll">

        {/* ── Profile Hero ── */}
        <div style={{ background: 'var(--white)', padding: '24px 20px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Noto Serif', serif", fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{initials}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 19, fontWeight: 700, color: 'var(--navy)' }}>{firstName} {lastName}</div>
            <div style={{ fontSize: 13, color: 'var(--hint)', marginTop: 2 }}>{email}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--teal-bg)', borderRadius: 99, padding: '3px 10px', marginTop: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--teal)' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)' }}>{plan.name} · {plan.homeSite.split(',')[0]}</span>
            </div>
          </div>
          <div style={{ background: 'var(--surf3)', color: 'var(--navy)', fontSize: 12, fontWeight: 700, borderRadius: 9, padding: '6px 12px', cursor: 'pointer', flexShrink: 0 }} onClick={() => openModal(MODAL_IDS.EDIT_PROFILE)}>Edit</div>
        </div>

        <div style={{ margin: '0 14px' }}>

          {/* ── Plate ── */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 18 }}>Your Plate</div>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <div className="plate">{plate.number}</div>
                <div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 8 }}>{plate.state} · LPR active</div>
              </div>
              <Chip variant="teal">● Active</Chip>
            </div>
            <div style={{ background: 'var(--surf2)', borderRadius: 12, padding: '11px 13px', display: 'flex', gap: 9, marginBottom: 14 }}>
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>🚗</span>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>This plate is how the kiosk identifies your membership. <strong style={{ color: 'var(--navy)' }}>One plate per membership.</strong></p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: 'var(--hint)' }}>Change available on</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--navy)' }}>{plate.canChangeon}</span>
            </div>
            <div style={{ background: 'var(--surf3)', borderRadius: 12, padding: 11, textAlign: 'center', fontSize: 13, fontWeight: 700, color: 'var(--hint)' }}>Change Plate — available {plate.canChangeon}</div>
          </div>

          {/* ── Personal Info ── */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 8 }}>Personal Info</div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {[
              { icon: '👤', iconBg: 'var(--teal-bg)', label: 'Full Name', val: `${firstName} ${lastName}` },
              { icon: '✉️', iconBg: '#eef2ff',        label: 'Email',     val: email },
              { icon: '📱', iconBg: 'var(--gold-bg)', label: 'Phone',     val: phone },
            ].map((row, i, arr) => (
              <div key={row.label} className="list-row" style={{ padding: '13px 16px', cursor: 'pointer', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }} onClick={() => openModal(MODAL_IDS.EDIT_PROFILE)}>
                <div className="row-icon" style={{ background: row.iconBg }}>{row.icon}</div>
                <div className="row-body"><div className="row-title">{row.label}</div><div className="row-sub">{row.val}</div></div>
                <span style={{ color: 'var(--border)' }}>›</span>
              </div>
            ))}
          </div>

          {/* ── Notifications ── */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 8 }}>Notifications</div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {NOTIFICATION_SETTINGS.map((n, i, arr) => (
              <div key={n.key} className="list-row" style={{ padding: '13px 16px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="row-icon" style={{ background: n.iconBg }}>{n.icon}</div>
                <div className="row-body"><div className="row-title">{n.label}</div><div className="row-sub">{n.sub}</div></div>
                <Toggle isOn={notifications[n.key]} onToggle={() => toggleNotification(n.key)} />
              </div>
            ))}
          </div>

          {/* ── Account Links ── */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 8 }}>Account</div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {[
              { icon: '👨‍👩‍👦', iconBg: '#eef2ff',        label: 'Family Plan',  sub: '2 members · Primary', screen: SCREEN_IDS.FAMILY },
              { icon: '🚛',    iconBg: 'var(--surf2)',   label: 'Fleet Account', sub: 'Rivera Logistics LLC', screen: SCREEN_IDS.FLEET },
              { icon: '🏷️',   iconBg: '#fdf2f8',        label: 'Promo Codes',  sub: '1 active discount',   screen: SCREEN_IDS.PROMO },
            ].map((row, i, arr) => (
              <div key={row.label} className="list-row" style={{ padding: '13px 16px', cursor: 'pointer', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }} onClick={() => navigateTo(row.screen)}>
                <div className="row-icon" style={{ background: row.iconBg }}>{row.icon}</div>
                <div className="row-body"><div className="row-title">{row.label}</div><div className="row-sub">{row.sub}</div></div>
                <span style={{ color: 'var(--border)' }}>›</span>
              </div>
            ))}
          </div>

          {/* ── Danger Actions ── */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: 8, marginBottom: 20 }}>
            <div className="list-row" style={{ padding: '13px 16px', cursor: 'pointer' }} onClick={() => navigateTo(SCREEN_IDS.LOGIN)}>
              <div className="row-icon" style={{ background: 'var(--surf2)' }}>🚪</div>
              <span style={{ fontSize: 14, fontWeight: 600, flex: 1, color: 'var(--muted)' }}>Sign Out</span>
              <span style={{ color: 'var(--border)' }}>›</span>
            </div>
            <div className="list-row" style={{ padding: '13px 16px', cursor: 'pointer', borderBottom: 'none' }} onClick={() => navigateTo(SCREEN_IDS.CANCEL)}>
              <div className="row-icon" style={{ background: 'var(--danger-bg)' }}>⛔</div>
              <span style={{ fontSize: 14, fontWeight: 600, flex: 1, color: 'var(--danger)' }}>Cancel Membership</span>
              <span style={{ color: 'var(--danger)' }}>›</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNav activeScreen={SCREEN_IDS.PROFILE} onNavigate={navigateTo} />
    </div>
  );
}
