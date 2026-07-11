import { useState } from "react";
import "./AuthPages.css";

export default function SignupPage({ onNavigateToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    // Frontend only — send this to your API. The account should stay
    // in a "pending" state server-side until an admin approves it.
    console.log("Signup request:", { fullName, email, password });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="auth-screen">
        <div className="auth-box">
          <div className="pending-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#e7cfa1" strokeWidth="1.6" />
              <path d="M12 7v5l3.2 2" stroke="#e7cfa1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <header className="auth-header centered">
            <h1>Request submitted</h1>
            <p>
              Thanks, {fullName || "there"}. Your account is pending approval.
              We'll email you at <strong>{email}</strong> once it's reviewed.
            </p>
          </header>

          <button
            type="button"
            className="primary-btn"
            onClick={onNavigateToLogin}
          >
            Back to log in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-screen">
      <div className="auth-box">
        <header className="auth-header">
          <h1>Create an account</h1>
          <p>Submit your details — an admin will review and approve.</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">Full name</span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="ghost-icon-btn"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </label>

          <label className="field">
            <span className="field-label">Confirm password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="primary-btn">
            Submit for approval
          </button>
        </form>

        <footer className="auth-footer">
          <span>Already have an account? </span>
          <button className="link link-btn" onClick={onNavigateToLogin}>
            Log in
          </button>
        </footer>
      </div>
    </div>
  );
}