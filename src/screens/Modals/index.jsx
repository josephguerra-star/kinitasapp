/**
 * @file Modals/index.jsx
 * @description All 6 bottom-sheet modals for the Kinitas app, rendered from AppContext activeModal.
 *
 * AI USAGE: Each modal component receives `isOpen` and `onClose` from AppContext.
 * `activeModal` string from context maps to a MODAL_IDS constant.
 *
 * DEV USAGE: To add a new modal, add its ID to MODAL_IDS in routes.js,
 * create its component below, and register it in the ModalLayer switch-map.
 */
import { useAppContext } from '../../context/AppContext.jsx';
import { MODAL_IDS, SCREEN_IDS } from '../../constants/routes.js';
import { MEMBERSHIP_PLANS } from '../../constants/plans.js';
import Modal from '../../components/ui/Modal.jsx';
import Button from '../../components/ui/Button.jsx';

// ─── Sub-components ────────────────────────────────────────────────────────────

function SwitchPlanModal({ isOpen, onClose }) {
  const { navigateTo } = useAppContext();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Switch Plan" subtitle="Choose a plan below. Change takes effect at your next billing date.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {MEMBERSHIP_PLANS.map((plan) => (
          <div key={plan.id} style={{ background: plan.bgColor, borderRadius: 13, padding: '12px 10px', cursor: 'pointer', border: plan.id === 'PLUS' ? '2px solid var(--teal)' : '2px solid transparent' }}>
            <span style={{ fontSize: 18, display: 'block', marginBottom: 6 }}>{plan.emoji}</span>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>{plan.id}</div>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>${plan.priceMonthly}</div>
            <div style={{ fontSize: 9, color: 'var(--hint)' }}>/month</div>
          </div>
        ))}
      </div>
      <div className="modal-btns">
        <div className="mb btn-navy btn" style={{ gridColumn: '1/-1' }} onClick={() => { navigateTo(SCREEN_IDS.PLANS); onClose(); }}>Confirm Plan Change</div>
        <div className="mb btn-surface btn" onClick={onClose}>Cancel</div>
      </div>
    </Modal>
  );
}

function PausePlanModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pause Membership" subtitle="Your plan is paused — no washes or billing during the pause period. Loyalty data is preserved.">
      <div style={{ marginBottom: 12 }}>
        {[1, 2, 3].map((m) => (
          <div key={m} className={`radio-opt ${m === 1 ? 'sel' : ''}`} style={{ marginBottom: 8 }}>
            <div className="radio-dot" />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{m} {m === 1 ? 'Month' : 'Months'}</div>
              <div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 2 }}>Resumes on {m === 1 ? 'Mar' : m === 2 ? 'Apr' : 'May'} 14, 2025</div>
            </div>
          </div>
        ))}
      </div>
      <div className="modal-btns" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="mb btn-navy btn" onClick={onClose}>Pause Plan</div>
        <div className="mb btn-surface btn" onClick={onClose}>Never mind</div>
      </div>
    </Modal>
  );
}

function UpgradePlanModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upgrade to SUPER" subtitle="$4 more per month · Your upgrade is prorated for the current billing cycle.">
      <div style={{ background: 'var(--gold-bg)', border: '1px solid var(--gold-border)', borderRadius: 14, padding: 14, marginBottom: 12 }}>
        {[['Current plan', 'PLUS · $12.00/mo'], ['New plan', 'SUPER · $16.00/mo'], ['Proration today', '$2.16'], ['Next renewal', '$16.00 on Feb 14']].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
            <span style={{ color: '#7a4f00' }}>{k}</span><span style={{ fontWeight: 600, color: '#3d2700' }}>{v}</span>
          </div>
        ))}
      </div>
      <div className="modal-btns">
        <div className="mb btn-navy btn" style={{ gridColumn: '1/-1' }} onClick={onClose}>Upgrade Now · $2.16 today</div>
        <div className="mb btn-surface btn" onClick={onClose}>Keep PLUS</div>
      </div>
    </Modal>
  );
}

