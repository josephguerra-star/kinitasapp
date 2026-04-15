/**
 * @file Fleet/index.jsx
 * @description Fleet account management screen with Manager and Member views.
 *
 * AI USAGE: `activeView` toggles between 'manager' and 'member' perspectives.
 * Fleet plates are rendered with credit/prepaid billing types and usage progress bars.
 *
 * DEV USAGE: Replace static fleet plates with API data from fleet account endpoint.
 * Warning thresholds (e.g., near wash limit) should come from backend config.
 */
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { SCREEN_IDS, MODAL_IDS } from '../../constants/routes.js';
import Chip from '../../components/ui/Chip.jsx';
import Button from '../../components/ui/Button.jsx';
import ProgressBar from '../../components/ui/ProgressBar.jsx';

const FLEET_PLATES = [
  { plate: 'FLT 001', driver: 'John Martinez',  site: 'Jacksonville', type: 'credit',  usedWashes: 4,  limitWashes: null, balance: 44, perWash: 11, invoiceDate: 'Feb 28', isNearLimit: false },
  { plate: 'FLT 002', driver: 'Sarah Chen',     site: 'Tampa',        type: 'prepaid', usedWashes: 8,  limitWashes: 20, weeklyFixed: 160, resetDay: 'Sunday', isNearLimit: false },
  { plate: 'FLT 003', driver: 'Mike Torres',    site: 'Orlando',      type: 'prepaid', usedWashes: 19, limitWashes: 20, weeklyFixed: 160, resetDay: 'Sunday', isNearLimit: true },
];

