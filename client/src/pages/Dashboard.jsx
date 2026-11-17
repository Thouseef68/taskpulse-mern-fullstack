import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import StatsCard from '../components/StatsCard';
import TaskCard from '../components/TaskCard';
import ConfirmModal from '../components/ConfirmModal';
import {
  ListTodo,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  ArrowRight,
  TrendingUp,
  FolderOpen,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const {
    tasks,
    stats,
    loading,
    fetchTasks,
    fetchStats,
    toggleTaskStatus,
    deleteTask,
  } = useTasks();

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    taskId: null,
    taskTitle: '',
  });

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  const handleDeleteClick = (id, title) => {
    setDeleteModal({
      isOpen: true,
      taskId: id,
      taskTitle: title,
    });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.taskId) {
      await deleteTask(deleteModal.taskId);
      setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' });
    }
  };

  const recentTasks = tasks.slice(0, 6);

  return (
    <div className="page-container">
      {/* Welcome & Info Banner */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <div className="hero-tag">
            <span>Dayananda Sagar University • BCA Sem V</span>
          </div>
          <h1 className="hero-title">
            Hello, {user?.name || 'Student'}! 👋
          </h1>
          <p className="hero-desc">
            Welcome to your MERN Stack TaskPulse Dashboard. Manage your academic assignments, projects, and personal workflows with live CRUD and JWT security.
          </p>
        </div>
        <div className="hero-actions">
          <Link to="/create-task" className="btn-primary">
            <Plus size={18} />
            <span>Create New Task</span>
          </Link>
          <Link to="/tasks" className="btn-secondary">
            <span>View All Tasks</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Analytics / Stats Metrics */}
      <section className="stats-grid">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          icon={ListTodo}
          color="blue"
          subtitle="All tasks logged"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          color="green"
          subtitle={`${stats.completionRate}% completion rate`}
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock}
          color="yellow"
          subtitle="Actively working"
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          icon={AlertTriangle}
          color="purple"
          subtitle="Awaiting action"
        />
      </section>

      {/* Completion Progress Bar */}
      <section className="progress-section">
        <div className="progress-header">
          <div className="progress-label">
            <TrendingUp size={16} />
            <span>Overall Task Completion</span>
          </div>
          <span className="progress-percent">{stats.completionRate}%</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${stats.completionRate}%` }}
          ></div>
        </div>
      </section>

      {/* Recent Tasks List */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <h2 className="section-title">Recent Tasks</h2>
            <p className="section-subtitle">
              Quick access to your latest created items
            </p>
          </div>
          {tasks.length > 0 && (
            <Link to="/tasks" className="link-all">
              <span>See all ({tasks.length})</span>
              <ArrowRight size={15} />
            </Link>
          )}
        </div>

        {loading && tasks.length === 0 ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your tasks from MongoDB...</p>
          </div>
        ) : recentTasks.length > 0 ? (
          <div className="tasks-grid">
            {recentTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggleStatus={toggleTaskStatus}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FolderOpen size={44} />
            </div>
            <h3>No tasks created yet</h3>
            <p>
              Get started by adding your first assignment, project milestone, or task.
            </p>
            <Link to="/create-task" className="btn-primary" style={{ marginTop: '1rem' }}>
              <Plus size={16} />
              <span>Add Your First Task</span>
            </Link>
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteModal.taskTitle}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' })}
      />
    </div>
  );
};

export default Dashboard;

