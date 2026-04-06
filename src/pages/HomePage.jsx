import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="page-card hero-card">
      <p className="page-kicker">Home</p>
      <h1>Build your learning platform one step at a time.</h1>
      <p className="page-lead">
        QuestRazr is now set up with a clean homepage and supporting pages so
        you can start implementing features incrementally from a simple base.
      </p>
      <div className="feature-grid">
        <article className="feature-tile">
          <h2>Clear structure</h2>
          <p>Start with navigation and static pages before layering in product logic.</p>
        </article>
        <article className="feature-tile">
          <h2>Easy to extend</h2>
          <p>Add components, forms, and APIs page by page without refactoring the shell.</p>
        </article>
        <article className="feature-tile">
          <h2>Ready for iteration</h2>
          <p>Each page can evolve independently as we add real functionality together.</p>
        </article>
      </div>
      <div className="hero-actions">
        <Link to="/signup" className="primary-button">
          Get started
        </Link>
        <Link to="/signin" className="secondary-button">
          I already have an account
        </Link>
      </div>
    </section>
  );
}
