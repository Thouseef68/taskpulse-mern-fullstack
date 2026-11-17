# TaskPulse • Complete Faculty Viva & Presentation Guide

**Institution:** Dayananda Sagar University (DSU)  
**Department:** School of Computer Applications (IQAC)  
**Programme:** Bachelor of Computer Applications (BCA) — Semester V  
**Course Code:** 24CA3511  
**Course Title:** FULL STACK DEVELOPMENT  
**Course In-Charge / Evaluator:** Ms. Priyanka D Rukesh  
**Dean, SCA:** Dr. S Senthil  
**Outcomes Mapped:** CO5, PO5, PSO3  
**Project Name:** **TaskPulse** — Full-Stack Task & Project Management System  

---

## 1. 2-Minute Pitch for Ms. Priyanka D Rukesh

> *"Good morning / afternoon Ma'am. For Assignment II, I have designed and developed **TaskPulse**, a full-stack MERN application (MongoDB, Express.js, React, Node.js) for task and project management.*  
>  
> *It features a secure **Node.js/Express REST API** with full CRUD capabilities connected to **MongoDB** via Mongoose schemas. Authentication is powered by **JSON Web Tokens (JWT)** with salt-based **bcrypt password hashing** and a custom **protect middleware** guarding private routes.*  
>  
> *On the front-end, I built a modular **React SPA** using 100% **functional components and React Hooks**, with **React Router** for protected navigation and the **Context API (`AuthContext` and `TaskContext`)** for global state management.*  
>  
> *The project is fully responsive, contains live analytics calculated from MongoDB, and is deployed on **Vercel** with source code tracked on **GitHub**."*

---

## 2. Requirement-by-Requirement Checklist

