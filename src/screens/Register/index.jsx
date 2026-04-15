/**
 * @file Register/index.jsx
 * @description 4-step membership registration wizard.
 *
 * AI USAGE: Manages a `currentStep` local state (1–4).
 * Steps: 1=Account Details, 2=Plate, 3=Choose Plan, 4=Payment.
 * `selectedPlan` stores the chosen MembershipPlan object.
 *
 * DEV USAGE: Replace the final "Start Membership" action with a real API registration call.
 * Validation on each step can be added inside handleNextStep().
 */
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { SCREEN_IDS } from '../../constants/routes.js';
import { MEMBERSHIP_PLANS, DEFAULT_PLAN_ID, LOCATIONS } from '../../constants/plans.js';
import StepBar from '../../components/ui/StepBar.jsx';
import Button from '../../components/ui/Button.jsx';
import PasswordInput from '../../components/ui/PasswordInput.jsx';
import PlanCard from '../../components/ui/PlanCard.jsx';

/** Labels for each registration step header */
const STEP_LABELS = ['Account Details', 'Your Plate', 'Choose Plan', 'Payment'];

export default function RegisterScreen() {
  const { navigateTo } = useAppContext();
  const [currentStep, setCurrentStep]   = useState(1);
  const [plate, setPlate]               = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState(DEFAULT_PLAN_ID);
  const [termsAccepted, setTermsAccepted]   = useState(false);

  const selectedPlan = MEMBERSHIP_PLANS.find((p) => p.id === selectedPlanId);

  const goToStep = (n) => setCurrentStep(n);

  return (
    <div className="screen active" style={{ background: 'var(--navy)' }}>

      {/* ── Header ── */}
      <div style={{ background: 'var(--navy)', padding: '16px 20px 40px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div className="hero-ring ring-lg" />
        {/* Back + logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18, position: 'relative', zIndex: 1 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
            onClick={() => navigateTo(SCREEN_IDS.LOGIN)}>←</div>
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 16, fontWeight: 700, color: '#fff' }}>Kinitas</div>
        </div>
        {/* Step bar */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <StepBar totalSteps={4} currentStep={currentStep} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{STEP_LABELS[currentStep - 1]}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>Step {currentStep} of 4</span>
          </div>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="card-pull">

        {/* ═══ STEP 1: Account Details ═══ */}
        {currentStep === 1 && (
          <div>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Create your account</div>
            <div style={{ fontSize: 13, color: 'var(--hint)', marginBottom: 18 }}>Start your Kinitas membership today</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field"><label>First Name</label><input className="input" placeholder="First" /></div>
              <div className="field"><label>Last Name</label><input className="input" placeholder="Last" /></div>
            </div>
            <div className="field"><label>Email</label><input className="input" type="email" placeholder="you@email.com" autoCapitalize="none" inputMode="email" /></div>
            <PasswordInput id="reg-pw" label="Password" placeholder="At least 8 characters" />
            <div className="field">
              <label>Home Location</label>
              <select className="input" style={{ cursor: 'pointer' }}>
                {LOCATIONS.map((loc) => (
                  <option key={loc.code}>{loc.label}, {loc.state}</option>
                ))}
              </select>
            </div>
            <Button variant="navy" onClick={() => goToStep(2)}>Continue →</Button>
            <Button variant="ghost" onClick={() => navigateTo(SCREEN_IDS.LOGIN)}>Already have an account</Button>
          </div>
        )}

        {/* ═══ STEP 2: Plate ═══ */}
        {currentStep === 2 && (
          <div>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Register your plate</div>
            <div style={{ fontSize: 13, color: 'var(--hint)', marginBottom: 16 }}>The kiosk uses your plate to identify your car</div>
            <div style={{ background: 'var(--surf2)', borderRadius: 12, padding: '12px 14px', borderLeft: '3px solid var(--teal)', marginBottom: 16, display: 'flex', gap: 9 }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>🚗</span>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                License Plate Recognition (LPR) automatically identifies your car.{' '}
                <strong style={{ color: 'var(--navy)' }}>One plate per membership.</strong> Change once per billing cycle.
              </p>
            </div>
            <div className="field">
              <label>License Plate</label>
              <input className="input input-plate" placeholder="ABC 1234" maxLength={9}
                value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} />
            </div>
            <div className="field">
              <label>State</label>
              <select className="input" style={{ cursor: 'pointer' }}>
                {['Florida', 'Georgia', 'Alabama', 'South Carolina'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <Button variant="navy" onClick={() => goToStep(3)}>Continue →</Button>
          </div>
        )}

        {/* ═══ STEP 3: Choose Plan ═══ */}
        {currentStep === 3 && (
          <div>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Choose your plan</div>
            <div style={{ fontSize: 13, color: 'var(--hint)', marginBottom: 16 }}>All plans include gifts, badges, points & referrals.</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {MEMBERSHIP_PLANS.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={selectedPlanId === plan.id}
                  onSelect={() => setSelectedPlanId(plan.id)}
                />
              ))}
            </div>
            <Button variant="navy" onClick={() => goToStep(4)}>
              Continue with {selectedPlan?.name} · ${selectedPlan?.priceMonthly}/mo →
            </Button>
          </div>
        )}

        {/* ═══ STEP 4: Payment ═══ */}
        {currentStep === 4 && (
          <div>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Payment details</div>
            <div style={{ fontSize: 13, color: 'var(--hint)', marginBottom: 16 }}>You won't be charged until you confirm.</div>
            {/* Order summary */}
            <div style={{ background: 'var(--surf2)', borderRadius: 13, padding: 14, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--hint)' }}>Plan</span>
                <span style={{ fontWeight: 600, color: 'var(--navy)' }}>{selectedPlan?.name} · ${selectedPlan?.priceMonthly}/mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--hint)' }}>Plate</span>
                <span style={{ fontWeight: 600, color: 'var(--navy)' }}>{plate || 'ABC 1234'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderTop: '1px solid var(--border)', paddingTop: 8, marginTop: 4 }}>
                <span style={{ fontWeight: 700, color: 'var(--navy)' }}>Total due today</span>
                <span style={{ fontFamily: "'Noto Serif', serif", fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>${selectedPlan?.priceMonthly}.00</span>
              </div>
            </div>
            <div className="field"><label>Name on Card</label><input className="input" placeholder="Your full name" /></div>
            {/* Card placeholder */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.7px', color: 'var(--hint)', marginBottom: 6 }}>Card Details</label>
              <div style={{ height: 50, border: '1.5px solid var(--border)', borderRadius: 13, padding: '0 14px', background: 'var(--surf2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, color: '#b8bfcc' }}>Card number</span>
                <span style={{ fontSize: 11, color: 'var(--hint)' }}>VISA MC AMEX</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {['MM / YY', 'CVC'].map((p) => (
                <div key={p} style={{ height: 50, border: '1.5px solid var(--border)', borderRadius: 13, padding: '0 14px', background: 'var(--surf2)', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, color: '#b8bfcc' }}>{p}</span>
                </div>
              ))}
            </div>
            {/* Terms checkbox */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16 }}>
              <div
                onClick={() => setTermsAccepted((v) => !v)}
                style={{ width: 18, height: 18, borderRadius: 5, border: '1.5px solid var(--border2)', flexShrink: 0, marginTop: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s', background: termsAccepted ? 'var(--teal)' : '', borderColor: termsAccepted ? 'var(--teal)' : '', color: '#fff', fontSize: 10, fontWeight: 700 }}>
                {termsAccepted ? '✓' : ''}
              </div>
              <p style={{ fontSize: 12, color: 'var(--hint)', lineHeight: 1.5 }}>
                I agree to the <a href="#" style={{ color: '#305ea0' }}>Terms of Service</a> and{' '}
                <a href="#" style={{ color: '#305ea0' }}>Privacy Policy</a>. Membership renews automatically each month.
              </p>
            </div>
            <Button variant="navy" onClick={() => navigateTo(SCREEN_IDS.DASHBOARD)}>Start Membership →</Button>
          </div>
        )}
      </div>
    </div>
  );
}
