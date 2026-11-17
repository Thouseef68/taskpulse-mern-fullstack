import React, { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import {
  BarChart3,
  PieChart,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Award,
} from 'lucide-react';

const Analytics = () => {
  const { stats, fetchStats } = useTasks();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const { total, completed, inProgress, pending, completionRate, priorities } = stats;

  const getPercent = (count) => {
    if (!total || total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics & Insights</h1>
          <p className="page-subtitle">
            Visual metrics calculated in real-time from MongoDB aggregation
          </p>
        </div>
      </div>

      {/* Top Banner KPI */}
      <div className="analytics-banner">
        <div className="analytics-banner-content">
          <div className="analytics-badge">
            <Award size={16} />
            <span>Productivity Score</span>
          </div>
          <h2 className="analytics-score">{completionRate}%</h2>
          <p className="analytics-desc">
            You have completed <strong>{completed}</strong> out of <strong>{total}</strong> tasks created.
          </p>
        </div>
        <div className="analytics-circular-progress">
          <div className="circle-wrap">
            <div className="circle-inner">
              <TrendingUp size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdowns */}
      <div className="analytics-grid">
        {/* Status Distribution */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div className="analytics-card-icon">
              <PieChart size={20} />
            </div>
            <div>
              <h3 className="analytics-card-title">Status Breakdown</h3>
              <p className="analytics-card-sub">Distribution by completion stage</p>
            </div>
          </div>

          <div className="metric-bars">
            {/* Completed */}
            <div className="metric-row">
              <div className="metric-info">
                <span className="metric-name flex-center gap-1">
                  <CheckCircle2 size={14} className="text-green" /> Completed
                </span>
                <span className="metric-count">{completed} ({getPercent(completed)}%)</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill bar-green"
                  style={{ width: `${getPercent(completed)}%` }}
                ></div>
              </div>
            </div>

            {/* In Progress */}
            <div className="metric-row">
              <div className="metric-info">
                <span className="metric-name flex-center gap-1">
                  <Clock size={14} className="text-yellow" /> In Progress
                </span>
                <span className="metric-count">{inProgress} ({getPercent(inProgress)}%)</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill bar-yellow"
                  style={{ width: `${getPercent(inProgress)}%` }}
                ></div>
              </div>
            </div>

            {/* Pending */}
            <div className="metric-row">
              <div className="metric-info">
                <span className="metric-name flex-center gap-1">
                  <AlertCircle size={14} className="text-purple" /> Pending
                </span>
                <span className="metric-count">{pending} ({getPercent(pending)}%)</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill bar-purple"
                  style={{ width: `${getPercent(pending)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div className="analytics-card-icon">
              <BarChart3 size={20} />
            </div>
            <div>
              <h3 className="analytics-card-title">Priority Breakdown</h3>
              <p className="analytics-card-sub">Urgency distribution of your tasks</p>
            </div>
          </div>

          <div className="metric-bars">
            {/* High */}
            <div className="metric-row">
              <div className="metric-info">
                <span className="metric-name flex-center gap-1">
                  <span className="dot dot-high"></span> High Priority
                </span>
                <span className="metric-count">
                  {priorities?.high || 0} ({getPercent(priorities?.high || 0)}%)
                </span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill bar-red"
                  style={{ width: `${getPercent(priorities?.high || 0)}%` }}
                ></div>
              </div>
            </div>

            {/* Medium */}
            <div className="metric-row">
              <div className="metric-info">
                <span className="metric-name flex-center gap-1">
                  <span className="dot dot-medium"></span> Medium Priority
                </span>
                <span className="metric-count">
                  {priorities?.medium || 0} ({getPercent(priorities?.medium || 0)}%)
                </span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill bar-yellow"
                  style={{ width: `${getPercent(priorities?.medium || 0)}%` }}
                ></div>
              </div>
            </div>

            {/* Low */}
            <div className="metric-row">
              <div className="metric-info">
                <span className="metric-name flex-center gap-1">
                  <span className="dot dot-low"></span> Low Priority
                </span>
                <span className="metric-count">
                  {priorities?.low || 0} ({getPercent(priorities?.low || 0)}%)
                </span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill bar-blue"
                  style={{ width: `${getPercent(priorities?.low || 0)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