function EditProfileModal({ isOpen, onClose }) {
  const { currentUser } = useAppContext();
  const { firstName, lastName, phone } = currentUser;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" subtitle="Changes are saved immediately.">
      {[{ lbl: 'First Name', placeholder: firstName }, { lbl: 'Last Name', placeholder: lastName }, { lbl: 'Phone', placeholder: phone, type: 'tel' }].map(({ lbl, placeholder, type }) => (
        <div className="field" key={lbl}>
          <label>{lbl}</label>
          <input className="input" type={type || 'text'} placeholder={placeholder} defaultValue={placeholder} />
        </div>
      ))}
      <div className="modal-btns">
        <div className="mb btn-navy btn" onClick={onClose}>Save Changes</div>
        <div className="mb btn-surface btn" onClick={onClose}>Cancel</div>
      </div>
    </Modal>
  );
}

function AddPlateModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Fleet Plate" subtitle="Each plate is billed according to the fleet account's contract type.">
      <div className="field"><label>Driver Name</label><input className="input" placeholder="Full name" /></div>
      <div className="field"><label>License Plate</label><input className="input input-plate" placeholder="FLT 004" /></div>
      <div className="field">
        <label>State</label>
        <select className="input" style={{ cursor: 'pointer' }}>
          {['Florida', 'Georgia', 'Alabama'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="field">
        <label>Billing Type</label>
        <select className="input" style={{ cursor: 'pointer' }}>
          <option>Prepaid (weekly cap)</option>
          <option>Credit (per wash)</option>
        </select>
      </div>
      <div className="modal-btns">
        <div className="mb btn-navy btn" onClick={onClose}>Add Plate</div>
        <div className="mb btn-surface btn" onClick={onClose}>Cancel</div>
      </div>
    </Modal>
  );
}

function InviteFamilyModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Family Member" subtitle="They'll get a link to join your family plan at 20% off.">
      <div className="field"><label>Their Email</label><input className="input" type="email" placeholder="family@email.com" autoCapitalize="none" inputMode="email" /></div>
      <div className="field"><label>Invite Message (optional)</label>
        <input className="input" placeholder="e.g. Join my Kinitas family plan!" />
      </div>
      <div style={{ background: 'var(--teal-bg)', borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 9, marginBottom: 12 }}>
        <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>💰</span>
        <p style={{ fontSize: 12, color: '#004f58', lineHeight: 1.5 }}>They'll pay <strong>20% less</strong> ($9.60/mo) for PLUS while on your family plan. No extra charge for you.</p>
      </div>
      <div className="modal-btns">
        <div className="mb btn-navy btn" onClick={onClose}>Send Invite</div>
        <div className="mb btn-surface btn" onClick={onClose}>Cancel</div>
      </div>
    </Modal>
  );
}

// ─── Modal Layer (root renderer) ──────────────────────────────────────────────

/**
 * @component ModalLayer
 * @description Renders the currently active modal based on AppContext `activeModal`.
 * Place this inside the phone frame in App.jsx so modals overlay correctly.
 */
export default function ModalLayer() {
  const { activeModal, closeModal } = useAppContext();

  const modalMap = {
    [MODAL_IDS.SWITCH_PLAN]:   <SwitchPlanModal   isOpen={activeModal === MODAL_IDS.SWITCH_PLAN}   onClose={closeModal} />,
    [MODAL_IDS.PAUSE_PLAN]:    <PausePlanModal     isOpen={activeModal === MODAL_IDS.PAUSE_PLAN}    onClose={closeModal} />,
    [MODAL_IDS.UPGRADE_PLAN]:  <UpgradePlanModal   isOpen={activeModal === MODAL_IDS.UPGRADE_PLAN}  onClose={closeModal} />,
    [MODAL_IDS.EDIT_PROFILE]:  <EditProfileModal   isOpen={activeModal === MODAL_IDS.EDIT_PROFILE}  onClose={closeModal} />,
    [MODAL_IDS.ADD_PLATE]:     <AddPlateModal      isOpen={activeModal === MODAL_IDS.ADD_PLATE}     onClose={closeModal} />,
    [MODAL_IDS.INVITE_FAMILY]: <InviteFamilyModal  isOpen={activeModal === MODAL_IDS.INVITE_FAMILY} onClose={closeModal} />,
  };

  return (
    <>
      {Object.values(modalMap)}
    </>
  );
}
