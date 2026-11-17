import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const TaskFilters = ({ filters, onChange, onReset }) => {
  return (
    <div className="filters-container">
      {/* Search Input */}
      <div className="search-box">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search tasks by title or keywords..."
          value={filters.search || ''}
          onChange={(e) => onChange('search', e.target.value)}
          className="search-input"
        />
        {filters.search && (
          <button onClick={() => onChange('search', '')} className="search-clear">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Select Controls */}
      <div className="filters-dropdowns">
        {/* Status Filter */}
        <div className="filter-item">
          <label htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            value={filters.status || 'All'}
            onChange={(e) => onChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="filter-item">
          <label htmlFor="filter-priority">Priority</label>
          <select
            id="filter-priority"
            value={filters.priority || 'All'}
            onChange={(e) => onChange('priority', e.target.value)}
            className="filter-select"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="filter-item">
          <label htmlFor="filter-category">Category</label>
          <select
            id="filter-category"
            value={filters.category || 'All'}
            onChange={(e) => onChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="All">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Project">Project</option>
            <option value="Assignment">Assignment</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Reset Filters */}
        <div className="filter-item filter-reset">
          <button onClick={onReset} className="btn-secondary" title="Reset all filters">
            <Filter size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;

