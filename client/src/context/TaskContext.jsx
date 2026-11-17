import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    completionRate: 0,
    priorities: { high: 0, medium: 0, low: 0 },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks with optional search/filter params
  const fetchTasks = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.status && filters.status !== 'All') params.append('status', filters.status);
      if (filters.priority && filters.priority !== 'All') params.append('priority', filters.priority);
      if (filters.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);

      const res = await api.get(`/tasks?${params.toString()}`);
      if (res.data.success) {
        setTasks(res.data.tasks);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch task summary statistics for Dashboard & Analytics
  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get('/tasks/stats');
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, []);

  // Fetch single task by ID
  const getTaskById = async (id) => {
    try {
      const res = await api.get(`/tasks/${id}`);
      return res.data.task;
    } catch (err) {
      console.error('Error fetching single task:', err);
      throw err;
    }
  };

  // Create new task
  const createTask = async (taskData) => {
    setLoading(true);
    try {
      const res = await api.post('/tasks', taskData);
      if (res.data.success) {
        setTasks((prev) => [res.data.task, ...prev]);
        fetchStats();
        return { success: true, task: res.data.task };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create task';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Update existing task
  const updateTask = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await api.put(`/tasks/${id}`, updatedData);
      if (res.data.success) {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? res.data.task : t))
        );
        fetchStats();
        return { success: true, task: res.data.task };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update task';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const res = await api.delete(`/tasks/${id}`);
      if (res.data.success) {
        setTasks((prev) => prev.filter((t) => t._id !== id));
        fetchStats();
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete task';
      return { success: false, message };
    }
  };

  // Quick toggle status (e.g., Pending -> In Progress -> Completed)
  const toggleTaskStatus = async (id, currentStatus) => {
    let nextStatus = 'In Progress';
    if (currentStatus === 'Pending') nextStatus = 'In Progress';
    else if (currentStatus === 'In Progress') nextStatus = 'Completed';
    else if (currentStatus === 'Completed') nextStatus = 'Pending';

    return await updateTask(id, { status: nextStatus });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loading,
        error,
        fetchTasks,
        fetchStats,
        getTaskById,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
