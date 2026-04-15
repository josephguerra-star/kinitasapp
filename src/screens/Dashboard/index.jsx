/**
 * @file Dashboard/index.jsx
 * @description Main home screen after login with user stats, gift banner, quick actions, and activity feed.
 *
 * AI USAGE: Displays `currentUser` data from AppContext. All navigation actions use SCREEN_IDS constants.
 * The gift banner navigates to GiftReveal. Quick action tiles navigate to their respective screens.
 *
 * DEV USAGE: Replace static activity items with a real API call when backend is connected.
 */
import { useAppContext } from '../../context/AppContext.jsx';
import { SCREEN_IDS } from '../../constants/routes.js';
import BottomNav from '../../components/layout/BottomNav.jsx';

/** Static mock activity feed items */
const ACTIVITY_ITEMS = [
  { id: 1, icon: '🚗', iconBg: 'var(--teal-bg)',  title: 'Wash Complete',  sub: 'Jacksonville · PLUS tier', rightTop: '+12 pts',   rightTopColor: 'var(--teal)', date: 'Jan 28' },
  { id: 2, icon: '🎁', iconBg: 'var(--gold-bg)',  title: 'Gift Revealed',  sub: 'Free tier upgrade won',   rightTop: 'Free Upgrade', rightTopColor: '#7a4f00',    date: 'Jan 28', isChip: true },
  { id: 3, icon: '🚗', iconBg: 'var(--teal-bg)',  title: 'Wash Complete',  sub: 'Jacksonville · PLUS tier', rightTop: '+12 pts',   rightTopColor: 'var(--teal)', date: 'Jan 21' },
  { id: 4, icon: '💳', iconBg: 'var(--surf2)',    title: 'Plan Renewed',   sub: 'PLUS · Auto-renew',        rightTop: '−$12.00',  rightTopColor: 'var(--danger)', date: 'Jan 14' },
];

/** Quick action tile data */
const QUICK_ACTIONS = [
  { bg: 'var(--teal-bg)', icon: '💳', label: 'Manage Plan',  sub: 'PLUS · $12/mo', screen: SCREEN_IDS.PLANS },
  { bg: 'var(--gold-bg)', icon: '🎁', label: 'Gift Cards',   sub: 'Buy or send one', screen: SCREEN_IDS.LOYALTY },
  { bg: '#eef2ff',        icon: '👨‍👩‍👦', label: 'Family Plan', sub: 'Invite members', screen: SCREEN_IDS.FAMILY },
  { bg: '#fdf2f8',        icon: '🏷️', label: 'Promo Code',   sub: 'Enter a code', screen: SCREEN_IDS.PROMO },
];

export default function DashboardScreen() {
  const { navigateTo, currentUser } = useAppContext();
  const { firstName, stats, plan }  = currentUser;

  return (
    <div className="screen active">
      <div className="scroll">

        {/* ── Hero card ── */}
        <div style={{ margin: 14, borderRadius: 22, background: 'var(--navy)', padding: 20, position: 'relative', overflow: 'hidden' }}>
          <div className="hero-ring ring-lg" /><div className="hero-ring ring-sm" />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18, position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'rgba(255,255,255,.4)', marginBottom: 3 }}>Good morning ☀️</div>
              <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 19, fontWeight: 700, color: '#fff' }}>{firstName}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(0,104,117,.35)', border: '1px solid rgba(0,201,167,.25)', borderRadius: 99, padding: '4px 10px' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--aqua)' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal-mid)' }}>{plan.id}</span>
            </div>
          </div>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, position: 'relative', zIndex: 1 }}>
            {[
              { val: stats.pointsBalance, lbl: 'Points' },
              { val: stats.badgesCount,   lbl: 'Badges' },
              { val: stats.totalWashes,   lbl: 'Washes' },
            ].map((s) => (
              <div key={s.lbl} style={{ background: 'rgba(255,255,255,.06)', borderRadius: 14, padding: '11px 10px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 19, fontWeight: 700, color: '#fff' }}>{s.val}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,.38)', textTransform: 'uppercase', letterSpacing: '.5px', fontWeight: 600, marginTop: 3 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Gift banner ── */}
        <div style={{ margin: '0 14px 4px', borderRadius: 16, background: 'var(--navy2)', border: '1px solid rgba(0,201,167,.2)', display: 'flex', alignItems: 'center', gap: 11, padding: '13px 15px', cursor: 'pointer' }}
          onClick={() => navigateTo(SCREEN_IDS.GIFT_REVEAL)}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(0,201,167,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🎁</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 1 }}>Gift waiting for you!</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)' }}>Your last wash earned a surprise</div>
          </div>
          <div style={{ background: 'var(--aqua)', color: 'var(--navy)', fontSize: 12, fontWeight: 700, borderRadius: 9, padding: '7px 13px', flexShrink: 0 }}>Reveal</div>
        </div>

        {/* ── Quick Actions ── */}
        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">Quick Actions</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {QUICK_ACTIONS.map((a) => (
              <div key={a.label} style={{ background: a.bg, borderRadius: 16, padding: 15, cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}
                onClick={() => navigateTo(a.screen)}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, marginBottom: 9 }}>{a.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>{a.label}</div>
                <div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 2 }}>{a.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Activity Feed ── */}
        <div className="sec" style={{ marginBottom: 20 }}>
          <div className="sec-hdr">
            <div className="sec-title">Recent Activity</div>
            <div className="sec-link" onClick={() => navigateTo(SCREEN_IDS.BILLING)}>View all →</div>
          </div>
          <div style={{ background: 'var(--white)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
            {ACTIVITY_ITEMS.map((item, idx) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: idx < ACTIVITY_ITEMS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 1 }}>{item.sub}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {item.isChip
                    ? <span style={{ fontSize: 10, fontWeight: 700, background: 'var(--gold-bg)', color: '#7a4f00', borderRadius: 99, padding: '2px 8px' }}>{item.rightTop}</span>
                    : <div style={{ fontSize: 13, fontWeight: 700, color: item.rightTopColor }}>{item.rightTop}</div>}
                  <div style={{ fontSize: 10, color: 'var(--hint)', marginTop: item.isChip ? 4 : 2 }}>{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeScreen={SCREEN_IDS.DASHBOARD} onNavigate={navigateTo} />
    </div>
  );
}
