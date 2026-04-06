import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function SignUpPage() {
  const navigate = useNavigate();
  const { isGoogleAuthAvailable, signIn, signInWithGoogle } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    agree: true,
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
      fullName: form.fullName || "New learner",
      email: form.email || "new.user@questrazr.app",
    });
    setMessage(`Account created for ${form.fullName || "new learner"}. Redirecting...`);
    navigate("/dashboard");
  }

  async function handleGoogleSignUp() {
    if (!isGoogleAuthAvailable) {
      setMessage("Add Firebase env values first to enable Google sign-up.");
      return;
    }

    try {
      setIsGoogleLoading(true);
      setMessage("");
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message || "Google sign-up failed.");
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <section className="auth-shell">
      <div className="auth-info">
        <p className="page-kicker">Sign Up</p>
        <h1>Create your account.</h1>
        <p className="page-lead">
          This page is ready for onboarding flows, learner profiles, and real
          registration logic once you decide the backend path.
        </p>
        <ul className="auth-points">
          <li>Collects basic registration details</li>
          <li>Supports future onboarding steps</li>
          <li>Can connect to auth providers later</li>
        </ul>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <button
          type="button"
          className="oauth-button"
          onClick={handleGoogleSignUp}
          disabled={isGoogleLoading}
        >
          <span className="oauth-button__icon" aria-hidden="true">
            G
          </span>
          {isGoogleLoading ? "Connecting..." : "Sign up with Google"}
        </button>

        <div className="auth-divider">
          <span>or create an account with email</span>
        </div>

        <label className="form-field">
          <span>Full name</span>
          <input
            name="fullName"
            type="text"
            placeholder="Your full name"
            value={form.fullName}
            onChange={handleChange}
          />
        </label>

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
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
          />
        </label>

        <label className="checkbox-row">
          <input
            name="agree"
            type="checkbox"
            checked={form.agree}
            onChange={handleChange}
          />
          <span>I agree to the terms and privacy policy</span>
        </label>

        <button type="submit" className="primary-button">
          Create account
        </button>

        {message ? <p className="form-message">{message}</p> : null}

        <p className="auth-switch">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </section>
  );
}
