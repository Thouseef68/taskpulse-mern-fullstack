import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import {
  Save,
  ArrowLeft,
  Calendar,
  Tag,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

const TaskForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { createTask, updateTask, getTaskById } = useTasks();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    category: 'Academic',
    dueDate: '',
  });

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // If editing, load task details
  useEffect(() => {
    if (isEditing) {
      const loadTask = async () => {
        try {
          const task = await getTaskById(id);
          if (task) {
            setFormData({
              title: task.title || '',
              description: task.description || '',
              status: task.status || 'Pending',
              priority: task.priority || 'Medium',
              category: task.category || 'Academic',
              dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
            });
          }
        } catch (err) {
          setError('Failed to load task details. It may not exist.');
        } finally {
          setLoading(false);
        }
      };

      loadTask();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Please provide a task title');
      return;
    }

    setSubmitting(true);

    let result;
    if (isEditing) {
      result = await updateTask(id, formData);
    } else {
      result = await createTask(formData);
    }

    setSubmitting(false);

    if (result.success) {
      navigate('/tasks');
    } else {
      setError(result.message || 'Operation failed');
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '1rem', color: '#64748b' }}>Loading task details...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-page-header">
        <Link to="/tasks" className="btn-back">
          <ArrowLeft size={16} />
          <span>Back to Tasks</span>
        </Link>
      </div>

      <div className="form-card">
        <div className="form-header">
          <div className="form-header-icon">
            <Sparkles size={22} />
          </div>
          <div>
            <h1 className="form-title">
              {isEditing ? 'Edit Task / Project' : 'Create New Task'}
            </h1>
            <p className="form-subtitle">
              {isEditing
                ? 'Update task details and sync immediately with MongoDB'
                : 'Fill in details to log a new task in your MERN database'}
            </p>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="task-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">
              Task Title <span className="required-star">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Complete BCA Sem V Full Stack Assignment II"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={120}
              className="text-input"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description & Notes</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Add key notes, steps, requirements, or documentation links..."
              value={formData.description}
              onChange={handleChange}
              maxLength={1000}
              className="textarea-input"
            />
          </div>

          {/* Grid row: Status, Priority, Category */}
          <div className="form-grid-3">
            <div className="form-group">
              <label htmlFor="status">
                <Clock size={14} />
                <span>Status</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select-input"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">
                <AlertCircle size={14} />
                <span>Priority</span>
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="select-input"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">
                <Tag size={14} />
                <span>Category</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select-input"
              >
                <option value="Academic">Academic</option>
                <option value="Assignment">Assignment</option>
                <option value="Project">Project</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div className="form-group">
            <label htmlFor="dueDate">
              <Calendar size={14} />
              <span>Target Due Date</span>
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="text-input"
            />
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="btn-secondary"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              <Save size={16} />
              <span>
                {submitting
                  ? 'Saving to MongoDB...'
                  : isEditing
                  ? 'Update Task'
                  : 'Save Task'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

