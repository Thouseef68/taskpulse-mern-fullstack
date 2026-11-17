import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskFilters from '../components/TaskFilters';
import ConfirmModal from '../components/ConfirmModal';
import { Plus, ListFilter, Inbox, RefreshCw } from 'lucide-react';

const TaskList = () => {
  const {
    tasks,
    loading,
    fetchTasks,
    toggleTaskStatus,
    deleteTask,
  } = useTasks();

  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    category: 'All',
    search: '',
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    taskId: null,
    taskTitle: '',
  });

  // Fetch tasks when filters change
  const loadTasksWithFilters = useCallback(() => {
    fetchTasks(filters);
  }, [fetchTasks, filters]);

  useEffect(() => {
    loadTasksWithFilters();
  }, [loadTasksWithFilters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'All',
      priority: 'All',
      category: 'All',
      search: '',
    });
  };

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

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">All Tasks & Projects</h1>
          <p className="page-subtitle">
            Filter, search, organize, and manage your full CRUD task list
          </p>
        </div>
        <div className="header-actions">
          <button
            onClick={loadTasksWithFilters}
            className="btn-secondary"
            title="Reload from MongoDB"
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
            <span>Refresh</span>
          </button>
          <Link to="/create-task" className="btn-primary">
            <Plus size={18} />
            <span>New Task</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <TaskFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Task Count & Status Overview */}
      <div className="task-count-bar">
        <div className="count-info">
          <ListFilter size={16} />
          <span>
            Showing <strong>{tasks.length}</strong> {tasks.length === 1 ? 'task' : 'tasks'}
            {(filters.status !== 'All' || filters.priority !== 'All' || filters.category !== 'All' || filters.search) && ' (filtered)'}
          </span>
        </div>
      </div>

      {/* Tasks Grid or Empty State */}
      {loading && tasks.length === 0 ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Querying MongoDB database...</p>
        </div>
      ) : tasks.length > 0 ? (
        <div className="tasks-grid">
          {tasks.map((task) => (
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
            <Inbox size={48} />
          </div>
          <h3>No tasks match your criteria</h3>
          <p>Try adjusting your search terms or filters to find what you are looking for.</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button onClick={handleResetFilters} className="btn-secondary">
              Clear All Filters
            </button>
            <Link to="/create-task" className="btn-primary">
              <Plus size={16} />
              <span>Create New Task</span>
            </Link>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteModal.taskTitle}"? This will permanently remove the record from MongoDB.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' })}
      />
    </div>
  );
};

export default TaskList;

