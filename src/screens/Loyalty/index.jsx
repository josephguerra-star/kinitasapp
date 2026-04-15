/**
 * @file Loyalty/index.jsx
 * @description Loyalty rewards screen: points balance, gift history, badges, referral, and gift cards.
 *
 * AI USAGE: Reads `currentUser.loyalty` from AppContext for points/badges/referral data.
 * Gift card selection is managed by AppContext `selectedGiftCardAmount`.
 * `copyRef()` simulates clipboard copy with a timed label reset.
 *
 * DEV USAGE: Replace static badge/gift data with API calls. Implement real clipboard copy.
 * Gift card purchase button should trigger a payment flow.
 */
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { SCREEN_IDS } from '../../constants/routes.js';
import { GIFT_CARD_AMOUNTS, DEFAULT_GIFT_CARD_AMOUNT } from '../../constants/promos.js';
import HeroDark from '../../components/layout/HeroDark.jsx';
import BottomNav from '../../components/layout/BottomNav.jsx';
import Button from '../../components/ui/Button.jsx';
import ProgressBar from '../../components/ui/ProgressBar.jsx';
import Chip from '../../components/ui/Chip.jsx';

const NEXT_POINTS_MILESTONE = 500;
const BADGES = [
  { emoji: '🔥', bg: '#fff3e0', name: 'On Fire',     sub: '3-week streak',    date: 'Jan 18', locked: false },
  { emoji: '⭐', bg: 'var(--teal-bg)', name: 'Star Member', sub: '50 washes', date: 'Dec 3',  locked: false },
  { emoji: '🏆', bg: 'var(--gold-bg)', name: 'VIP',        sub: '1-year member', date: '',   locked: true },
];

