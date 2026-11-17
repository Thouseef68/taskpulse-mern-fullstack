const Task = require('../models/Task');

// @desc    Get all tasks for the logged in user with search & filtering
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status, priority, category, search, sortBy, sortOrder } = req.query;

    const query = { user: req.user._id };

    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    // Priority filter
    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Search keyword in title or description
    if (search && search.trim() !== '') {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    // Sorting
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else {
      sort.createdAt = -1; // Default newest first
    }

    const tasks = await Task.find(query).sort(sort);

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error('Fetch Tasks Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching tasks',
    });
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Ensure the task belongs to the authenticated user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to view this task',
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error('Get Task By ID Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error retrieving task',
    });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, category, dueDate } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task title is required',
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'Pending',
      priority: priority || 'Medium',
      category: category || 'Academic',
      dueDate: dueDate || null,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.error('Create Task Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error creating task',
    });
  }
};

// @desc    Update an existing task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Ensure the task belongs to the authenticated user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to update this task',
      });
    }

    const { title, description, status, priority, category, dueDate } = req.body;

    task.title = title !== undefined ? title.trim() : task.title;
    task.description = description !== undefined ? description.trim() : task.description;
    task.status = status !== undefined ? status : task.status;
    task.priority = priority !== undefined ? priority : task.priority;
    task.category = category !== undefined ? category : task.category;
    task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;

    const updatedTask = await task.save();

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    console.error('Update Task Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error updating task',
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Ensure the task belongs to the authenticated user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to delete this task',
      });
    }

    await task.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      id: req.params.id,
    });
  } catch (error) {
    console.error('Delete Task Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting task',
    });
  }
};

// @desc    Get dashboard statistics for user
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const total = await Task.countDocuments({ user: userId });
    const pending = await Task.countDocuments({ user: userId, status: 'Pending' });
    const inProgress = await Task.countDocuments({ user: userId, status: 'In Progress' });
    const completed = await Task.countDocuments({ user: userId, status: 'Completed' });

    const highPriority = await Task.countDocuments({ user: userId, priority: 'High' });
    const mediumPriority = await Task.countDocuments({ user: userId, priority: 'Medium' });
    const lowPriority = await Task.countDocuments({ user: userId, priority: 'Low' });

    return res.status(200).json({
      success: true,
      stats: {
        total,
        pending,
        inProgress,
        completed,
        completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
        priorities: {
          high: highPriority,
          medium: mediumPriority,
          low: lowPriority,
        },
      },
    });
  } catch (error) {
    console.error('Task Stats Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching statistics',
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
};
