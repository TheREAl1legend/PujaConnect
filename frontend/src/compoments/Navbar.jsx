import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useCallback } from "react";
import { logoutUser } from "../api/authApi";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/chat", label: "💬 Chat" },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.removeItem("user");
      navigate("/auth");
    }
  }, [navigate]);

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);

  const dashboardPath =
    user?.role === "pandit" ? "/pandit-dashboard" : "/user-dashboard";

  return (
    <>
      <style>{styles}</style>

      <nav className="navbar">
        <div className="navbar__inner">
          <Link to="/" className="navbar__brand" onClick={closeMenu}>
            🛕 PujaConnect
          </Link>

          <div className="navbar__links">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} active={location.pathname === to} onClick={closeMenu}>
                {label}
              </NavLink>
            ))}

            {!user ? (
              <NavLink to="/auth" active={location.pathname === "/auth"} onClick={closeMenu}>
                Login
              </NavLink>
            ) : (
              <>
                <NavLink to={dashboardPath} active={location.pathname === dashboardPath} onClick={closeMenu}>
                  Dashboard
                </NavLink>
                <button className="navbar__logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            className="navbar__hamburger"
            onClick={toggleMenu}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`hamburger-icon ${open ? "open" : ""}`} />
          </button>
        </div>

        <div className={`navbar__mobile ${open ? "navbar__mobile--open" : ""}`}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} active={location.pathname === to} onClick={closeMenu} mobile>
              {label}
            </NavLink>
          ))}

          {!user ? (
            <NavLink to="/auth" active={location.pathname === "/auth"} onClick={closeMenu} mobile>
              Login
            </NavLink>
          ) : (
            <>
              <NavLink to={dashboardPath} active={location.pathname === dashboardPath} onClick={closeMenu} mobile>
                Dashboard
              </NavLink>
              <button className="navbar__logout navbar__logout--mobile" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="navbar__spacer" />
    </>
  );
}

function NavLink({ to, children, active, onClick, mobile }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`navbar__link ${active ? "navbar__link--active" : ""} ${mobile ? "navbar__link--mobile" : ""}`}
    >
      {children}
    </Link>
  );
}

const styles = `
  :root {
    --nav-height: 60px;
    --nav-mobile-bg: #cf5200;
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: linear-gradient(90deg, #e65c00 0%, #f9a825 100%);
    border-bottom: 1px solid rgba(255, 200, 80, 0.35);
    box-shadow: 0 4px 20px rgba(230, 92, 0, 0.4);
  }

  .navbar__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--nav-height);
    padding: 0 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .navbar__brand {
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff;
    text-decoration: none;
    letter-spacing: 0.02em;
    white-space: nowrap;
    text-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }

  .navbar__links {
    display: none;
    align-items: center;
    gap: 4px;
  }

  .navbar__link {
    color: rgba(255, 255, 255, 0.88);
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.2s, background 0.2s;
  }

  .navbar__link:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.15);
  }

  .navbar__link--active {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.22);
    font-weight: 600;
  }

  .navbar__link--mobile {
    display: block;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 1rem;
  }

  .navbar__logout {
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }

  .navbar__logout:hover {
    background: rgba(255, 255, 255, 0.28);
    border-color: #ffffff;
  }

  .navbar__logout--mobile {
    display: block;
    width: 100%;
    margin-top: 4px;
    padding: 12px 16px;
    font-size: 1rem;
    border-radius: 8px;
    text-align: left;
  }

  .navbar__hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .navbar__hamburger:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .hamburger-icon,
  .hamburger-icon::before,
  .hamburger-icon::after {
    display: block;
    width: 22px;
    height: 2px;
    background: #ffffff;
    border-radius: 2px;
    transition: transform 0.25s, opacity 0.25s;
    position: relative;
  }

  .hamburger-icon::before,
  .hamburger-icon::after {
    content: "";
    position: absolute;
    left: 0;
  }

  .hamburger-icon::before { top: -7px; }
  .hamburger-icon::after  { top: 7px; }

  .hamburger-icon.open { background: transparent; }
  .hamburger-icon.open::before { transform: translateY(7px) rotate(45deg); }
  .hamburger-icon.open::after  { transform: translateY(-7px) rotate(-45deg); }

  .navbar__mobile {
    display: flex;
    flex-direction: column;
    background: var(--nav-mobile-bg);
    padding: 0 16px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
    border-top: 1px solid transparent;
  }

  .navbar__mobile--open {
    max-height: 400px;
    padding: 12px 16px;
    border-top-color: rgba(255, 255, 255, 0.2);
  }

  .navbar__spacer {
    height: var(--nav-height);
  }

  @media (min-width: 768px) {
    .navbar__links { display: flex; }
    .navbar__hamburger { display: none; }
    .navbar__mobile { display: none !important; }
  }
`;

export default Navbar;