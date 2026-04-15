/**
 * @file Cancel/index.jsx
 * @description FTC-compliant 5-step membership cancellation flow.
 *
 * AI USAGE: Manages `currentStep` state 1–5. Steps:
 * 1=What you'll lose, 2=Stay alternatives, 3=Reason survey, 4=Confirm, 5=Cancelled success.
 * `selectedReason` tracks the user's cancellation reason (optional).
 *
 * DEV USAGE: Replace the final step's `navigateTo(DASHBOARD)` with an API cancellation call.
 * The reason from step 3 can be sent as analytics/feedback to the backend.
 */
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { SCREEN_IDS } from '../../constants/routes.js';
import StepBar from '../../components/ui/StepBar.jsx';
import Button from '../../components/ui/Button.jsx';

const STEP_LABELS = ["What you'll lose", 'Stay with Kinitas?', 'Your reason', 'Confirm'];

const CANCEL_REASONS = [
  'Too expensive',
  'Not washing often enough',
  'Moving out of the area',
  'Switching to another service',
  'Temporary — I\'ll be back',
  'Other',
];

const PERKS_LOST = [
  { icon: '🎁', iconBg: 'var(--gold-bg)', title: 'Post-wash Gifts', sub: 'Every wash earns a surprise', lossLabel: 'Gone' },
  { icon: '💧', iconBg: 'var(--teal-bg)', title: 'Points Balance', sub: 'Your earned points will be lost', lossLabel: '340 pts' },
  { icon: '🔥', iconBg: '#fff3e0',        title: 'Badges & Streaks', sub: '3-week streak + 3 badges', lossLabel: 'Lost' },
  { icon: '👥', iconBg: '#fce4ec',        title: 'Referral Perks', sub: '$10 in pending credits', lossLabel: '$10.00' },
  { icon: '✨', iconBg: 'var(--teal-bg)', title: 'PLUS Wash Tier', sub: 'Premium wash at Jacksonville', lossLabel: 'Gone' },
];

