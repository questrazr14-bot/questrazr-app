import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { DashboardPage } from "./pages/DashboardPage";
import { FaqsPage } from "./pages/FaqsPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { useAuth } from "./context/AuthContext";

const publicNavItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
];

const privateNavItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/profile", label: "Profile" },
];

function SiteLayout({ children }) {
  const { isAuthenticated, signOut } = useAuth();
  const navItems = isAuthenticated
    ? [...publicNavItems, ...privateNavItems]
    : publicNavItems;

  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink to="/" className="site-brand">
          QuestRazr
        </NavLink>

        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `site-nav__link${isActive ? " site-nav__link--active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-actions">
          {isAuthenticated ? (
            <button
              type="button"
              className="site-action-button site-action-button--plain"
              onClick={signOut}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/signin" className="site-action-link">
                Sign in
              </NavLink>
              <NavLink to="/signup" className="site-action-button">
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </header>

      <main className="page-shell">{children}</main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}
