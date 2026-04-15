/**
 * @file Family/index.jsx
 * @description Family plan management screen with Primary and Secondary member views.
 *
 * AI USAGE: `activeView` toggles between 'primary' (plan manager) and 'secondary' (family member) UIs.
 * Family discount (20%) is hardcoded for demo. Should be fetched from the API in production.
 *
 * DEV USAGE: Replace static member list with API data. Invite link copy uses setTimeout label reset.
 */
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { MODAL_IDS } from '../../constants/routes.js';
import Chip from '../../components/ui/Chip.jsx';
import Button from '../../components/ui/Button.jsx';

const FAMILY_MEMBERS = [
  { initials: 'MR', bg: 'var(--navy)', fg: '#fff', name: 'Marcus Rivera', email: 'marcus@email.com', plan: 'PLUS', price: '$9.60/mo', plate: 'ABC 1234', status: 'primary' },
  { initials: 'SR', bg: 'var(--teal-bg)', fg: '#004f58', name: 'Sofia Rivera',  email: 'sofia@email.com',  plan: 'PLUS', price: '$9.60/mo', plate: 'XYZ 5678', status: 'member' },
  { initials: 'CR', bg: 'var(--surf3)',   fg: 'var(--hint)', name: 'Carlos Rivera', email: 'carlos@email.com', plan: null, price: null, plate: null, status: 'pending' },
];

