import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  CheckSquare,
  PlusCircle,
  BarChart2,
  LogOut,
  User,
  Sparkles,
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Brand Logo */}
        <Link to="/dashboard" className="nav-brand">
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>
          <span className="brand-title">TaskPulse</span>
          <span className="brand-badge">MERN</span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <CheckSquare size={18} />
            <span>Tasks</span>
          </NavLink>

          <NavLink
            to="/create-task"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <PlusCircle size={18} />
            <span>New Task</span>
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <BarChart2 size={18} />
            <span>Analytics</span>
          </NavLink>
        </nav>

        {/* User Profile & Logout */}
        <div className="nav-user">
          <div className="user-info">
            <div className="user-avatar">
              <User size={16} />
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name || 'User'}</span>
              <span className="user-role">{user?.role || 'Student'}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="btn-logout"
            title="Sign out of TaskPulse"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
