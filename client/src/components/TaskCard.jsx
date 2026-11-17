import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit3,
  Trash2,
  Tag,
} from 'lucide-react';

const TaskCard = ({ task, onToggleStatus, onDelete }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'badge-priority-high';
      case 'Medium':
        return 'badge-priority-medium';
      case 'Low':
        return 'badge-priority-low';
      default:
        return 'badge-priority-medium';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-status-completed';
      case 'In Progress':
        return 'badge-status-progress';
      case 'Pending':
        return 'badge-status-pending';
      default:
        return 'badge-status-pending';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`task-card ${task.status === 'Completed' ? 'is-completed' : ''}`}>
      <div className="task-card-top">
        <div className="task-badges">
          <span className={`badge ${getStatusClass(task.status)}`}>
            {task.status === 'Completed' && <CheckCircle2 size={12} />}
            {task.status === 'In Progress' && <Clock size={12} />}
            {task.status === 'Pending' && <AlertCircle size={12} />}
            <span>{task.status}</span>
          </span>

          <span className={`badge ${getPriorityClass(task.priority)}`}>
            {task.priority} Priority
          </span>

          {task.category && (
            <span className="badge badge-category">
              <Tag size={12} />
              <span>{task.category}</span>
            </span>
          )}
        </div>

        <div className="task-actions">
          <Link
            to={`/edit-task/${task._id}`}
            className="btn-icon"
            title="Edit Task"
          >
            <Edit3 size={15} />
          </Link>
          <button
            onClick={() => onDelete(task._id, task.title)}
            className="btn-icon btn-icon-danger"
            title="Delete Task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <h3 className="task-title">{task.title}</h3>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-card-bottom">
        <div className="task-meta">
          {task.dueDate && (
            <span className="task-duedate">
              <Calendar size={13} />
              <span>Due: {formatDate(task.dueDate)}</span>
            </span>
          )}
        </div>

        <button
          onClick={() => onToggleStatus(task._id, task.status)}
          className="btn-toggle-status"
          title="Advance Task Status"
        >
          {task.status === 'Completed'
            ? ' Reopen'
            : task.status === 'In Progress'
            ? ' Mark Completed'
            : '▶ Start Task'}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
