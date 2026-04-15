/**
 * @file Billing/index.jsx
 * @description Billing & Account screen: payment method card, home site picker, payment history.
 *
 * AI USAGE: Displays `currentUser.payment` and `currentUser.plan` from AppContext.
 * Static payment history items should be replaced by an API call when backend is ready.
 *
 * DEV USAGE: Filter tabs (All/Renewals/Washes/Credits) currently show static data.
 * Implement real filtering when connecting to payment history API.
 */
import { useAppContext } from '../../context/AppContext.jsx';
import { SCREEN_IDS } from '../../constants/routes.js';
import HeroDark from '../../components/layout/HeroDark.jsx';
import BottomNav from '../../components/layout/BottomNav.jsx';

const PAYMENT_HISTORY = [
  { id: 1, icon: '🔄', iconBg: 'var(--teal-bg)', title: 'PLUS Plan — Renewal',     date: 'Jan 14', amount: '−$12.00', amountColor: 'var(--danger)' },
  { id: 2, icon: '🚗', iconBg: 'var(--teal-bg)', title: 'Single Wash — Orlando',   date: 'Jan 28', amount: '−$18.00', amountColor: 'var(--danger)' },
  { id: 3, icon: '💧', iconBg: 'var(--teal-bg)', title: 'Referral Credit',          date: 'Jan 9',  amount: '+$5.00',  amountColor: 'var(--teal)' },
];

const SITES = [
  { code: 'JAX', label: 'Jacksonville', isActive: true },
  { code: 'TPA', label: 'Tampa',        isActive: false },
  { code: 'ORL', label: 'Orlando',      isActive: false },
];

export default function BillingScreen() {
  const { navigateTo, currentUser } = useAppContext();
  const { plan, stats, payment } = currentUser;

  return (
    <div className="screen active">
      <div className="scroll">
        <HeroDark
          label="Billing & Account"
          title="Your Account"
          stats={[
            { value: 'Feb 14', label: 'Next Renewal' },
            { value: `$${plan.priceMonthly}`, label: 'Monthly' },
            { value: stats.totalWashes, label: 'Washes' },
          ]}
        />

        <div style={{ margin: '0 14px', marginTop: -16, position: 'relative', zIndex: 2 }}>

          {/* ── Payment Method ── */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 18 }}>Payment Method</div>
            <div style={{ background: 'var(--navy)', borderRadius: 18, padding: 18, position: 'relative', overflow: 'hidden' }}>
              <div className="hero-ring" style={{ width: 200, height: 200, top: -80, right: -60 }} />
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, position: 'relative', zIndex: 1 }}>{payment.cardType}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 16, color: 'rgba(255,255,255,.85)', letterSpacing: 2, marginBottom: 14, position: 'relative', zIndex: 1 }}>•••• •••• •••• {payment.lastFour}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>{payment.holderName} · Exp {payment.expiry}</span>
                <div style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 9, padding: '7px 14px', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Update</div>
              </div>
            </div>
          </div>

          {/* ── Home Site ── */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Home Site</div>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.7px', color: 'var(--hint)', marginBottom: 4 }}>Current Site</div>
                <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>{plan.homeSite}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--hint)' }}>Resets on</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--navy)', marginTop: 3 }}>{plan.nextRenewal}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {SITES.map((site) => (
                <div key={site.code} style={{ flex: 1, borderRadius: 12, padding: '10px 6px', textAlign: 'center', border: `1.5px solid ${site.isActive ? 'var(--teal)' : 'var(--border)'}`, background: site.isActive ? 'var(--teal-bg)' : 'var(--surf2)', cursor: 'pointer' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--navy)' }}>{site.code}</div>
                  <div style={{ fontSize: 10, marginTop: 2, color: site.isActive ? 'var(--teal)' : 'var(--hint)' }}>{site.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--surf3)', borderRadius: 12, padding: 11, textAlign: 'center', fontSize: 13, fontWeight: 700, color: 'var(--hint)' }}>Change available {plan.nextRenewal}</div>
            <div style={{ fontSize: 11, color: 'var(--hint)', textAlign: 'center', marginTop: 6 }}>You've used your site change for this billing cycle</div>
          </div>

          {/* ── Payment History ── */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 8 }}>Payment History</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto' }}>
            {['All', 'Renewals', 'Washes', 'Credits'].map((tab, i) => (
              <div key={tab} style={{ padding: '6px 14px', borderRadius: 99, background: i === 0 ? 'var(--navy)' : 'var(--surf2)', color: i === 0 ? '#fff' : 'var(--muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer', border: i > 0 ? '1.5px solid var(--border)' : 'none', whiteSpace: 'nowrap' }}>{tab}</div>
            ))}
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '6px 16px', background: 'var(--surf2)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.7px', color: 'var(--hint)' }}>January 2025</div>
            </div>
            {PAYMENT_HISTORY.map((item, i) => (
              <div key={item.id} className="list-row" style={{ padding: '10px 16px', borderBottom: i < PAYMENT_HISTORY.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="row-icon" style={{ background: item.iconBg }}>{item.icon}</div>
                <div className="row-body">
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--hint)' }}>{item.date}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.amountColor }}>{item.amount}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 20 }} />
      </div>
      <BottomNav activeScreen={SCREEN_IDS.BILLING} onNavigate={navigateTo} />
    </div>
  );
}
