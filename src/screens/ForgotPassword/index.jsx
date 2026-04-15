/**
 * @file ForgotPassword/index.jsx
 * @description 4-step password reset flow: email entry → sent confirmation → new password form → success.
 *
 * AI USAGE: Manages `currentSubScreen` state ('email'|'sent'|'reset'|'success').
 * Password strength is scored 0-4 using regex checks.
 *
 * DEV USAGE: Replace `handleSendLink` with an API call to your password reset endpoint.
 * Replace `handleConfirmReset` with the token-based reset API call.
 */
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { SCREEN_IDS } from '../../constants/routes.js';
import { PASSWORD_STRENGTH_COLORS, PASSWORD_STRENGTH_LABELS } from '../../constants/plans.js';
import Button from '../../components/ui/Button.jsx';
import PasswordInput from '../../components/ui/PasswordInput.jsx';

/** Compute password strength score 0-4 */
const computePasswordStrength = (value) => {
  let score = 0;
  if (value.length >= 8)          score++;
  if (/[A-Z]/.test(value))        score++;
  if (/[0-9]/.test(value))        score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
};

export default function ForgotPasswordScreen() {
  const { navigateTo } = useAppContext();
  const [subScreen, setSubScreen] = useState('email');  // 'email' | 'sent' | 'reset' | 'success'
  const [email, setEmail]         = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [strengthScore, setStrengthScore] = useState(0);
  const [resendLabel, setResendLabel] = useState("Didn't get it? Resend email");

  const handleSendLink = () => {
    if (!email.trim()) return;
    setSubScreen('sent');
  };

  const handleConfirmReset = () => {
    if (!newPassword || newPassword !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    setSubScreen('success');
  };

  const handlePasswordChange = (val) => {
    setNewPassword(val);
    setStrengthScore(computePasswordStrength(val));
  };

  const handleResend = () => {
    setResendLabel('✓ Resent!');
    setTimeout(() => setResendLabel("Didn't get it? Resend email"), 3000);
  };

  const KinitasLogo = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8, position: 'relative', zIndex: 1 }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="17" height="17" viewBox="0 0 28 28" fill="none">
          <path d="M4 20C4 20 8 10 14 10C20 10 24 20 24 20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="8" cy="22" r="2.5" fill="white"/>
          <circle cx="20" cy="22" r="2.5" fill="white"/>
        </svg>
      </div>
      <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 16, fontWeight: 700, color: '#fff' }}>Kinitas</div>
    </div>
  );

  return (
    <div className="screen active" style={{ background: 'var(--navy)' }}>

      {/* ── Header area ── */}
      <div style={{ background: 'var(--navy)', padding: '16px 20px 40px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div className="hero-ring ring-lg" />
        <div style={{ cursor: 'pointer', marginBottom: 16, position: 'relative', zIndex: 1 }} onClick={() => navigateTo(SCREEN_IDS.LOGIN)}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16 }}>←</div>
        </div>
        {KinitasLogo}
      </div>

      {/* ─── SUB-SCREEN: Email Entry ─── */}
      {subScreen === 'email' && (
        <div className="card-pull">
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Forgot password?</div>
          <div style={{ fontSize: 13, color: 'var(--hint)', marginBottom: 18 }}>Enter your email and we'll send a reset link. Expires in 30 minutes.</div>
          <div className="field">
            <label>Email address</label>
            <input className="input" type="email" placeholder="you@email.com" autoCapitalize="none" inputMode="email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button variant="navy" onClick={handleSendLink}>Send Reset Link</Button>
          <Button variant="ghost" onClick={() => navigateTo(SCREEN_IDS.LOGIN)}>Back to Sign In</Button>
        </div>
      )}

      {/* ─── SUB-SCREEN: Email Sent ─── */}
      {subScreen === 'sent' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 28px', background: 'var(--navy)', position: 'relative' }}>
          <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(255,255,255,.05)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(255,255,255,.05)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <div className="anim-pop" style={{ width: 72, height: 72, borderRadius: 22, background: 'rgba(0,201,167,.15)', border: '1px solid rgba(0,201,167,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 20px', position: 'relative', zIndex: 1 }}>✉️</div>
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 10, position: 'relative', zIndex: 1 }}>Check your inbox</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', marginBottom: 6, position: 'relative', zIndex: 1 }}>We've sent a reset link to</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 700, color: 'var(--aqua)', marginBottom: 32, position: 'relative', zIndex: 1 }}>{email}</div>
          <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
            <Button variant="aqua" onClick={() => setSubScreen('reset')}>Open reset link →</Button>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', cursor: 'pointer', marginTop: 8 }} onClick={handleResend}>{resendLabel}</div>
          </div>
        </div>
      )}

      {/* ─── SUB-SCREEN: Reset Password Form ─── */}
      {subScreen === 'reset' && (
        <div className="card-pull">
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Create new password</div>
          <div style={{ fontSize: 13, color: 'var(--hint)', marginBottom: 16 }}>Choose a strong password for your account.</div>
          <div className="field">
            <label>New Password</label>
            <div className="pw-wrap">
              <input className="input" type="password" placeholder="New password"
                value={newPassword} onChange={(e) => handlePasswordChange(e.target.value)} />
            </div>
            {/* Strength bars */}
            <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i <= strengthScore ? PASSWORD_STRENGTH_COLORS[strengthScore - 1] : 'var(--surf3)' }} />
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, marginTop: 5, color: strengthScore === 0 ? 'var(--hint)' : PASSWORD_STRENGTH_COLORS[strengthScore - 1] }}>
              {newPassword.length === 0 ? PASSWORD_STRENGTH_LABELS[0] : PASSWORD_STRENGTH_LABELS[strengthScore] || 'Very strong'}
            </div>
          </div>
          <PasswordInput id="fp-pw2" label="Confirm Password" placeholder="Confirm password"
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button variant="navy" onClick={handleConfirmReset}>Reset Password</Button>
        </div>
      )}

      {/* ─── SUB-SCREEN: Success ─── */}
      {subScreen === 'success' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 28px', background: 'var(--white)' }}>
          <div className="anim-pop" style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--teal-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 18px' }}>✓</div>
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 24, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Password updated!</div>
          <div style={{ fontSize: 13, color: 'var(--hint)', lineHeight: 1.6, marginBottom: 32 }}>Your password has been reset. Sign in with your new password.</div>
          <Button variant="navy" style={{ width: '100%' }} onClick={() => navigateTo(SCREEN_IDS.LOGIN)}>Sign In →</Button>
        </div>
      )}
    </div>
  );
}
