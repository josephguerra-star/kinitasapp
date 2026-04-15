/**
 * @file PasswordInput.jsx
 * @description Password field with show/hide toggle eye button.
 *
 * AI USAGE: In React Native, use <TextInput secureTextEntry> toggled by state.
 *
 * DEV USAGE: Pass `label` and `id` as required. Optionally attach `onChange`.
 *
 * @param {string} label
 * @param {string} id - unique DOM id for the input element
 */
import { useState } from 'react';

export default function PasswordInput({ label, id, ...rest }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="field">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="pw-wrap">
        <input
          id={id}
          className="input"
          type={isVisible ? 'text' : 'password'}
          {...rest}
        />
        <button
          type="button"
          className="pw-eye"
          onClick={() => setIsVisible((v) => !v)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          {isVisible ? '🙈' : '👁'}
        </button>
      </div>
    </div>
  );
}
