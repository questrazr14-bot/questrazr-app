import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function ProfilePage() {
  const { profile, updateProfile } = useAuth();
  const [form, setForm] = useState(profile);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateProfile(form);
    setMessage("Profile updated successfully.");
  }

  return (
    <section className="dashboard-shell">
      <article className="page-card">
        <p className="page-kicker">Profile</p>
        <h1>Your profile</h1>
        <p className="page-lead">
          Update your details here. Changes are saved locally so the dashboard
          reflects them immediately after login.
        </p>

        <div className="profile-summary">
          <h2>{profile.fullName}</h2>
          <p>{profile.headline}</p>
          <p>{profile.email}</p>
          <p>{profile.location}</p>
        </div>
      </article>

      <form className="page-card profile-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Full name</span>
          <input
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
          />
        </label>

        <label className="form-field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>

        <label className="form-field">
          <span>Headline</span>
          <input
            name="headline"
            type="text"
            value={form.headline}
            onChange={handleChange}
          />
        </label>

        <label className="form-field">
          <span>Location</span>
          <input
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
          />
        </label>

        <label className="form-field">
          <span>Bio</span>
          <textarea
            name="bio"
            rows="5"
            value={form.bio}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="primary-button">
          Save changes
        </button>

        {message ? <p className="form-message">{message}</p> : null}
      </form>
    </section>
  );
}
