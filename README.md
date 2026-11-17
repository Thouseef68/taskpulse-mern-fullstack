# TaskPulse • Full Stack MERN Application

> **Dayananda Sagar University (DSU) — School of Computer Applications**  
> **Course:** Full Stack Development (`24CA3511`) — BCA Semester V  
> **Faculty In-Charge:** Ms. Priyanka D Rukesh  
> **Author:** Thouseef F  

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Deployed on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

---

## 📌 Project Overview

**TaskPulse** is a production-ready, full-stack Task and Project Management platform developed to meet all requirements of BCA Semester V Assignment II.

The application allows students, faculty, and professionals to organize tasks, track assignment deadlines, filter by urgency/status, monitor productivity metrics, and manage projects in a secure, authenticated workspace.

---

## 🚀 Key Features & Assignment Fulfillment

1. **MongoDB Database & Mongoose ODM**:
   - `User` collection with unique email validation and bcrypt password hashing.
   - `Task` collection with compound indexing (`{ user: 1, status: 1 }`), status, priority, category, due dates, and timestamps.
2. **Node.js & Express RESTful API**:
   - Clean MVC architecture (Models, Controllers, Routes, Middleware).
   - Full **CRUD** endpoints (`POST /api/tasks`, `GET /api/tasks`, `GET /api/tasks/:id`, `PUT /api/tasks/:id`, `DELETE /api/tasks/:id`).
   - Summary aggregation endpoint (`GET /api/tasks/stats`) computing total, completion rate, status and priority counts.
3. **JWT Authentication & Security Middleware**:
   - Stateless JWT generation with 7-day expiration.
   - Express `protect` middleware verifying `Authorization: Bearer <token>` headers.
   - User data isolation (users cannot access, modify, or delete another user's tasks).
4. **React Front-end with Functional Components & Hooks**:
   - 100% Functional Components utilizing `useState`, `useEffect`, `useContext`, `useCallback`, `useNavigate`, `useLocation`.
   - Modern Vite toolchain for sub-second hot reloading.
5. **State Management with Context API**:
   - `AuthContext`: Centralized authentication, session persistence, automatic re-authentication.
   - `TaskContext`: Live task state, automatic re-fetching on CRUD operations, status toggling.
6. **Navigation with React Router v6**:
   - Protected client-side routing via `<ProtectedRoute>` wrapper.
   - Public login and registration routes with automatic redirection for authenticated users.
7. **Responsive & Modern UI**:
   - Responsive design with custom CSS design tokens.
   - Filter by status, priority, category, and real-time search queries.
   - Confirmation modals for safe deletion.
   - One-click demo credentials filling for viva demonstration.

---

## 📂 Project Structure

```text
Full_Stack_Application/
├── client/                     # React Frontend
│   ├── index.html              # HTML entry with metadata
│   ├── package.json            # React dependencies
│   ├── vite.config.js          # Vite config with /api proxy
│   └── src/
│       ├── api/
│       │   └── axios.js        # Axios instance + JWT interceptors
│       ├── context/
│       │   ├── AuthContext.jsx # Global auth state
│       │   └── TaskContext.jsx # Global task state & CRUD logic
│       ├── components/
│       │   ├── ConfirmModal.jsx# Delete confirmation modal
│       │   ├── Navbar.jsx      # Navigation bar with user profile
│       │   ├── ProtectedRoute.jsx # React Router route guard
│       │   ├── StatsCard.jsx   # Metrics KPI card
│       │   ├── TaskCard.jsx    # Task item with status toggle
│       │   └── TaskFilters.jsx # Search & dropdown filters
│       ├── pages/
│       │   ├── Analytics.jsx   # Graphical productivity statistics
│       │   ├── Dashboard.jsx   # Overview hero, stats, recent tasks
│       │   ├── Login.jsx       # Login form with 1-click demo buttons
│       │   ├── NotFound.jsx    # 404 handler
│       │   ├── Register.jsx    # User signup
│       │   ├── TaskForm.jsx    # Create / Edit task form
│       │   └── TaskList.jsx    # Full CRUD task manager
│       ├── App.jsx             # Router layout & route definitions
│       ├── main.jsx            # React root mount
│       └── index.css           # Modern custom styling
├── server/                     # Node.js Express Backend
│   ├── package.json            # Server dependencies
│   ├── server.js               # Express application entry
│   ├── seeder.js               # Sample data generator
│   ├── config/
│   │   └── db.js               # MongoDB connection handler
│   ├── controllers/
│   │   ├── authController.js   # Register, Login, Me handlers
│   │   └── taskController.js   # Full CRUD and Stats handlers
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification middleware
│   │   └── errorMiddleware.js  # Centralized error handler
│   ├── models/
│   │   ├── Task.js             # Mongoose Task schema
│   │   └── User.js             # Mongoose User schema + bcrypt
│   └── routes/
│       ├── authRoutes.js       # Auth endpoint routes
│       └── taskRoutes.js       # Task CRUD endpoint routes
├── api/
│   └── index.js                # Vercel Serverless Function entry
├── vercel.json                 # Vercel deployment configuration
├── .env.example                # Environment variable reference
├── README.md                   # Project documentation
└── EXPLANATION_FOR_FACULTY.md  # Detailed Viva & Q&A guide for Ma'am
```

---

## 🛠️ REST API Specification

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new user and receive JWT |
| `POST` | `/api/auth/login` | Public | Authenticate user and receive JWT |
| `GET` | `/api/auth/me` | Private | Retrieve current user profile |

### Task Routes (`/api/tasks`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/tasks` | Private | Retrieve all tasks (supports `?status=&priority=&category=&search=`) |
| `POST` | `/api/tasks` | Private | Create a new task |
| `GET` | `/api/tasks/stats` | Private | Get summary analytics and counts |
| `GET` | `/api/tasks/:id` | Private | Retrieve a single task by ID |
| `PUT` | `/api/tasks/:id` | Private | Update an existing task |
| `DELETE` | `/api/tasks/:id` | Private | Delete a task |

---

## 💻 Local Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Local instance on `mongodb://localhost:27017` or MongoDB Atlas URI)
- Git

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd Full_Stack_Application

# Install all dependencies (root, backend, frontend)
npm run install-all
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `MONGODB_URI` and `JWT_SECRET` are set:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskpulse_db
JWT_SECRET=taskpulse_super_secure_jwt_secret_token_bca_2026
```

### 3. Seed Demo Data (Optional but Recommended)
Populate the database with sample demo users and tasks:
```bash
npm run seed
# or: node server/seeder.js
```

### 4. Run the Full Stack Application
In two separate terminals:
```bash
# Terminal 1: Run Express Server (Port 5000)
npm run server

# Terminal 2: Run React Client (Port 5173)
npm run client
```
Open your browser at `http://localhost:5173`.

---

## 🔑 Demo Credentials (For Testing & Viva)

- **Student Account:**
  - Email: `student@dsu.edu.in`
  - Password: `password123`
- **Faculty Account:**
  - Email: `faculty@dsu.edu.in`
  - Password: `password123`

---

## 🚢 Deployment (Vercel)

The repository is configured for serverless deployment on Vercel via [`vercel.json`](file:///vercel.json).
The backend routes under `/api/*` run as Vercel Serverless Functions (`api/index.js`), and the frontend React application is built from `client/` and served statically.
