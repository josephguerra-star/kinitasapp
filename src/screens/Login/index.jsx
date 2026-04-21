/**
 * @file Login/index.jsx
 * @description Login screen with email/password validation against the real API.
 *
 * AI USAGE: Entry point for unauthenticated users. Calls `handleLogin` from
 * AppContext which hits POST /carwash/auth/login. On success the context
 * persists the JWT and navigates to Dashboard automatically.
 *
 * DEV USAGE: Error messages from the API are shown via the `errorMessage` state.
 * Loading state disables the button and shows a spinner label.
 */
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { SCREEN_IDS } from '../../constants/routes.js';
import Alert from '../../components/ui/Alert.jsx';
import PasswordInput from '../../components/ui/PasswordInput.jsx';
import Button from '../../components/ui/Button.jsx';

export default function LoginScreen() {
  const { navigateTo, handleLogin, isLoading } = useAppContext();
  const [email, setEmail]            = useState('');
  const [password, setPassword]      = useState('');
  const [errorMessage, setError]     = useState('');

  /**
   * Validate fields locally, then delegate to the context's handleLogin.
   * The context handles token persistence and dashboard navigation on success.
   */
  const onSubmit = async () => {
    // ── Client-side validation ──────────────────────────────────────────────
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');

    // ── API call ────────────────────────────────────────────────────────────
    const result = await handleLogin({ email: email.trim(), password });

    if (!result.ok) {
      setError(result.errorMessage);
    }
    // On success, handleLogin navigates to Dashboard automatically
  };

  return (
    <div className="screen active" style={{ background: 'var(--navy)' }}>

      {/* ── Header ── */}
      <div style={{ background: 'var(--navy)', padding: '20px 24px 44px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div className="hero-ring ring-lg" /><div className="hero-ring ring-sm" />
        {/* Brand logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 28, position: 'relative', zIndex: 1 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <path d="M4 20C4 20 8 10 14 10C20 10 24 20 24 20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="8" cy="22" r="2.5" fill="white"/>
              <circle cx="20" cy="22" r="2.5" fill="white"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 20, fontWeight: 700, color: '#fff' }}>Kinitas</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', marginTop: 2 }}>Car Wash Membership</div>
          </div>
        </div>
        {/* Welcome text */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Noto Serif', serif", fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 6 }}>Welcome back.</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.42)' }}>Sign in to manage your membership</div>
        </div>
      </div>

      {/* ── Form Card Pull-up ── */}
      <div className="card-pull">
        {errorMessage && <Alert variant="error">{errorMessage}</Alert>}

        {/* Email field */}
        <div className="field">
          <label>Email address</label>
          <input
            id="login-email"
            className="input"
            type="email"
            placeholder="you@email.com"
            autoCapitalize="none"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Password field */}
        <PasswordInput
          id="login-pw"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        {/* Forgot password link */}
        <div style={{ textAlign: 'right', margin: '-8px 0 16px' }}>
          <span
            style={{ fontSize: 13, fontWeight: 600, color: '#305ea0', cursor: 'pointer' }}
            onClick={() => navigateTo(SCREEN_IDS.FORGOT_PASSWORD)}
          >
            Forgot password?
          </span>
        </div>

        <Button
          id="login-submit"
          variant="navy"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in…' : 'Sign In'}
        </Button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0' }}>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--hint)' }}>new to Kinitas?</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <Button variant="surface" onClick={() => navigateTo(SCREEN_IDS.REGISTER)}>Create an account</Button>
      </div>

      {/* ── Location footer ── */}
      <div style={{ background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 12, borderTop: '1px solid var(--border)' }}>
        {['Jacksonville', 'Tampa', 'Orlando'].map((city, i, arr) => (
          <span key={city} style={{ display: 'contents' }}>
            <span style={{ fontSize: 11, color: 'var(--hint)', fontWeight: 600 }}>{city}</span>
            {i < arr.length - 1 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border)' }} />}
          </span>
        ))}
      </div>
    </div>
  );
}
