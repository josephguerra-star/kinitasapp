/**
 * @file GiftReveal/index.jsx
 * @description 3-phase post-wash gift reveal screen with animations.
 *
 * AI USAGE: Phase 1=teaser, Phase 2=tap-to-open box, Phase 3=prize reveal.
 * `currentPrize` tracks the revealed prize type from GIFT_PRIZES.
 * `hasClaimed` prevents double-claiming.
 *
 * DEV USAGE: The demo prize picker row (bottom of phase 3) should be removed in production.
 * Replace `INITIAL_PRIZE_TYPE` with the prize type returned from the wash completion API.
 */
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { SCREEN_IDS } from '../../constants/routes.js';
import { GIFT_PRIZES } from '../../constants/promos.js';
import Button from '../../components/ui/Button.jsx';

const INITIAL_PRIZE_TYPE = 'upgrade';

export default function GiftRevealScreen() {
  const { navigateTo } = useAppContext();
  const [phase, setPhase]           = useState(1); // 1 | 2 | 3
  const [prizeType, setPrizeType]   = useState(INITIAL_PRIZE_TYPE);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [actionLabel, setActionLabel] = useState(GIFT_PRIZES[INITIAL_PRIZE_TYPE].actionLabel);

  const prize = GIFT_PRIZES[prizeType];

  const handleChangePrize = (type) => {
    setPrizeType(type);
    setHasClaimed(false);
    setActionLabel(GIFT_PRIZES[type].actionLabel);
  };

  const handleAction = () => {
    if (hasClaimed) return;
    setHasClaimed(true);
    setActionLabel(prize.hasCode ? '✓ Copied!' : '✓ Claimed!');
  };

  const DecoRings = () => (
    <>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(255,255,255,.04)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(255,255,255,.04)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
    </>
  );

  return (
    <div className="screen active" style={{ background: 'var(--navy)' }}>
      <div className="scroll" style={{ overflow: 'hidden' }}>

        {/* ─── PHASE 1: Teaser ─── */}
        {phase === 1 && (
          <div style={{ minHeight: 668, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px 28px', position: 'relative' }}>
            <DecoRings />
            <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(0,201,167,.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 10, padding: '7px 13px', marginBottom: 20, position: 'relative', zIndex: 1 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--aqua)', flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.65)' }}>Wash complete · Jacksonville · Just now</span>
            </div>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(0,201,167,.15)', border: '1px solid rgba(0,201,167,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 18px', animation: 'pulse 2s ease infinite', position: 'relative', zIndex: 1 }}>🎁</div>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 10, position: 'relative', zIndex: 1 }}>You earned a gift!</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.42)', lineHeight: 1.6, marginBottom: 30, position: 'relative', zIndex: 1 }}>Your wash just finished. Something is waiting — tap below to see what you won.</div>
            <Button variant="aqua" style={{ position: 'relative', zIndex: 1, marginBottom: 12, width: '100%' }} onClick={() => setPhase(2)}>Reveal My Gift 🎉</Button>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', cursor: 'pointer', position: 'relative', zIndex: 1 }} onClick={() => navigateTo(SCREEN_IDS.DASHBOARD)}>Save for later</div>
          </div>
        )}

        {/* ─── PHASE 2: Tap to Open ─── */}
        {phase === 2 && (
          <div style={{ minHeight: 668, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px 28px', position: 'relative' }}>
            <DecoRings />
            <div className="anim-wiggle" style={{ fontSize: 96, cursor: 'pointer', userSelect: 'none', marginBottom: 24, lineHeight: 1.1, position: 'relative', zIndex: 1 }} onClick={() => setPhase(3)}>🎁</div>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8, position: 'relative', zIndex: 1 }}>Tap to open</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.35)', position: 'relative', zIndex: 1 }}>Your gift is inside...</div>
          </div>
        )}

        {/* ─── PHASE 3: Prize Reveal ─── */}
        {phase === 3 && (
          <div style={{ padding: '28px 22px', position: 'relative' }}>
            <DecoRings />
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div className="anim-pop" style={{ fontSize: 68, marginBottom: 12, lineHeight: 1.1, display: 'block' }}>{prize.emoji}</div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,.35)', marginBottom: 6 }}>You won</div>
              <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 8 }}>{prize.title}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.44)', lineHeight: 1.55, marginBottom: 18 }}>{prize.description}</div>

              {/* Code card (if prize has code and not claimed) */}
              {prize.hasCode && !hasClaimed && (
                <div style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.11)', borderRadius: 16, padding: '16px 20px', marginBottom: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.8px', color: 'rgba(255,255,255,.28)', marginBottom: 6 }}>Your gift code</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 700, color: 'var(--aqua)', letterSpacing: 4 }}>{prize.code}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.22)', marginTop: 5 }}>Expires in 30 days · Jacksonville</div>
                </div>
              )}

              {/* Claimed card (no-code prizes after claiming) */}
              {!prize.hasCode && hasClaimed && (
                <div style={{ background: 'rgba(0,201,167,.1)', border: '1px solid rgba(0,201,167,.2)', borderRadius: 16, padding: '16px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(0,201,167,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>✓</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--aqua)', marginBottom: 2 }}>{prize.claimedTitle}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', lineHeight: 1.4 }}>{prize.claimedSubtitle}</div>
                  </div>
                </div>
              )}

              <Button variant="aqua" style={{ background: hasClaimed ? 'rgba(0,201,167,.2) !important' : undefined, color: hasClaimed ? 'var(--aqua) !important' : undefined }} onClick={handleAction}>
                {actionLabel}
              </Button>
              <Button style={{ background: 'rgba(255,255,255,.07) !important', color: 'rgba(255,255,255,.5) !important', border: '1px solid rgba(255,255,255,.1) !important', fontSize: 13, height: 44 }} onClick={() => navigateTo(SCREEN_IDS.DASHBOARD)}>
                Back to Home
              </Button>

              {/* Demo prize picker — remove in production */}
              <div style={{ display: 'flex', gap: 6, marginTop: 8, justifyContent: 'center' }}>
                {Object.keys(GIFT_PRIZES).map((type) => (
                  <div key={type} style={{ background: 'rgba(255,255,255,.08)', borderRadius: 7, padding: '5px 10px', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.45)', cursor: 'pointer' }}
                    onClick={() => handleChangePrize(type)}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
