import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-icon">
          <AlertTriangle size={48} />
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-desc">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/dashboard" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
          <Home size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

