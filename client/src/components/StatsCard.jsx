import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color, subtitle }) => {
  return (
    <div className={`stats-card card-${color}`}>
      <div className="stats-card-header">
        <span className="stats-title">{title}</span>
        <div className={`stats-icon icon-${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="stats-value">{value}</div>
      {subtitle && <div className="stats-subtitle">{subtitle}</div>}
    </div>
  );
};

export default StatsCard;