export default function LoyaltyScreen() {
  const { navigateTo, currentUser } = useAppContext();
  const { loyalty, stats } = currentUser;
  const [copyLabel, setCopyLabel]           = useState('COPY');
  const [selectedGcAmount, setSelectedGcAmount] = useState(DEFAULT_GIFT_CARD_AMOUNT);

  const pointsPct = Math.round((loyalty.points / NEXT_POINTS_MILESTONE) * 100);

  const handleCopyRef = () => {
    setCopyLabel('✓ Copied!');
    setTimeout(() => setCopyLabel('COPY'), 2500);
  };

  return (
    <div className="screen active">
      <div className="scroll">
        <HeroDark
          label={`Members · Jacksonville`}
          title="Your Rewards"
          stats={[
            { value: loyalty.points,   label: 'Points' },
            { value: stats.badgesCount, label: 'Badges' },
            { value: loyalty.gifts,    label: 'Gifts' },
            { value: loyalty.referrals,label: 'Referrals' },
          ]}
        />

        <div style={{ margin: '0 14px', marginTop: -16, position: 'relative', zIndex: 2 }}>

          {/* ── Points Balance ── */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 18 }}>Points Balance</div>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <span style={{ fontFamily: "'Noto Serif', serif", fontSize: 38, fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>{loyalty.points}</span>
                <span style={{ fontSize: 15, color: 'var(--hint)', marginLeft: 4, fontWeight: 500 }}>pts</span>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--teal)', marginTop: 4 }}>Earn 1 pt per $1 spent</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--hint)', marginBottom: 4 }}>{NEXT_POINTS_MILESTONE - loyalty.points} pts to next reward</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>Next: {NEXT_POINTS_MILESTONE} pts</div>
              </div>
            </div>
            <ProgressBar percentage={pointsPct} color="var(--teal)" />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--hint)', margin: '6px 0 14px' }}>
              <span>{loyalty.points} pts</span><span>{NEXT_POINTS_MILESTONE - loyalty.points} away</span>
            </div>
            <Button variant="teal" size="sm" style={{ width: '100%', height: 44 }}>Redeem Points</Button>
          </div>

          {/* ── Gift History ── */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 8 }}>Gift History</div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="list-row" style={{ padding: '11px 16px', cursor: 'pointer' }} onClick={() => navigateTo(SCREEN_IDS.GIFT_REVEAL)}>
              <div className="row-icon" style={{ background: '#fce4ec', fontSize: 18 }}>🎁</div>
              <div className="row-body">
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Gift Waiting!</div>
                <div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 2 }}>Jan 28 wash · Tap to reveal</div>
              </div>
              <div style={{ background: '#ec407a', color: '#fff', borderRadius: 99, padding: '4px 10px', fontSize: 12, fontWeight: 700 }}>Reveal →</div>
            </div>
            <div className="list-row" style={{ padding: '11px 16px' }}>
              <div className="row-icon" style={{ background: 'var(--gold-bg)', fontSize: 18 }}>🌟</div>
              <div className="row-body"><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Free Upgrade</div><div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 2 }}>SUPER tier for 1 wash</div></div>
              <Chip variant="gold">Claimed</Chip>
            </div>
            <div className="list-row" style={{ padding: '11px 16px', borderBottom: 'none' }}>
              <div className="row-icon" style={{ background: 'var(--teal-bg)', fontSize: 18 }}>💧</div>
              <div className="row-body"><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>$2.00 Credit</div><div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 2 }}>Added to account</div></div>
              <Chip variant="teal">Applied</Chip>
            </div>
          </div>

          {/* ── Badges ── */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 8 }}>Badges</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 8 }}>
            {BADGES.map((badge) => (
              <div key={badge.name} className="card" style={{ padding: '14px 10px', textAlign: 'center', opacity: badge.locked ? 0.4 : 1 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: badge.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, margin: '0 auto 8px' }}>{badge.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3 }}>{badge.name}</div>
                <div style={{ fontSize: 10, color: 'var(--hint)', marginTop: 2 }}>{badge.sub}</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: badge.locked ? 'var(--hint)' : 'var(--teal)', marginTop: 3 }}>{badge.locked ? 'Locked' : `Earned ${badge.date}`}</div>
              </div>
            ))}
          </div>

          {/* ── Referral ── */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 8 }}>Referral Code</div>
          <div className="card" style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--teal-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, margin: '0 auto 12px' }}>👥</div>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Share the Shine</div>
            <div style={{ fontSize: 13, color: 'var(--hint)', marginBottom: 16, lineHeight: 1.5 }}>Give a friend a free wash. Get $5 credit when they join.</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              {[{ val: loyalty.referrals, lbl: 'Referred' }, { val: `$${loyalty.referrals * 5}`, lbl: 'Earned' }].map((s) => (
                <div key={s.lbl} style={{ flex: 1, background: 'var(--surf2)', borderRadius: 12, padding: 10 }}>
                  <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: 'var(--hint)', fontWeight: 600 }}>{s.lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--surf2)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 700, color: 'var(--navy)', letterSpacing: 3 }}>{loyalty.referralCode}</span>
              <div style={{ background: 'var(--teal-bg)', color: 'var(--teal)', fontSize: 12, fontWeight: 700, borderRadius: 8, padding: '6px 12px', cursor: 'pointer' }} onClick={handleCopyRef}>{copyLabel}</div>
            </div>
            <Button variant="navy" size="sm" style={{ width: '100%', height: 46 }}>Invite Friends →</Button>
          </div>

          {/* ── Gift Cards ── */}
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 8 }}>Gift Cards</div>
          <div style={{ background: 'var(--navy)', borderRadius: 18, padding: 20, marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
            <div className="hero-ring" style={{ width: 200, height: 200, top: -80, right: -60 }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, position: 'relative', zIndex: 1 }}>
              <div>
                <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 3 }}>Send a Gift Card</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>They choose their wash, you cover it</div>
              </div>
              <span style={{ fontSize: 28, position: 'relative', zIndex: 1 }}>🎁</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, position: 'relative', zIndex: 1 }}>
              {GIFT_CARD_AMOUNTS.map((amt) => {
                const isSelected = selectedGcAmount === amt.value;
                const isCustom = amt.value === null;
                return (
                  <div key={amt.label} style={{ flex: 1, borderRadius: 11, padding: 10, textAlign: 'center', cursor: 'pointer', border: `1.5px solid ${isSelected ? 'rgba(0,201,167,.4)' : 'transparent'}`, background: isSelected ? 'rgba(0,201,167,.15)' : 'rgba(255,255,255,.08)' }}
                    onClick={() => setSelectedGcAmount(amt.value)}>
                    {isCustom
                      ? <><div style={{ fontSize: 16, color: '#fff' }}>✏️</div><div style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.4px', marginTop: 2 }}>Custom</div></>
                      : <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 16, fontWeight: 700, color: '#fff' }}>{amt.label}</div>}
                  </div>
                );
              })}
            </div>
            <Button variant="aqua" size="sm" style={{ width: '100%', height: 46, position: 'relative', zIndex: 1 }}>
              Buy Gift Card · {selectedGcAmount ? `$${selectedGcAmount}` : 'Custom'}
            </Button>
          </div>
        </div>
      </div>
      <BottomNav activeScreen={SCREEN_IDS.LOYALTY} onNavigate={navigateTo} />
    </div>
  );
}
