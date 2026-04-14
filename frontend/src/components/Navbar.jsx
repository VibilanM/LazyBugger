import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar" id="main-navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-brand-icon">🔥</span>
        LazyBugger
      </Link>

      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
          id="nav-home"
        >
          <span className="navbar-link-icon">🏠</span>
          <span>Home</span>
        </NavLink>

        {isAuthenticated ? (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              id="nav-profile"
            >
              <span className="navbar-link-icon">👤</span>
              <span>My Challenges</span>
            </NavLink>
            <button onClick={handleLogout} className="navbar-btn-logout" id="nav-logout">
              <span className="navbar-link-icon">🚪</span>
              <span>Logout</span>
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            id="nav-login"
          >
            <span className="navbar-link-icon">🔑</span>
            <span>Login</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
