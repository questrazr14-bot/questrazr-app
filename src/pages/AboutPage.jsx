export function AboutPage() {
  return (
    <section className="page-card">
      <p className="page-kicker">About</p>
      <h1>About QuestRazr</h1>
      <p className="page-lead">
        This project is being built as a modern React application with a clean
        foundation, simple routing, and room to grow into a richer platform.
      </p>
      <div className="content-stack">
        <p>
          The current version focuses on establishing a stable front-end
          structure. From here, we can add sections like authentication,
          dashboards, roadmaps, courses, internships, and more in a controlled way.
        </p>
        <p>
          Keeping the base lightweight now makes it easier to make good product
          decisions as the application grows.
        </p>
      </div>
    </section>
  );
}
