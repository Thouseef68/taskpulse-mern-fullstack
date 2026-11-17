const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Task = require('./models/Task');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing demo records...');
    await User.deleteMany({ email: { $in: ['student@dsu.edu.in', 'faculty@dsu.edu.in'] } });

    console.log('Creating demo users...');
    const studentUser = await User.create({
      name: 'Thouseef F',
      email: 'student@dsu.edu.in',
      password: 'password123',
      role: 'student',
    });

    const facultyUser = await User.create({
      name: 'Ms. Priyanka D Rukesh',
      email: 'faculty@dsu.edu.in',
      password: 'password123',
      role: 'faculty',
    });

    console.log('Seeding initial tasks for demo student...');
    await Task.deleteMany({ user: studentUser._id });

    const sampleTasks = [
      {
        title: 'Complete BCA Sem V Full Stack Assignment II',
        description: 'Design and develop one complete MERN stack application with Node/Express REST API, MongoDB CRUD, JWT authentication, and React frontend.',
        status: 'Completed',
        priority: 'High',
        category: 'Assignment',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        user: studentUser._id,
      },
      {
        title: 'Implement JWT Authentication & Protected Middleware',
        description: 'Setup bcrypt password hashing in Mongoose pre-save hook, generate signed JWTs with expiration, and protect REST endpoints via Bearer token verification.',
        status: 'Completed',
        priority: 'High',
        category: 'Academic',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        user: studentUser._id,
      },
      {
        title: 'Build React Frontend with Context API & Router',
        description: 'Create functional components with hooks (useState, useEffect, useContext), React Router v6 navigation, and live CRUD state updates.',
        status: 'Completed',
        priority: 'High',
        category: 'Project',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        user: studentUser._id,
      },
      {
        title: 'Prepare Viva & Faculty Q&A Explanation Guide',
        description: 'Document architecture diagrams, REST API endpoints, MongoDB collection schemas, and typical faculty viva questions for Ms. Priyanka D Rukesh.',
        status: 'In Progress',
        priority: 'Medium',
        category: 'Academic',
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        user: studentUser._id,
      },
      {
        title: 'Deploy to Vercel & Push to GitHub Repository',
        description: 'Configure vercel.json serverless rewrites, create public GitHub repository, and verify production deployment URL.',
        status: 'In Progress',
        priority: 'High',
        category: 'Project',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        user: studentUser._id,
      },
      {
        title: 'Review Mongoose Indexing and Aggregation Pipeline',
        description: 'Study compound indexes on user and status fields to explain query performance optimization during evaluation.',
        status: 'Pending',
        priority: 'Low',
        category: 'Academic',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        user: studentUser._id,
      },
    ];

    await Task.insertMany(sampleTasks);

    console.log('✅ Demo database seeded successfully!');
    console.log('Student account: student@dsu.edu.in / password123');
    console.log('Faculty account: faculty@dsu.edu.in / password123');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