| Sl | Assignment Requirement | Implementation in TaskPulse | Key Files to Show Ma'am |
|---|---|---|---|
| 1 | **MERN Stack Architecture** | MongoDB + Express + React + Node.js | Entire repo structure (`client/`, `server/`, `api/`) |
| 2 | **Node.js/Express REST API** | Clean modular REST API (`/api/auth/*`, `/api/tasks/*`) | [`server/server.js`](file:///server/server.js), [`server/routes/taskRoutes.js`](file:///server/routes/taskRoutes.js) |
| 3 | **Full CRUD on MongoDB** | **C**reate, **R**ead, **U**pdate, **D**elete tasks with filters & sorting | [`server/controllers/taskController.js`](file:///server/controllers/taskController.js) |
| 4 | **JWT-Based Authentication** | Token generation (`jwt.sign`), verification (`jwt.verify`), Bearer header | [`server/controllers/authController.js`](file:///server/controllers/authController.js), [`server/middleware/authMiddleware.js`](file:///server/middleware/authMiddleware.js) |
| 5 | **Protected Routes / Middleware** | Express `protect` middleware + React `<ProtectedRoute>` guard | [`server/middleware/authMiddleware.js`](file:///server/middleware/authMiddleware.js), [`client/src/components/ProtectedRoute.jsx`](file:///client/src/components/ProtectedRoute.jsx) |
| 6 | **React Front-end** | Modern Vite React, 100% functional components with Hooks | [`client/src/App.jsx`](file:///client/src/App.jsx), [`client/src/pages/Dashboard.jsx`](file:///client/src/pages/Dashboard.jsx) |
| 7 | **React Router Navigation** | `react-router-dom` v6 (`BrowserRouter`, `Routes`, `Route`, `Navigate`) | [`client/src/App.jsx`](file:///client/src/App.jsx) |
| 8 | **State Management** | React Context API (`AuthContext`, `TaskContext`) with custom hooks | [`client/src/context/AuthContext.jsx`](file:///client/src/context/AuthContext.jsx), [`client/src/context/TaskContext.jsx`](file:///client/src/context/TaskContext.jsx) |
| 9 | **API Consumption** | Axios instance with Request & Response interceptors | [`client/src/api/axios.js`](file:///client/src/api/axios.js) |

---

## 3. High-Level Architecture & Data Flow

```text
+-----------------------------------------------------------------------------------+
|                                REACT FRONTEND                                     |
|  [Pages: Dashboard, TaskList, TaskForm, Analytics, Login, Register]               |
|                                         |                                         |
|                 [Context API: AuthContext & TaskContext]                          |
|                                         |                                         |
|                       [Axios API Client + Interceptors]                           |
+-----------------------------------------|-----------------------------------------+
                                          | HTTP Request (Bearer JWT Header)
                                          v
+-----------------------------------------------------------------------------------+
|                             EXPRESS / NODE.JS BACKEND                             |
|                                         |                                         |
|                   [CORS, Express JSON Body Parsing]                               |
|                                         |                                         |
|                             [Express Route Handlers]                              |
|                          /api/auth   |   /api/tasks                               |
|                                      |                                            |
|                        [JWT authMiddleware (`protect`)]                           |
|                         Verifies token & attaches req.user                        |
|                                      |                                            |
|                           [Controller Business Logic]                             |
|                       authController  |  taskController                           |
|                                      |                                            |
|                             [Mongoose ODM Models]                                 |
|                             User Schema | Task Schema                             |
+--------------------------------------|--------------------------------------------+
                                       |
                                       v
                             +-------------------+
                             |  MONGODB DATABASE |
                             |   'taskpulse_db'  |
                             | collections:      |
                             |  - users          |
                             |  - tasks          |
                             +-------------------+
```

---

## 4. Top 10 Viva Questions & Expert Answers

### Q1: What is JWT, and how is it used in your project?
**Answer:**  
> *"JWT stands for JSON Web Token. It is a compact, URL-safe means of representing claims securely between two parties. In TaskPulse, upon successful registration or login, the server signs a token using a secret key with user ID encoded inside (`jwt.sign({ id: user._id }, secret, { expiresIn: '7d' })`). The client saves this token in `localStorage` and sends it in the `Authorization: Bearer <token>` header for every subsequent HTTP request. The backend middleware verifies the signature with `jwt.verify()` before granting access to protected routes."*

### Q2: How does your Express authentication middleware protect routes?
**Answer:**  
> *"In `server/middleware/authMiddleware.js`, the `protect` function checks incoming request headers for `Authorization: Bearer <token>`. If missing or invalid, it immediately responds with HTTP 401 Unauthorized. If valid, `jwt.verify` decodes the token, fetches the user record from MongoDB excluding the hashed password (`select('-password')`), and attaches it to `req.user`. Then it calls `next()` to transfer control to the controller."*

### Q3: Why did you use the Context API instead of Redux?
**Answer:**  
> *"React's Context API is native, lightweight, and perfectly suited for medium-to-large single-page applications. It provides centralized state management without the verbose boilerplate, actions, reducers, and extra dependencies required by legacy Redux. In our application, `AuthContext` provides user authentication state and login/logout handlers to the entire component tree, while `TaskContext` centralizes task list fetching, caching, filtering, and CRUD state mutation."*

### Q4: How is password security implemented?
**Answer:**  
> *"Passwords are never stored in plain text. In `server/models/User.js`, we use a Mongoose pre-save middleware hook (`userSchema.pre('save')`). Before saving a new or modified password, bcrypt generates a cryptographic salt (`bcrypt.genSalt(10)`) and hashes the password (`bcrypt.hash`). When logging in, we use `bcrypt.compare` to compare the candidate password against the database hash in constant time to prevent timing attacks."*

### Q5: Explain the CRUD operations implemented in your project.
**Answer:**  
> *"All 4 CRUD operations are implemented on the `Task` entity:
> - **Create:** `POST /api/tasks` creates a task with title, description, priority, category, and dueDate, associated with `req.user._id`.
> - **Read:** `GET /api/tasks` retrieves all tasks for the logged-in user with dynamic query filtering by status, priority, category, search keyword, and sorting. `GET /api/tasks/:id` retrieves a single task.
> - **Update:** `PUT /api/tasks/:id` updates title, description, status, priority, or due date after verifying ownership (`task.user.toString() === req.user._id.toString()`).
> - **Delete:** `DELETE /api/tasks/:id` safely removes the task from MongoDB after checking ownership."*

### Q6: How does React Router protect routes on the client side?
**Answer:**  
> *"In `client/src/components/ProtectedRoute.jsx`, we wrap protected views like `<Dashboard />` and `<TaskList />`. The component checks `isAuthenticated` from `useAuth()`. If false or if the user is unauthenticated, it returns `<Navigate to='/login' replace />` while retaining the target route in `location.state.from`. Once logged in, the user is redirected back to the page they originally requested."*

### Q7: How does your React frontend communicate with the Express backend?
**Answer:**  
> *"We configured an Axios instance in `client/src/api/axios.js`. We set up an **Axios Request Interceptor** that reads the JWT token from `localStorage` and automatically attaches `Authorization: Bearer <token>` to every request header. We also added an **Axios Response Interceptor** that catches global 401 Unauthorized errors and clears local storage before redirecting to the login screen."*

### Q8: What database schema relationship did you implement in MongoDB?
**Answer:**  
> *"We implemented a **One-to-Many Referenced Relationship** between `User` and `Task`. In `server/models/Task.js`, each task contains a `user` field of type `mongoose.Schema.Types.ObjectId` referencing the `User` model (`ref: 'User'`). This ensures strict data isolation — users can only view, edit, and delete their own tasks."*

### Q9: What happens if an unauthorized user tries to edit or delete someone else's task?
**Answer:**  
> *"Even if a user knows the ObjectId of another user's task, our controller checks:
> ```javascript
> if (task.user.toString() !== req.user._id.toString()) {
>   return res.status(403).json({ success: false, message: 'Forbidden' });
> }
> ```
> This returns an HTTP 403 Forbidden status code, completely preventing unauthorized access."*

### Q10: How does your application run both locally and on Vercel?
**Answer:**  
> *"For local development, Vite provides an integrated development proxy (`/api` -> `localhost:5000`), allowing frontend and backend to run concurrently. For deployment on Vercel, `vercel.json` routes `/api/(.*)` to the serverless function entrypoint `api/index.js`, while serving the pre-built React application from `client/dist`. This monorepo architecture prevents CORS issues and serves the full stack from a single domain."*

---

## 5. Files to Open and Highlight in VS Code

1. **Backend Routing & Middleware:**  
   [`server/middleware/authMiddleware.js`](file:///server/middleware/authMiddleware.js) — Show the JWT verification and Bearer header extraction.
2. **REST API Controllers:**  
   [`server/controllers/taskController.js`](file:///server/controllers/taskController.js) — Show `getTasks` (filtering/search), `createTask`, `updateTask`, `deleteTask`.
3. **Mongoose Schemas:**  
   [`server/models/User.js`](file:///server/models/User.js) — Show bcrypt pre-save hashing hook.  
   [`server/models/Task.js`](file:///server/models/Task.js) — Show fields, validation, and compound indexes.
4. **Frontend State Management:**  
   [`client/src/context/AuthContext.jsx`](file:///client/src/context/AuthContext.jsx) — Show Context API state (`user`, `token`, `login`, `register`, `logout`).  
   [`client/src/context/TaskContext.jsx`](file:///client/src/context/TaskContext.jsx) — Show centralized task state & CRUD methods.
5. **Route Protection:**  
   [`client/src/App.jsx`](file:///client/src/App.jsx) & [`client/src/components/ProtectedRoute.jsx`](file:///client/src/components/ProtectedRoute.jsx) — Show React Router route guarding.
6. **API Client:**  
   [`client/src/api/axios.js`](file:///client/src/api/axios.js) — Show automatic Bearer token injection.

---

## 6. Demo Accounts for Instant Viva Evaluation

| Account Type | Email | Password | Role |
|---|---|---|---|
| **Student (BCA Sem V)** | `student@dsu.edu.in` | `password123` | student |
| **Faculty / Evaluator** | `faculty@dsu.edu.in` | `password123` | faculty |

*(Note: The login page also has 1-click **"Fill Student Account"** and **"Fill Faculty Account"** buttons for immediate demonstration).*

