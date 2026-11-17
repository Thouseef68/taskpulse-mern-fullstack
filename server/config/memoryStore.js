const bcrypt = require('bcryptjs');

// In-Memory storage containers
const users = [];
const tasks = [];

// Helper ID generator
const generateId = () => Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

// Seed initial default accounts
const seedInitialUsers = async () => {
  if (users.length === 0) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const studentId = 'usr_student_01';
    users.push({
      _id: studentId,
      name: 'Thouseef F',
      email: 'student@dsu.edu.in',
      password: hashedPassword,
      role: 'student',
      createdAt: new Date().toISOString(),
      matchPassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      },
    });

    users.push({
      _id: 'usr_faculty_01',
      name: 'Ms. Priyanka D Rukesh',
      email: 'faculty@dsu.edu.in',
      password: hashedPassword,
      role: 'faculty',
      createdAt: new Date().toISOString(),
      matchPassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      },
    });

    tasks.push(
      {
        _id: 'tsk_01',
        title: 'Complete BCA Sem V Full Stack Assignment II',
        description: 'Design and develop one complete MERN stack application with Node/Express REST API, MongoDB CRUD, JWT authentication, and React frontend.',
        status: 'Completed',
        priority: 'High',
        category: 'Assignment',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        user: studentId,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'tsk_02',
        title: 'Implement JWT Authentication & Protected Middleware',
        description: 'Setup bcrypt password hashing, sign tokens with expiration, and protect REST endpoints via Bearer token verification.',
        status: 'Completed',
        priority: 'High',
        category: 'Academic',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        user: studentId,
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'tsk_03',
        title: 'Build React Frontend with Context API & Router',
        description: 'Create functional components with hooks (useState, useEffect, useContext), React Router v6 navigation, and live CRUD state updates.',
        status: 'In Progress',
        priority: 'High',
        category: 'Project',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        user: studentId,
        createdAt: new Date(Date.now() - 10800000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'tsk_04',
        title: 'Prepare Viva & Faculty Q&A Explanation Guide',
        description: 'Document architecture diagrams, REST API endpoints, MongoDB collection schemas, and typical faculty viva questions for Ms. Priyanka D Rukesh.',
        status: 'In Progress',
        priority: 'Medium',
        category: 'Academic',
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        user: studentId,
        createdAt: new Date(Date.now() - 14400000).toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  }
};

seedInitialUsers();

// Memory User Model Interface
const MemoryUser = {
  findOne: async (query) => {
    let user = null;
    if (query.email) {
      user = users.find((u) => u.email.toLowerCase() === query.email.toLowerCase());
    } else if (query._id) {
      user = users.find((u) => u._id === query._id);
    }
    return user || null;
  },

  findById: (id) => {
    const user = users.find((u) => u._id === id?.toString());
    return {
      select: (fields) => {
        if (!user) return Promise.resolve(null);
        const copy = { ...user };
        if (fields.includes('-password')) {
          delete copy.password;
        }
        return Promise.resolve(copy);
      },
      then: (resolve) => resolve(user ? { ...user } : null),
    };
  },

  create: async ({ name, email, password, role }) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: 'usr_' + generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || 'student',
      createdAt: new Date().toISOString(),
      matchPassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      },
    };

    users.push(newUser);
    return newUser;
  },

  deleteMany: async () => {
    return { acknowledged: true, deletedCount: 0 };
  },
};

// Memory Task Model Interface
const MemoryTask = {
  find: (query = {}) => {
    let result = [...tasks];

    if (query.user) {
      result = result.filter((t) => t.user.toString() === query.user.toString());
    }
    if (query.status && query.status !== 'All') {
      result = result.filter((t) => t.status === query.status);
    }
    if (query.priority && query.priority !== 'All') {
      result = result.filter((t) => t.priority === query.priority);
    }
    if (query.category && query.category !== 'All') {
      result = result.filter((t) => t.category === query.category);
    }
    if (query.$or) {
      const regexes = query.$or.map((o) => {
        const field = Object.keys(o)[0];
        return { field, pattern: new RegExp(o[field].$regex, 'i') };
      });
      result = result.filter((t) =>
        regexes.some((r) => r.pattern.test(t[r.field] || ''))
      );
    }

    return {
      sort: (sortObj = {}) => {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return Promise.resolve(result);
      },
      then: (resolve) => resolve(result),
    };
  },

  findById: async (id) => {
    const taskIndex = tasks.findIndex((t) => t._id === id?.toString());
    if (taskIndex === -1) return null;

    const task = tasks[taskIndex];
    return {
      ...task,
      save: async function () {
        task.title = this.title;
        task.description = this.description;
        task.status = this.status;
        task.priority = this.priority;
        task.category = this.category;
        task.dueDate = this.dueDate;
        task.updatedAt = new Date().toISOString();
        return task;
      },
      deleteOne: async function () {
        tasks.splice(taskIndex, 1);
        return { acknowledged: true };
      },
    };
  },

  create: async ({ title, description, status, priority, category, dueDate, user }) => {
    const newTask = {
      _id: 'tsk_' + generateId(),
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'Pending',
      priority: priority || 'Medium',
      category: category || 'Academic',
      dueDate: dueDate || null,
      user: user.toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.unshift(newTask);
    return newTask;
  },

  countDocuments: async (query = {}) => {
    let result = [...tasks];
    if (query.user) {
      result = result.filter((t) => t.user.toString() === query.user.toString());
    }
    if (query.status) {
      result = result.filter((t) => t.status === query.status);
    }
    if (query.priority) {
      result = result.filter((t) => t.priority === query.priority);
    }
    return result.length;
  },

  insertMany: async (taskArr) => {
    tasks.push(...taskArr);
    return taskArr;
  },
};

module.exports = {
  MemoryUser,
  MemoryTask,
};