export default function CancelScreen() {
  const { navigateTo, openModal } = useAppContext();
  const [currentStep, setCurrentStep]       = useState(1);
  const [selectedReason, setSelectedReason] = useState(null);

  const goToStep = (n) => setCurrentStep(n);

  return (
    <div className="screen active">
      {/* ── Step header ── */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '12px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>
            {currentStep <= 4 ? STEP_LABELS[currentStep - 1] : 'Cancelled'}
          </div>
          {currentStep <= 4 && <div style={{ fontSize: 12, color: 'var(--hint)' }}>Step {currentStep} of 4</div>}
        </div>
        {currentStep <= 4 && <StepBar totalSteps={4} currentStep={currentStep} />}
      </div>

      <div className="scroll">

        {/* ─── STEP 1: What you'll lose ─── */}
        {currentStep === 1 && (
          <div style={{ padding: '22px 18px 32px' }}>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>Before you go...</div>
            <div style={{ fontSize: 13, color: 'var(--hint)', marginBottom: 16 }}>Here's what you'll lose when your membership ends.</div>
            <div style={{ background: 'var(--surf2)', borderRadius: 13, padding: '12px 14px', display: 'flex', gap: 9, marginBottom: 16 }}>
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>📅</span>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>Your <strong style={{ color: 'var(--navy)' }}>PLUS membership stays active until Feb 14</strong>. You won't lose access immediately.</p>
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {PERKS_LOST.map((perk, i) => (
                <div key={perk.title} className="list-row" style={{ padding: '10px 16px', borderBottom: i < PERKS_LOST.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div className="row-icon" style={{ background: perk.iconBg }}>{perk.icon}</div>
                  <div className="row-body">
                    <div className="row-title" style={{ fontSize: 13 }}>{perk.title}</div>
                    <div className="row-sub">{perk.sub}</div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--danger)' }}>{perk.lossLabel}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <Button variant="navy" onClick={() => goToStep(2)}>See alternatives →</Button>
              <Button variant="surface" onClick={() => goToStep(4)}>Skip to cancellation</Button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Alternatives ─── */}
        {currentStep === 2 && (
          <div style={{ padding: '22px 18px 32px' }}>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>Stay with Kinitas?</div>
            <div style={{ fontSize: 13, color: 'var(--hint)', marginBottom: 16 }}>Consider one of these before you cancel.</div>
            {/* Pause card */}
            <div className="card" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13, marginBottom: 12 }}>
                <div className="row-icon" style={{ background: 'var(--teal-bg)', width: 42, height: 42, borderRadius: 12 }}>⏸️</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>Pause your membership</div>
                  <div style={{ fontSize: 12, color: 'var(--hint)', lineHeight: 1.4 }}>Pause for 1–3 months. Points, badges, and referrals are preserved.</div>
                </div>
              </div>
              <Button variant="teal" size="sm" style={{ width: '100%', height: 42 }} onClick={() => navigateTo(SCREEN_IDS.PLANS)}>Pause for 1 month →</Button>
            </div>
            {/* Downgrade card */}
            <div className="card" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13, marginBottom: 12 }}>
                <div className="row-icon" style={{ background: '#eff6ff', width: 42, height: 42, borderRadius: 12 }}>⬇️</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>Downgrade to Basic</div>
                  <div style={{ fontSize: 12, color: 'var(--hint)', lineHeight: 1.4 }}>Keep your membership at $8/mo. Still earn gifts, points, and badges.</div>
                </div>
              </div>
              <Button variant="navy" size="sm" style={{ width: '100%', height: 42 }} onClick={() => navigateTo(SCREEN_IDS.PLANS)}>Switch to Basic · $8/mo →</Button>
            </div>
            <div style={{ textAlign: 'center', marginTop: 8, fontSize: 13, color: 'var(--hint)', cursor: 'pointer' }} onClick={() => goToStep(3)}>No thanks, continue to cancel →</div>
          </div>
        )}

        {/* ─── STEP 3: Reason ─── */}
        {currentStep === 3 && (
          <div style={{ padding: '22px 18px 32px' }}>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>One quick question</div>
            <div style={{ fontSize: 13, color: 'var(--hint)', marginBottom: 16 }}>Why are you leaving? This is optional.</div>
            {CANCEL_REASONS.map((reason) => (
              <div key={reason} className={`radio-opt ${selectedReason === reason ? 'sel' : ''}`} onClick={() => setSelectedReason(reason)}>
                <div className="radio-dot" />
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{reason}</span>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <Button variant="navy" onClick={() => goToStep(4)}>Continue →</Button>
              <Button variant="surface" onClick={() => goToStep(4)}>Skip this step</Button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: Confirm ─── */}
        {currentStep === 4 && (
          <div style={{ padding: '22px 18px 32px' }}>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>Confirm cancellation</div>
            <div style={{ fontSize: 13, color: 'var(--hint)', marginBottom: 16 }}>Your membership stays active until Feb 14.</div>
            <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: 16, padding: 18, marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--danger)', marginBottom: 10 }}>⚠️ Cancellation summary</div>
              {[['Membership', 'PLUS · $12/mo'], ['Benefits end', 'Feb 14, 2025'], ['Points forfeited', '340 pts'], ['Confirmation email', 'Sent automatically']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: '#93000a' }}>{k}</span><span style={{ fontWeight: 700, color: '#690005' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--surf2)', borderRadius: 13, padding: '11px 13px', display: 'flex', gap: 9, marginBottom: 16 }}>
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>✉️</span>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>A confirmation will be emailed to <strong style={{ color: 'var(--navy)' }}>marcus@email.com</strong> immediately.</p>
            </div>
            <Button variant="danger" onClick={() => goToStep(5)}>Yes, cancel my membership</Button>
            <Button variant="surface" onClick={() => navigateTo(SCREEN_IDS.PLANS)}>Go back — keep my membership</Button>
          </div>
        )}

        {/* ─── STEP 5: Success ─── */}
        {currentStep === 5 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 28px' }}>
            <div className="anim-pop" style={{ width: 68, height: 68, borderRadius: '50%', background: 'var(--surf2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 18px' }}>✓</div>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Membership cancelled</div>
            <div style={{ fontSize: 13, color: 'var(--hint)', lineHeight: 1.6, marginBottom: 20 }}>You'll have full access until your billing period ends.</div>
            <div style={{ background: 'var(--surf2)', borderRadius: 14, padding: '14px 18px', marginBottom: 28, width: '100%', textAlign: 'left' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.7px', color: 'var(--hint)', marginBottom: 4 }}>Access ends on</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)' }}>February 14, 2025</div>
              <div style={{ fontSize: 12, color: 'var(--hint)', marginTop: 3 }}>Confirmation sent to marcus@email.com</div>
            </div>
            <Button variant="navy" style={{ width: '100%' }} onClick={() => navigateTo(SCREEN_IDS.DASHBOARD)}>Back to Dashboard</Button>
            <div style={{ fontSize: 12, color: 'var(--hint)', marginTop: 10, lineHeight: 1.5 }}>Changed your mind? Resubscribe from the Plans screen.</div>
          </div>
        )}
      </div>
    </div>
  );
}
