/**
 * @file PlanCard.jsx
 * @description Membership plan selection card used in Register and Plans screens.
 *
 * AI USAGE: Maps to a Pressable <View> with conditional styling in React Native.
 *
 * @param {import('../../constants/plans').MembershipPlan} plan
 * @param {boolean}  isSelected
 * @param {boolean}  isCurrentPlan - Shows checkmark instead of selected ring
 * @param {Function} onSelect
 */
export default function PlanCard({ plan, isSelected, isCurrentPlan = false, onSelect }) {
  return (
    <div
      className={`plan-card ${isSelected ? 'selected' : ''}`}
      style={{ background: plan.bgColor }}
      onClick={onSelect}
    >
      {/* "Popular" badge */}
      {plan.isPopular && (
        <div style={{
          position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--navy)', color: '#fff', fontSize: 9, fontWeight: 700,
          padding: '2px 8px', borderRadius: 99, whiteSpace: 'nowrap',
        }}>
          Popular
        </div>
      )}
      {/* Selected / current checkmark */}
      {(isSelected || isCurrentPlan) && (
        <div style={{
          position: 'absolute', top: 8, right: 8, width: 18, height: 18,
          background: 'var(--teal)', borderRadius: '50%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: '#fff',
          fontSize: 10, fontWeight: 700,
        }}>
          ✓
        </div>
      )}
      <span style={{ fontSize: 20, display: 'block', marginBottom: 7 }}>{plan.emoji}</span>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--muted)' }}>
        {plan.id}
      </div>
      <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 22, fontWeight: 700, color: 'var(--navy)' }}>
        ${plan.priceMonthly}
      </div>
      <div style={{ fontSize: 10, color: 'var(--hint)' }}>/month</div>
    </div>
  );
}