export default function FamilyScreen() {
  const { openModal } = useAppContext();
  const [activeView, setActiveView] = useState('primary');
  const [copyLabel, setCopyLabel]   = useState('Copy');

  const handleCopyLink = () => {
    setCopyLabel('✓ Copied!');
    setTimeout(() => setCopyLabel('Copy'), 2500);
  };

  return (
    <div className="screen active">
      {/* ── View Toggle ── */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '10px 16px', flexShrink: 0, display: 'flex', gap: 6 }}>
        {[{ key: 'primary', label: '👑 Primary Member' }, { key: 'secondary', label: '👤 Family Member' }].map((v) => (
          <div key={v.key} style={{ flex: 1, height: 32, borderRadius: 8, background: activeView === v.key ? 'var(--navy)' : 'var(--surf3)', color: activeView === v.key ? '#fff' : 'var(--hint)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            onClick={() => setActiveView(v.key)}>{v.label}</div>
        ))}
      </div>

      <div className="scroll">

        {/* ─── PRIMARY VIEW ─── */}
        {activeView === 'primary' && (
          <div>
            <div className="hero-dark">
              <div className="hero-ring ring-lg" /><div className="hero-ring ring-sm" />
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.7px', color: 'rgba(255,255,255,.4)', marginBottom: 3, position: 'relative', zIndex: 1 }}>Family Plan · Primary Account</div>
              <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 14, position: 'relative', zIndex: 1 }}>Rivera Family</div>
              <div className="hero-stats">
                {[{ value: FAMILY_MEMBERS.length, label: 'Members' }, { value: '20%', label: 'Discount' }, { value: '$28.80', label: 'Combined' }].map((s) => (
                  <div className="hero-stat" key={s.label}><div className="hero-stat-val">{s.value}</div><div className="hero-stat-lbl">{s.label}</div></div>
                ))}
              </div>
            </div>

            <div style={{ margin: '0 14px', marginTop: -16, position: 'relative', zIndex: 2 }}>
              {/* Discount banner */}
              <div style={{ marginTop: 18, background: 'var(--navy2)', border: '1px solid rgba(0,201,167,.2)', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
                <div className="hero-ring" style={{ width: 140, height: 140, top: -50, right: -30 }} />
                <div style={{ width: 44, height: 44, borderRadius: 13, background: 'rgba(0,201,167,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, position: 'relative', zIndex: 1 }}>💰</div>
                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>Family discount active</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>20% off for all members while plan is active</div>
                </div>
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 22, fontWeight: 700, color: 'var(--aqua)' }}>$7.20</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)' }}>saved/mo</div>
                </div>
              </div>

              {/* Members list */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)' }}>Members ({FAMILY_MEMBERS.length})</div>
                <div style={{ height: 36, padding: '0 14px', borderRadius: 10, background: 'var(--navy)', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => openModal(MODAL_IDS.INVITE_FAMILY)}>+ Invite</div>
              </div>

              {FAMILY_MEMBERS.map((member) => (
                <div key={member.email} className="card" style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: member.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Noto Serif', serif", fontSize: 15, fontWeight: 700, color: member.fg, flexShrink: 0 }}>{member.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{member.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 1 }}>{member.email}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                      {member.status === 'primary' && <Chip variant="teal">👑 Primary</Chip>}
                      {member.status === 'member'  && <><Chip variant="grey">Member</Chip><div style={{ background: 'var(--danger-bg)', color: 'var(--danger)', fontSize: 11, fontWeight: 700, borderRadius: 7, padding: '4px 10px', cursor: 'pointer' }}>Remove</div></>}
                      {member.status === 'pending' && <><Chip variant="gold">⏳ Pending</Chip><div style={{ background: 'var(--danger-bg)', color: 'var(--danger)', fontSize: 11, fontWeight: 700, borderRadius: 7, padding: '4px 10px', cursor: 'pointer' }}>Cancel</div></>}
                    </div>
                  </div>
                  <div style={{ background: 'var(--surf2)', borderRadius: 11, padding: '10px 12px' }}>
                    {member.status === 'pending'
                      ? <><div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)' }}>Invite sent · Expires in 6 days</div><div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 2 }}>Not yet set up</div></>
                      : [['Plan', `${member.plan} · ${member.price}`], ['Plate', member.plate]].map(([k, v]) => (
                          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: k === 'Plan' ? 5 : 0 }}>
                            <span style={{ color: 'var(--hint)' }}>{k}</span>
                            {k === 'Plate' ? <span className="plate" style={{ fontSize: 11, padding: '3px 8px', letterSpacing: 2 }}>{v}</span> : <span style={{ fontWeight: 600, color: 'var(--text)' }}>{v}</span>}
                          </div>
                        ))
                    }
                  </div>
                </div>
              ))}

              {/* Combined billing */}
              <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Combined Billing</div>
              <div className="card">
                {[['Marcus — PLUS', '$9.60/mo'], ['Sofia — PLUS', '$9.60/mo'], ['Family discount (20%)', '−$3.84']].map(([k, v], i) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <span style={{ color: i === 2 ? 'var(--hint)' : 'var(--muted)', fontSize: i === 2 ? 11 : 13 }}>{k}</span>
                    <span style={{ fontWeight: 600, color: i === 2 ? 'var(--teal)' : 'var(--text)' }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, marginTop: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>Next billing · Feb 14</span>
                  <span style={{ fontFamily: "'Noto Serif', serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>$15.36</span>
                </div>
              </div>

              {/* Invite link */}
              <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 8 }}>Invite Link</div>
              <div className="card" style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 13, color: 'var(--hint)', marginBottom: 12, lineHeight: 1.5 }}>Share this link with family members to join at the 20% discounted rate.</p>
                <div style={{ background: 'var(--surf2)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 600, color: 'var(--navy)', flex: 1, marginRight: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>kinitas.app/join/RIVERA2025</span>
                  <div style={{ background: 'var(--teal-bg)', color: 'var(--teal)', fontSize: 12, fontWeight: 700, borderRadius: 8, padding: '6px 12px', cursor: 'pointer', flexShrink: 0 }} onClick={handleCopyLink}>{copyLabel}</div>
                </div>
                <Button variant="navy" size="sm" style={{ width: '100%', height: 44 }}>Share Invite Link →</Button>
              </div>
            </div>
          </div>
        )}

        {/* ─── SECONDARY VIEW ─── */}
        {activeView === 'secondary' && (
          <div>
            <div className="hero-dark">
              <div className="hero-ring ring-lg" />
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.7px', color: 'rgba(255,255,255,.4)', marginBottom: 3, position: 'relative', zIndex: 1 }}>Family Plan · Member</div>
              <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 14, position: 'relative', zIndex: 1 }}>Rivera Family</div>
              <div className="hero-stats">
                {[{ value: 'PLUS', label: 'Your Plan' }, { value: '20%', label: 'Discount' }, { value: '$9.60', label: 'Your Rate' }].map((s) => (
                  <div className="hero-stat" key={s.label}><div className="hero-stat-val">{s.value}</div><div className="hero-stat-lbl">{s.label}</div></div>
                ))}
              </div>
            </div>
            <div style={{ margin: '0 14px', marginTop: -16, position: 'relative', zIndex: 2 }}>
              <div className="card" style={{ textAlign: 'center', padding: 20, marginTop: 18, marginBottom: 12 }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--teal-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: '#004f58', margin: '0 auto 12px' }}>SR</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>Sofia Rivera</div>
                <div style={{ fontSize: 12, color: 'var(--hint)', marginTop: 2 }}>Member of Rivera Family plan</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--teal-bg)', borderRadius: 99, padding: '4px 12px', marginTop: 8 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--teal)' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)' }}>PLUS · $9.60/mo · Jacksonville</span>
                </div>
              </div>
              <div style={{ background: 'var(--surf2)', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 9, marginBottom: 12 }}>
                <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>🔒</span>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>Billing is managed by <strong style={{ color: 'var(--navy)' }}>Marcus Rivera</strong>. Contact them to change plan or billing details.</p>
              </div>
              <div className="card" style={{ marginBottom: 12, padding: 0, overflow: 'hidden' }}>
                {[['Plan', 'PLUS'], ['Monthly rate', '$9.60 (20% off)'], ['Next renewal', 'Feb 14, 2025'], ['Primary member', 'Marcus Rivera']].map((row, i, arr) => (
                  <div key={row[0]} className="list-row" style={{ padding: '11px 16px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ fontSize: 13, color: 'var(--hint)', flex: 1 }}>{row[0]}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{row[1]}</span>
                  </div>
                ))}
              </div>
              <Button variant="danger">Leave Family Plan</Button>
              <div style={{ fontSize: 12, color: 'var(--hint)', textAlign: 'center', marginTop: 8, lineHeight: 1.5, marginBottom: 20 }}>Leaving will convert you to a standard PLUS membership at $12/mo on your next billing date.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
