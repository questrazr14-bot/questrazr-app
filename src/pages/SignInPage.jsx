import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function SignInPage() {
  const navigate = useNavigate();
  const { isGoogleAuthAvailable, signIn, signInWithGoogle } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [message, setMessage] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    signIn({
      email: form.email || "demo@questrazr.app",
    });
    setMessage(`Signed in as ${form.email || "demo@questrazr.app"}. Redirecting...`);
    navigate("/dashboard");
  }

  async function handleGoogleSignIn() {
    if (!isGoogleAuthAvailable) {
      setMessage("Add Firebase env values first to enable Google sign-in.");
      return;
    }

    try {
      setIsGoogleLoading(true);
      setMessage("");
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message || "Google sign-in failed.");
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <section className="auth-shell">
      <div className="auth-info">
        <p className="page-kicker">Sign In</p>
        <h1>Welcome back.</h1>
        <p className="page-lead">
          Use this screen as the starting point for email/password login, social
          auth, or backend session handling later.
        </p>
        <ul className="auth-points">
          <li>Simple React form state</li>
          <li>Ready for API integration</li>
          <li>Easy to connect to validation next</li>
        </ul>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <button
          type="button"
          className="oauth-button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
        >
          <span className="oauth-button__icon" aria-hidden="true">
            G
          </span>
          {isGoogleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        <div className="auth-divider">
          <span>or sign in with email</span>
        </div>

        <label className="form-field">
          <span>Email address</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </label>

        <label className="form-field">
          <span>Password</span>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
        </label>

        <label className="checkbox-row">
          <input
            name="remember"
            type="checkbox"
            checked={form.remember}
            onChange={handleChange}
          />
          <span>Keep me signed in</span>
        </label>

        <button type="submit" className="primary-button">
          Sign in
        </button>

        {message ? <p className="form-message">{message}</p> : null}

        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </section>
  );
}
