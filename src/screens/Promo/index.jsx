/**
 * @file Promo/index.jsx
 * @description Promo code entry screen with validation, try-pills, and applied discounts history.
 *
 * AI USAGE: `promoStatus` can be 'idle'|'valid'|'expired'|'invalid'.
 * Code lookup is done against VALID_PROMO_CODES and EXPIRED_PROMO_CODES constants.
 * The "applied" list is managed in local state and persists for the session.
 *
 * DEV USAGE: Replace `applyCode()` logic with an API call to validate and apply the promo.
 * The `appliedCodes` state should be seeded from the user's existing API data.
 */
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { SCREEN_IDS } from '../../constants/routes.js';
import { VALID_PROMO_CODES, EXPIRED_PROMO_CODES } from '../../constants/promos.js';
import HeroDark from '../../components/layout/HeroDark.jsx';
import BottomNav from '../../components/layout/BottomNav.jsx';
import Alert from '../../components/ui/Alert.jsx';
import Chip from '../../components/ui/Chip.jsx';

const INITIAL_APPLIED = [
  { code: 'FIRSTMONTH', title: 'First month free — at signup', savings: 'Saved $12.00', status: 'used' },
  { code: 'LOYAL10',    title: '10% off for 3 months',         savings: '−$1.20/mo',    status: 'active' },
];
const TRY_CODES = ['FIRSTMONTH', 'SUMMER20', 'EXPIRED99', 'BADCODE'];

export default function PromoScreen() {
  const { navigateTo } = useAppContext();
  const [inputValue, setInputValue]   = useState('');
  const [promoStatus, setPromoStatus] = useState('idle'); // idle | valid | expired | invalid
  const [validResult, setValidResult] = useState(null);
  const [expiredMsg, setExpiredMsg]   = useState('');
  const [appliedCodes, setAppliedCodes] = useState(INITIAL_APPLIED);

  const clearStatus = () => { setPromoStatus('idle'); setValidResult(null); setExpiredMsg(''); };

  const applyCode = (code = inputValue) => {
    const upper = code.trim().toUpperCase();
    if (!upper) return;
    clearStatus();

    if (VALID_PROMO_CODES[upper]) {
      const promo = VALID_PROMO_CODES[upper];
      setValidResult(promo);
      setPromoStatus('valid');
      // Add to applied list if not already present
      if (!appliedCodes.find((c) => c.code === upper)) {
        setAppliedCodes((prev) => [...prev, { code: upper, title: promo.title, savings: promo.savings, status: 'active' }]);
      }
      setTimeout(() => setInputValue(''), 600);
    } else if (EXPIRED_PROMO_CODES[upper]) {
      setExpiredMsg(EXPIRED_PROMO_CODES[upper]);
      setPromoStatus('expired');
    } else {
      setPromoStatus('invalid');
    }
  };

  const tryCode = (code) => {
    setInputValue(code);
    applyCode(code);
  };

  return (
    <div className="screen active">
      <div className="scroll">
        <HeroDark label="Promotions" title="Promo Codes">
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.42)', position: 'relative', zIndex: 1 }}>Enter a code to unlock discounts, free months, or bonus perks.</div>
        </HeroDark>

        <div style={{ margin: '0 14px', marginTop: -16, position: 'relative', zIndex: 2 }}>

          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 18 }}>Enter a Code</div>
          <div className="card">
            {/* Input + Apply button */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input
                className="input input-code"
                style={{ flex: 1, height: 52, fontSize: 18, letterSpacing: 3 }}
                placeholder="e.g. SAVE10"
                maxLength={16}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value.toUpperCase()); clearStatus(); }}
              />
              <div style={{ height: 52, width: 80, flexShrink: 0, borderRadius: 13, background: 'var(--navy)', color: '#fff', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                onClick={() => applyCode()}>Apply</div>
            </div>

            {/* Validation feedback */}
            {promoStatus === 'valid' && validResult && (
              <Alert variant="success">
                <span style={{ flexShrink: 0, marginTop: 1 }}>✅</span>
                <div><div style={{ fontWeight: 700, marginBottom: 1 }}>{validResult.title}</div><div style={{ fontSize: 11 }}>Applied to your account.</div></div>
              </Alert>
            )}
            {promoStatus === 'invalid' && (
              <Alert variant="error">
                <span style={{ flexShrink: 0, marginTop: 1 }}>❌</span>
                <div><div style={{ fontWeight: 700, marginBottom: 1 }}>Invalid code</div><div style={{ fontSize: 11 }}>This code doesn't exist or isn't available. Check for typos.</div></div>
              </Alert>
            )}
            {promoStatus === 'expired' && (
              <div className="alert" style={{ background: 'var(--gold-bg)', border: '1px solid var(--gold-border)' }}>
                <span style={{ flexShrink: 0, marginTop: 1 }}>⏰</span>
                <div><div style={{ fontWeight: 700, marginBottom: 1, color: '#7a4f00' }}>Code expired</div><div style={{ fontSize: 11, color: '#854F0B' }}>{expiredMsg}</div></div>
              </div>
            )}
          </div>

          {/* Try pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', margin: '10px 0' }}>
            <span style={{ fontSize: 11, color: 'var(--hint)', fontWeight: 600 }}>Try:</span>
            {TRY_CODES.map((code) => (
              <div key={code} style={{ background: 'var(--surf2)', border: '1px solid var(--border)', borderRadius: 99, padding: '4px 10px', fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700, color: 'var(--navy)', cursor: 'pointer', letterSpacing: 1 }}
                onClick={() => tryCode(code)}>{code}</div>
            ))}
          </div>

          {/* Applied discounts */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Applied Discounts</div>
          <div style={{ background: 'var(--white)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
            {appliedCodes.map((item, i) => (
              <div key={item.code} className="list-row" style={{ padding: '14px 16px', borderBottom: i < appliedCodes.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="row-icon" style={{ background: 'var(--teal-bg)' }}>{item.status === 'used' ? '🎉' : '⭐'}</div>
                <div className="row-body">
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 700, color: 'var(--navy)', letterSpacing: 1 }}>{item.code}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{item.title}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {item.status === 'used' ? <Chip variant="grey" style={{ fontSize: 10 }}>Used</Chip> : <Chip variant="teal" style={{ fontSize: 10 }}>● Active</Chip>}
                  <div style={{ fontSize: 12, fontWeight: 700, color: item.status === 'used' ? 'var(--hint)' : 'var(--teal)', marginTop: 5 }}>{item.savings}</div>
                </div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 8 }}>How It Works</div>
          <div className="card" style={{ marginBottom: 20 }}>
            {[
              'Enter your code and tap Apply. Not case-sensitive.',
              'Valid codes apply immediately. Discounts show on your next billing statement.',
              'Codes cannot be combined unless the promotion allows it.',
            ].map((text, i) => (
              <div key={i} className="list-row" style={{ padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--surf2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--navy)', flexShrink: 0 }}>{i + 1}</div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, flex: 1 }} dangerouslySetInnerHTML={{ __html: text.replace(/(Apply|immediately|cannot be combined)/g, '<strong style="color:var(--navy)">$1</strong>') }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav activeScreen={SCREEN_IDS.PROMO} onNavigate={navigateTo} />
    </div>
  );
}
