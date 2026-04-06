import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const dashboardStats = [
  { label: "Completed modules", value: "12" },
  { label: "Profile strength", value: "86%" },
  { label: "Upcoming tasks", value: "5" },
];

const dashboardTasks = [
  "Finish profile details and add your current headline.",
  "Review your onboarding checklist for this week.",
  "Prepare your next feature milestone in the product plan.",
];

export function DashboardPage() {
  const { profile } = useAuth();

  return (
    <section className="dashboard-shell">
      <article className="page-card">
        <p className="page-kicker">Dashboard</p>
        <h1>Hello, {profile.fullName}.</h1>
        <p className="page-lead">
          This private dashboard is only available after login and gives you a
          simple foundation for activity, metrics, and next steps.
        </p>

        <div className="stats-grid">
          {dashboardStats.map((item) => (
            <article key={item.label} className="stat-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </article>

      <article className="page-card">
        <div className="section-row">
          <div>
            <p className="page-kicker">Overview</p>
            <h2>Your next actions</h2>
          </div>
          <Link to="/profile" className="secondary-button">
            Update profile
          </Link>
        </div>

        <div className="content-stack">
          {dashboardTasks.map((task) => (
            <article key={task} className="dashboard-item">
              <p>{task}</p>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}
