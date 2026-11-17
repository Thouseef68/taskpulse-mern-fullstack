import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Please fill in both email and password');
      return;
    }

    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setFormError(result.message || 'Login failed');
    }
  };

  // Preset demo credentials for quick faculty review
  const handleDemoFill = (type) => {
    if (type === 'student') {
      setEmail('student@dsu.edu.in');
      setPassword('password123');
    } else {
      setEmail('faculty@dsu.edu.in');
      setPassword('password123');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <Sparkles size={24} />
          </div>
          <h1 className="auth-title">Welcome to TaskPulse</h1>
          <p className="auth-subtitle">
            BCA Full Stack Development (24CA3511) • MERN Project
          </p>
        </div>

        {/* Alerts */}
        {formError && (
          <div className="alert alert-error">
            <span>{formError}</span>
          </div>
        )}

        {location.search.includes('expired=true') && (
          <div className="alert alert-warning">
            <span>Your session has expired. Please log in again.</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary btn-block"
            disabled={submitting}
          >
            <LogIn size={18} />
            <span>{submitting ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Demo Credentials Quick-Fill for Faculty / Ma'am */}
        <div className="demo-credentials-box">
          <div className="demo-header">
            <CheckCircle2 size={15} />
            <span>Quick Test Credentials (For Viva / Demo):</span>
          </div>
          <div className="demo-buttons">
            <button
              type="button"
              onClick={() => handleDemoFill('student')}
              className="btn-demo"
            >
              Fill Student Account
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('faculty')}
              className="btn-demo"
            >
              Fill Faculty Account
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="auth-footer">
          <p>
            Don't have an account yet?{' '}
            <Link to="/register" className="auth-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

