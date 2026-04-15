/**
 * @file Plans/index.jsx
 * @description Membership plans management screen.
 *
 * AI USAGE: Shows current plan status and all available plans. Upgrade, pause, and cancel
 * actions open their respective modals via AppContext.openModal().
 *
 * DEV USAGE: `MEMBERSHIP_PLANS` from constants drives the plans grid.
 * Connect upgrade/pause confirmation to real API calls inside the modal actions.
 */
import { useAppContext } from '../../context/AppContext.jsx';
import { SCREEN_IDS, MODAL_IDS } from '../../constants/routes.js';
import { MEMBERSHIP_PLANS } from '../../constants/plans.js';
import HeroDark from '../../components/layout/HeroDark.jsx';
import BottomNav from '../../components/layout/BottomNav.jsx';
import Chip from '../../components/ui/Chip.jsx';
import Button from '../../components/ui/Button.jsx';

export default function PlansScreen() {
  const { navigateTo, openModal, currentUser } = useAppContext();
  const { plan } = currentUser;

  return (
    <div className="screen active">
      <div className="scroll">
        <HeroDark label="Membership" title="Your Plan">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(0,104,117,.35)', border: '1px solid rgba(0,201,167,.25)', borderRadius: 99, padding: '4px 10px', position: 'relative', zIndex: 1 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--aqua)' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--teal-mid)' }}>{plan.name} Plan</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>· ${plan.priceMonthly}/mo · Active</span>
          </div>
        </HeroDark>

        {/* ── Current plan card ── */}
        <div style={{ margin: '0 14px', marginTop: -16, position: 'relative', zIndex: 2 }}>
          <div className="card">
            {[
              { label: 'Status',       right: <Chip variant="teal">● Active</Chip> },
              { label: 'Next renewal', right: <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{plan.nextRenewal}</span> },
              { label: 'Amount',       right: <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>${plan.priceMonthly}.00 / month</span> },
              { label: 'Home site',    right: <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{plan.homeSite}</span> },
            ].map((row, i, arr) => (
              <div key={row.label} className="list-row" style={{ paddingTop: i === 0 ? 0 : undefined, paddingBottom: i === arr.length - 1 ? 0 : undefined, borderBottom: i === arr.length - 1 ? 'none' : undefined }}>
                <div style={{ flex: 1, fontSize: 13, color: 'var(--hint)' }}>{row.label}</div>
                {row.right}
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
              <Button variant="navy" size="sm" style={{ height: 42, width: '100%' }} onClick={() => openModal(MODAL_IDS.UPGRADE_PLAN)}>Upgrade Plan</Button>
              <Button variant="surface" size="sm" style={{ height: 42, width: '100%' }} onClick={() => openModal(MODAL_IDS.PAUSE_PLAN)}>Pause Plan</Button>
            </div>
          </div>
        </div>

        {/* ── All plans grid ── */}
        <div className="sec">
          <div className="sec-hdr"><div className="sec-title">All Plans</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {MEMBERSHIP_PLANS.map((p) => {
              const isCurrent = p.id === plan.id;
              return (
                <div key={p.id} style={{ background: p.bgColor, borderRadius: 15, padding: 14, cursor: 'pointer', border: `2px solid ${isCurrent ? 'var(--teal)' : 'transparent'}`, position: 'relative' }}
                  onClick={() => !isCurrent && openModal(MODAL_IDS.SWITCH_PLAN)}>
                  {isCurrent && (
                    <div style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18, background: 'var(--teal)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700 }}>✓</div>
                  )}
                  <span style={{ fontSize: 20, display: 'block', marginBottom: 7 }}>{p.emoji}</span>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>{p.id}</div>
                  <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 22, fontWeight: 700, color: 'var(--navy)' }}>${p.priceMonthly}</div>
                  <div style={{ fontSize: 10, color: 'var(--hint)' }}>/month{isCurrent ? ' · current' : ''}</div>
                </div>
              );
            })}
          </div>

          {/* Upgrade banner */}
          <div style={{ background: 'var(--navy)', borderRadius: 18, padding: 18, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
            <div className="hero-ring" style={{ width: 180, height: 180, top: -70, right: -50 }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, position: 'relative', zIndex: 1 }}>
              <div>
                <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 3 }}>Upgrade to SUPER</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>$4 more · premium wash tier</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 22, fontWeight: 700, color: 'var(--aqua)' }}>$16</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)' }}>/month</div>
              </div>
            </div>
            <Button variant="aqua" size="sm" style={{ width: '100%', height: 46, position: 'relative', zIndex: 1 }} onClick={() => openModal(MODAL_IDS.SWITCH_PLAN)}>
              Upgrade to SUPER · $16/mo
            </Button>
          </div>

          {/* Manage membership */}
          <div className="sec-hdr" style={{ marginTop: 4 }}><div className="sec-title">Manage Membership</div></div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => openModal(MODAL_IDS.PAUSE_PLAN)}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Pause Membership</div>
                <div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 2 }}>Pause for 1–3 months</div>
              </div>
              <span style={{ color: 'var(--border)' }}>›</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', cursor: 'pointer' }} onClick={() => navigateTo(SCREEN_IDS.CANCEL)}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--danger)' }}>Cancel Membership</div>
                <div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 2 }}>Effective at end of billing period</div>
              </div>
              <span style={{ color: 'var(--danger)' }}>›</span>
            </div>
          </div>
        </div>
        <div style={{ height: 20 }} />
      </div>
      <BottomNav activeScreen={SCREEN_IDS.PLANS} onNavigate={navigateTo} />
    </div>
  );
}
