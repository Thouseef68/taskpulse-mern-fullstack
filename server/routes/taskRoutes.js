const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// All task routes require JWT authentication
router.use(protect);

// Task CRUD and stats routes
router.route('/').get(getTasks).post(createTask);
router.route('/stats').get(getTaskStats);
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;