export default function FleetScreen() {
  const { openModal } = useAppContext();
  const [activeView, setActiveView] = useState('manager'); // 'manager' | 'member'

  return (
    <div className="screen active">
      {/* ── View Toggle ── */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '10px 16px', flexShrink: 0, display: 'flex', gap: 6 }}>
        {[{ key: 'manager', label: '🏢 Manager View' }, { key: 'member', label: '👤 Member View' }].map((v) => (
          <div key={v.key} style={{ flex: 1, height: 32, borderRadius: 8, background: activeView === v.key ? 'var(--navy)' : 'var(--surf3)', color: activeView === v.key ? '#fff' : 'var(--hint)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            onClick={() => setActiveView(v.key)}>{v.label}</div>
        ))}
      </div>

      <div className="scroll">

        {/* ─── MANAGER VIEW ─── */}
        {activeView === 'manager' && (
          <div>
            <div className="hero-dark">
              <div className="hero-ring ring-lg" /><div className="hero-ring ring-sm" />
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.7px', color: 'rgba(255,255,255,.4)', marginBottom: 3, position: 'relative', zIndex: 1 }}>Fleet Account · Manager</div>
              <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 3, position: 'relative', zIndex: 1 }}>Rivera Logistics LLC</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: 14, position: 'relative', zIndex: 1 }}>Account #FL-00482 · Reset cadence: Weekly (Sun)</div>
              <div className="hero-stats">
                {[{ value: FLEET_PLATES.length, label: 'Plates' }, { value: '$44', label: 'Credit bal.' }, { value: 'Sun', label: 'Next reset' }].map((s) => (
                  <div className="hero-stat" key={s.label}><div className="hero-stat-val">{s.value}</div><div className="hero-stat-lbl">{s.label}</div></div>
                ))}
              </div>
            </div>
            <div style={{ margin: '0 14px', marginTop: -16, position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '18px 0 12px' }}>
                <div style={{ display: 'flex', gap: 6, flex: 1, overflowX: 'auto' }}>
                  {['All (3)', 'Credit (1)', 'Prepaid (2)'].map((tab, i) => (
                    <div key={tab} style={{ padding: '6px 14px', borderRadius: 99, background: i === 0 ? 'var(--navy)' : 'var(--surf2)', color: i === 0 ? '#fff' : 'var(--muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer', border: i > 0 ? '1.5px solid var(--border)' : 'none', whiteSpace: 'nowrap' }}>{tab}</div>
                  ))}
                </div>
                <div style={{ height: 36, padding: '0 14px', borderRadius: 10, background: 'var(--navy)', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }} onClick={() => openModal(MODAL_IDS.ADD_PLATE)}>+ Add</div>
              </div>

              {FLEET_PLATES.map((fp) => (
                <div key={fp.plate} className="card" style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                      <div className="plate" style={{ fontSize: 15, padding: '7px 12px' }}>{fp.plate}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginTop: 6 }}>{fp.driver}</div>
                      <div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 1 }}>{fp.site} · {fp.type === 'credit' ? 'Credit' : 'Prepaid'}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                      <Chip variant={fp.type === 'credit' ? 'teal' : 'gold'}>● {fp.type === 'credit' ? 'Credit' : 'Prepaid'}</Chip>
                      <div style={{ background: 'var(--danger-bg)', color: 'var(--danger)', fontSize: 11, fontWeight: 700, borderRadius: 7, padding: '4px 10px', cursor: 'pointer' }}>Remove</div>
                    </div>
                  </div>

                  {fp.type === 'credit' ? (
                    <div style={{ background: 'var(--surf2)', borderRadius: 11, padding: 12 }}>
                      <div style={{ fontSize: 11, color: 'var(--hint)', marginBottom: 4 }}>Balance this week</div>
                      <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 24, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>${fp.balance}.00</div>
                      <div style={{ height: 1, background: 'var(--border)', marginBottom: 8 }} />
                      {[['Per wash', `$${fp.perWash}.00`], ['Washes this week', `${fp.usedWashes} washes`], ['Invoice date', fp.invoiceDate]].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                          <span style={{ color: 'var(--hint)' }}>{k}</span><span style={{ fontWeight: 600, color: 'var(--text)' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ background: fp.isNearLimit ? 'var(--danger-bg)' : 'var(--surf2)', borderRadius: 11, padding: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div>
                          <span style={{ fontFamily: "'Noto Serif', serif", fontSize: 22, fontWeight: 700, color: fp.isNearLimit ? 'var(--danger)' : 'var(--navy)' }}>{fp.usedWashes}</span>
                          <span style={{ fontSize: 12, color: fp.isNearLimit ? '#93000a' : 'var(--hint)', marginLeft: 3 }}>/ {fp.limitWashes} washes</span>
                          <div style={{ fontSize: 11, color: fp.isNearLimit ? '#93000a' : 'var(--hint)', marginTop: 2 }}>{fp.isNearLimit ? '⚠️ 1 wash remaining' : 'Used this week'}</div>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: fp.isNearLimit ? 'var(--danger)' : 'var(--teal)' }}>Resets {fp.resetDay}</span>
                      </div>
                      <ProgressBar percentage={Math.round((fp.usedWashes / fp.limitWashes) * 100)} color={fp.isNearLimit ? 'var(--danger)' : 'var(--teal)'} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: fp.isNearLimit ? '#93000a' : 'var(--hint)', marginTop: 6 }}>
                        <span>{fp.isNearLimit ? 'Almost at weekly limit' : `${fp.limitWashes - fp.usedWashes} remaining`}</span>
                        <span>${fp.weeklyFixed}.00 / week fixed</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Invoice */}
              <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Current Invoice</div>
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>January 2025</span>
                  <Chip variant="teal">● Open</Chip>
                </div>
                {[['FLT 001 — Credit (4 washes)', '$44.00'], ['FLT 002 — Prepaid (20/wk)', '$160.00'], ['FLT 003 — Prepaid (20/wk)', '$160.00']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                    <span style={{ color: 'var(--muted)' }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, marginTop: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>Total due Feb 28</span>
                  <span style={{ fontFamily: "'Noto Serif', serif", fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>$364.00</span>
                </div>
                <div style={{ marginTop: 12, background: 'var(--surf2)', borderRadius: 11, padding: 11, textAlign: 'center', fontSize: 13, fontWeight: 700, color: 'var(--navy)', cursor: 'pointer', border: '1px solid var(--border)' }}>Download Invoice PDF</div>
              </div>
            </div>
            <div style={{ height: 20 }} />
          </div>
        )}

        {/* ─── MEMBER VIEW ─── */}
        {activeView === 'member' && (
          <div>
            <div className="hero-dark">
              <div className="hero-ring ring-lg" />
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.7px', color: 'rgba(255,255,255,.4)', marginBottom: 3, position: 'relative', zIndex: 1 }}>Fleet Account · Member</div>
              <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: '#fff', position: 'relative', zIndex: 1 }}>Rivera Logistics LLC</div>
            </div>
            <div style={{ margin: '0 14px', marginTop: -16, position: 'relative', zIndex: 2 }}>
              <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, marginTop: 18 }}>Your Plate</div>
              <div className="card" style={{ textAlign: 'center', padding: 20 }}>
                <div className="plate" style={{ fontSize: 20, padding: '10px 18px', display: 'inline-block', marginBottom: 12, letterSpacing: 4 }}>FLT 002</div>
                <div className="chip chip-gold" style={{ display: 'inline-flex', margin: '0 auto 14px' }}>● Prepaid · Tampa</div>
                <div style={{ background: 'var(--surf2)', borderRadius: 11, padding: 12, marginBottom: 12, textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <span style={{ fontFamily: "'Noto Serif', serif", fontSize: 22, fontWeight: 700, color: 'var(--navy)' }}>8</span>
                      <span style={{ fontSize: 12, color: 'var(--hint)', marginLeft: 3 }}>/ 20 washes</span>
                      <div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 2 }}>Used this week</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--teal)' }}>Resets Sunday</span>
                  </div>
                  <ProgressBar percentage={40} color="var(--teal)" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--hint)', marginTop: 6 }}>
                    <span>12 remaining</span><span>$160.00 / week</span>
                  </div>
                </div>
                <div style={{ background: 'var(--surf2)', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 9, textAlign: 'left' }}>
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>🔒</span>
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>Plate management is handled by your fleet account manager. Contact them to make changes.</p>
                </div>
              </div>
            </div>
            <div style={{ height: 20 }} />
          </div>
        )}
      </div>
    </div>
  );
}
