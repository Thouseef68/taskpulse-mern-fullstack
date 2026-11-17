const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Users\\thous\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.join(__dirname, '../docs/screenshots');

const toBase64 = (filePath) => {
  try {
    const file = fs.readFileSync(filePath);
    return `data:image/png;base64,${file.toString('base64')}`;
  } catch {
    return '';
  }
};

const imgLogin = toBase64(path.join(SCREENSHOTS_DIR, '01_login_screen.png'));
const imgDashboard = toBase64(path.join(SCREENSHOTS_DIR, '02_dashboard_screen.png'));
const imgCreate = toBase64(path.join(SCREENSHOTS_DIR, '03_create_operation.png'));
const imgRead = toBase64(path.join(SCREENSHOTS_DIR, '04_read_operation.png'));
const imgUpdate = toBase64(path.join(SCREENSHOTS_DIR, '05_update_operation.png'));
const imgDelete = toBase64(path.join(SCREENSHOTS_DIR, '06_delete_operation.png'));
const imgAnalytics = toBase64(path.join(SCREENSHOTS_DIR, '07_analytics_screen.png'));

// Read core code files
const codeServer = fs.readFileSync(path.join(__dirname, '../server/server.js'), 'utf8');
const codeDb = fs.readFileSync(path.join(__dirname, '../server/config/db.js'), 'utf8');
const codeUser = fs.readFileSync(path.join(__dirname, '../server/models/User.js'), 'utf8');
const codeTask = fs.readFileSync(path.join(__dirname, '../server/models/Task.js'), 'utf8');
const codeAuthCtrl = fs.readFileSync(path.join(__dirname, '../server/controllers/authController.js'), 'utf8');
const codeTaskCtrl = fs.readFileSync(path.join(__dirname, '../server/controllers/taskController.js'), 'utf8');
const codeAuthMiddleware = fs.readFileSync(path.join(__dirname, '../server/middleware/authMiddleware.js'), 'utf8');
const codeAxios = fs.readFileSync(path.join(__dirname, '../client/src/api/axios.js'), 'utf8');
const codeAuthContext = fs.readFileSync(path.join(__dirname, '../client/src/context/AuthContext.jsx'), 'utf8');
const codeTaskContext = fs.readFileSync(path.join(__dirname, '../client/src/context/TaskContext.jsx'), 'utf8');
const codeProtected = fs.readFileSync(path.join(__dirname, '../client/src/components/ProtectedRoute.jsx'), 'utf8');
const codeApp = fs.readFileSync(path.join(__dirname, '../client/src/App.jsx'), 'utf8');

const escapeHtml = (str) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Assignment II Report - Full Stack Development (24CA3511)</title>
  <style>
    @page {
      size: A4;
      margin: 25mm 20mm 20mm 25mm; /* Standard academic thesis margin: 1 inch left, 0.8 inch others */
      @bottom-right {
        content: counter(page);
        font-family: 'Times New Roman', Times, serif;
        font-size: 10pt;
      }
    }
    
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #000000;
      line-height: 1.6;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }

    /* Traditional Cover Page */
    .cover-page {
      text-align: center;
      padding-top: 40px;
      page-break-after: always;
    }
    .cover-univ {
      font-size: 18pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 5px;
      letter-spacing: 0.5px;
    }
    .cover-school {
      font-size: 13pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 5px;
      color: #222;
    }
    .cover-dept {
      font-size: 11.5pt;
      margin-bottom: 40px;
    }
    .cover-divider {
      width: 60%;
      height: 1.5px;
      background: #000;
      margin: 20px auto;
    }
    .cover-report-title {
      font-size: 13pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .cover-subject {
      font-size: 12pt;
      margin-bottom: 40px;
    }
    .cover-project-name {
      font-size: 16pt;
      font-weight: bold;
      text-transform: uppercase;
      margin: 20px 0;
      padding: 10px;
      border: 1px solid #000;
      display: inline-block;
      width: 85%;
    }
    .submission-grid {
      margin-top: 70px;
      width: 100%;
      display: table;
    }
    .submission-left {
      display: table-cell;
      width: 50%;
      text-align: left;
      font-size: 11pt;
      vertical-align: top;
      line-height: 1.6;
    }
    .submission-right {
      display: table-cell;
      width: 50%;
      text-align: right;
      font-size: 11pt;
      vertical-align: top;
      line-height: 1.6;
    }
    .cover-footer {
      margin-top: 80px;
      font-size: 11pt;
      font-weight: bold;
    }

    /* Headings */
    h1.chapter-title {
      font-size: 14pt;
      font-weight: bold;
      text-transform: uppercase;
      border-bottom: 1.5px solid #000;
      padding-bottom: 4px;
      margin-top: 25px;
      margin-bottom: 12px;
    }
    h2.section-title {
      font-size: 12pt;
      font-weight: bold;
      margin-top: 18px;
      margin-bottom: 8px;
    }
    h3.sub-section-title {
      font-size: 11pt;
      font-weight: bold;
      margin-top: 12px;
      margin-bottom: 6px;
    }

    p {
      text-align: justify;
      margin: 0 0 10px 0;
      text-indent: 25px; /* Standard academic paragraph indent */
    }
    p.no-indent {
      text-indent: 0;
    }

    /* Standard Tables */
    table.academic-table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 10pt;
    }
    table.academic-table th, table.academic-table td {
      border: 1px solid #333333;
      padding: 6px 10px;
      text-align: left;
      vertical-align: top;
    }
    table.academic-table th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    ul, ol {
      margin: 0 0 12px 25px;
      padding: 0;
    }
    li {
      margin-bottom: 4px;
      text-align: justify;
    }

    /* Simple Clean Code Blocks (Light Theme) */
    .code-container {
      background: #fafafa;
      border: 1px solid #cccccc;
      border-radius: 2px;
      padding: 8px 12px;
      font-family: 'Consolas', 'Courier New', Courier, monospace;
      font-size: 8pt;
      line-height: 1.35;
      margin: 10px 0 15px 0;
      white-space: pre-wrap;
      word-break: break-word;
      page-break-inside: avoid;
      color: #111111;
    }

    /* Figure & Screenshot Containers */
    .figure-box {
      text-align: center;
      margin: 18px 0;
      page-break-inside: avoid;
    }
    .figure-box img {
      max-width: 95%;
      border: 1px solid #999999;
      display: inline-block;
    }
    .figure-caption {
      font-size: 10pt;
      font-weight: bold;
      margin-top: 6px;
      text-align: center;
    }

    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>

  <!-- ==================== COVER PAGE ==================== -->
  <div class="cover-page">
    <div class="cover-univ">DAYANANDA SAGAR UNIVERSITY</div>
    <div class="cover-school">SCHOOL OF COMPUTER APPLICATIONS (IQAC)</div>
    <div class="cover-dept">Department of Computer Applications • Shavige Malleshwara Hills, Bengaluru</div>

    <div class="cover-divider"></div>

    <div class="cover-report-title">ASSIGNMENT II - MERN PROJECT REPORT</div>
    <div class="cover-subject">
      Course: <strong>FULL STACK DEVELOPMENT (24CA3511)</strong><br>
      Semester: <strong>V BCA (Section A & B)</strong> • Academic Year: <strong>2026-2027</strong>
    </div>

    <div style="margin-top: 30px; font-size: 11pt; text-transform: uppercase;">A Full-Stack Project Report On</div>
    <div class="cover-project-name">
      TASKPULSE: A MERN STACK TASK &amp; PROJECT MANAGEMENT SYSTEM
    </div>

    <div class="submission-grid">
      <div class="submission-left">
        <strong>Submitted By:</strong><br>
        Name: <strong>Thouseef F</strong><br>
        Programme: <strong>BCA (Semester V)</strong><br>
        Course Code: <strong>24CA3511</strong>
      </div>
      <div class="submission-right">
        <strong>Under the Guidance of:</strong><br>
        <strong>Ms. Priyanka D Rukesh</strong><br>
        Assistant Professor, School of CA<br>
        Dayananda Sagar University
      </div>
    </div>

    <div class="cover-footer">
      DEPARTMENT OF COMPUTER APPLICATIONS<br>
      DAYANANDA SAGAR UNIVERSITY, BENGALURU — 560078
    </div>
  </div>

  <!-- ==================== CHAPTER 1 ==================== -->
  <h1 class="chapter-title">1. Introduction &amp; Project Objectives</h1>
  
  <p>
    As part of the academic curriculum for the Fifth Semester Bachelor of Computer Applications (BCA) at Dayananda Sagar University, Assignment II requires the design and implementation of a complete full-stack web application based on the <strong>MERN (MongoDB, Express.js, React.js, Node.js)</strong> technology stack.
  </p>
  <p>
    The project developed for this assignment is titled <strong>TaskPulse</strong>. It is a full-featured task and project management web portal developed to facilitate organized tracking of academic assignments, laboratory coursework, and project milestones. The application provides individual accounts for students and faculty, protected by stateless JSON Web Token (JWT) authentication, and supports comprehensive Create, Read, Update, and Delete (CRUD) operations on a cloud MongoDB Atlas database.
  </p>

  <h2 class="section-title">1.1 Objectives of the Assignment</h2>
  <ul>
    <li>To develop a secure RESTful API using Node.js and Express.js supporting complete CRUD operations.</li>
    <li>To implement user registration and login authenticated via JSON Web Tokens (JWT) with password hashing via bcryptjs.</li>
    <li>To create protected routes using custom Express middleware verifying Bearer authorization tokens.</li>
    <li>To design an interactive front-end using modern React.js with 100% functional components and React Hooks.</li>
    <li>To implement client-side routing and protected navigation using React Router v6.</li>
    <li>To manage global application state efficiently using the React Context API without third-party state libraries.</li>
    <li>To deploy the completed application to a live cloud platform (Vercel) connected to MongoDB Atlas.</li>
  </ul>

  <!-- ==================== CHAPTER 2 ==================== -->
  <h1 class="chapter-title">2. System Requirements &amp; Technologies</h1>

  <h2 class="section-title">2.1 Hardware Requirements</h2>
  <table class="academic-table">
    <tr>
      <th style="width: 35%;">Parameter</th>
      <th>Minimum Specification</th>
    </tr>
    <tr>
      <td>Processor</td>
      <td>Intel Core i3 / AMD Ryzen 3 or higher</td>
    </tr>
    <tr>
      <td>RAM</td>
      <td>4 GB (8 GB recommended)</td>
    </tr>
    <tr>
      <td>Storage</td>
      <td>500 MB free hard disk space for project dependencies</td>
    </tr>
    <tr>
      <td>Network</td>
      <td>Internet connection for MongoDB Atlas and cloud deployment</td>
    </tr>
  </table>

  <h2 class="section-title">2.2 Software Stack</h2>
  <table class="academic-table">
    <tr>
      <th style="width: 35%;">Layer / Component</th>
      <th>Technology Selected</th>
      <th>Purpose in Project</th>
    </tr>
    <tr>
      <td>Database</td>
      <td>MongoDB Atlas (Cloud M0)</td>
      <td>Document-oriented NoSQL storage for users and tasks</td>
    </tr>
    <tr>
      <td>Backend Runtime</td>
      <td>Node.js (v20+)</td>
      <td>Server-side JavaScript runtime engine</td>
    </tr>
    <tr>
      <td>Backend Framework</td>
      <td>Express.js (v4.21)</td>
      <td>RESTful API routing and middleware management</td>
    </tr>
    <tr>
      <td>Frontend Library</td>
      <td>React.js (v18) via Vite</td>
      <td>Component-based dynamic user interface</td>
    </tr>
    <tr>
      <td>Client Routing</td>
      <td>React Router DOM (v6)</td>
      <td>Single-page navigation and protected route redirection</td>
    </tr>
    <tr>
      <td>State Management</td>
      <td>React Context API</td>
      <td>Centralized authentication and task data state</td>
    </tr>
    <tr>
      <td>HTTP Client</td>
      <td>Axios</td>
      <td>Asynchronous HTTP requests with Bearer token interceptor</td>
    </tr>
    <tr>
      <td>Deployment</td>
      <td>Vercel</td>
      <td>Production serverless hosting and static asset delivery</td>
    </tr>
  </table>

  <div class="page-break"></div>

  <!-- ==================== CHAPTER 3 ==================== -->
  <h1 class="chapter-title">3. System Design &amp; Database Schemas</h1>

  <p>
    The system database design is implemented using Mongoose ODM schemas. A One-to-Many referenced relationship connects the <code>User</code> collection to the <code>Task</code> collection.
  </p>

  <h2 class="section-title">3.1 User Schema (server/models/User.js)</h2>
  <table class="academic-table">
    <tr>
      <th>Field Name</th>
      <th>Data Type</th>
      <th>Constraints</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>_id</td>
      <td>ObjectId</td>
      <td>Primary Key</td>
      <td>Unique identifier generated by MongoDB</td>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>Required, Trimmed</td>
      <td>Full name of the student or faculty member</td>
    </tr>
    <tr>
      <td>email</td>
      <td>String</td>
      <td>Required, Unique, Lowercase</td>
      <td>User email address used as login username</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Required, Min length 6</td>
      <td>Hashed password generated by bcryptjs (10 rounds)</td>
    </tr>
    <tr>
      <td>role</td>
      <td>String</td>
      <td>Enum: ['student', 'faculty', 'admin']</td>
      <td>Role category (default: 'student')</td>
    </tr>
    <tr>
      <td>createdAt / updatedAt</td>
      <td>Date</td>
      <td>Auto-generated</td>
      <td>Mongoose timestamp audit fields</td>
    </tr>
  </table>

  <h2 class="section-title">3.2 Task Schema (server/models/Task.js)</h2>
  <table class="academic-table">
    <tr>
      <th>Field Name</th>
      <th>Data Type</th>
      <th>Constraints</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>_id</td>
      <td>ObjectId</td>
      <td>Primary Key</td>
      <td>Unique task identifier</td>
    </tr>
    <tr>
      <td>title</td>
      <td>String</td>
      <td>Required, Max 120 chars</td>
      <td>Title of the assignment or project task</td>
    </tr>
    <tr>
      <td>description</td>
      <td>String</td>
      <td>Max 1000 chars</td>
      <td>Detailed instructions, notes, or requirements</td>
    </tr>
    <tr>
      <td>status</td>
      <td>String</td>
      <td>Enum: ['Pending', 'In Progress', 'Completed']</td>
      <td>Current workflow stage (default: 'Pending')</td>
    </tr>
    <tr>
      <td>priority</td>
      <td>String</td>
      <td>Enum: ['Low', 'Medium', 'High']</td>
      <td>Urgency flag (default: 'Medium')</td>
    </tr>
    <tr>
      <td>category</td>
      <td>String</td>
      <td>Enum: ['Academic', 'Project', 'Assignment']</td>
      <td>Work classification (default: 'Academic')</td>
    </tr>
    <tr>
      <td>dueDate</td>
      <td>Date</td>
      <td>Optional</td>
      <td>Target completion deadline date</td>
    </tr>
    <tr>
      <td>user</td>
      <td>ObjectId</td>
      <td>Required, Ref: 'User', Indexed</td>
      <td>Foreign key referencing the owning user record</td>
    </tr>
  </table>

  <div class="page-break"></div>

  <!-- ==================== CHAPTER 4 ==================== -->
  <h1 class="chapter-title">4. REST API Specification</h1>

  <p>
    The REST API is organized under the <code>/api</code> prefix. All private endpoints require a valid JWT passed in the HTTP request header: <code>Authorization: Bearer &lt;token&gt;</code>.
  </p>

  <table class="academic-table">
    <tr>
      <th>Method</th>
      <th>Endpoint Route</th>
      <th>Access</th>
      <th>Function Description</th>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/register</td>
      <td>Public</td>
      <td>Registers new user with hashed password; returns JWT token</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/login</td>
      <td>Public</td>
      <td>Validates credentials; returns JWT token on success</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/auth/me</td>
      <td>Protected</td>
      <td>Returns current authenticated user profile</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/tasks</td>
      <td>Protected</td>
      <td><strong>READ:</strong> Retrieves tasks filtered by status, priority, or search query</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/tasks</td>
      <td>Protected</td>
      <td><strong>CREATE:</strong> Creates a new task bound to the authenticated user</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/tasks/stats</td>
      <td>Protected</td>
      <td>Retrieves summary metrics: total, completed, pending, completion rate</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/tasks/:id</td>
      <td>Protected</td>
      <td><strong>READ:</strong> Retrieves a single task by ID after ownership check</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>/api/tasks/:id</td>
      <td>Protected</td>
      <td><strong>UPDATE:</strong> Updates task title, status, priority, or due date</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/api/tasks/:id</td>
      <td>Protected</td>
      <td><strong>DELETE:</strong> Permanently deletes the task from MongoDB</td>
    </tr>
  </table>

  <div class="page-break"></div>

  <!-- ==================== CHAPTER 5 ==================== -->
  <h1 class="chapter-title">5. CRUD Operations &amp; Verification Screenshots</h1>

  <p>
    This chapter presents the actual outputs captured from the live deployed web application hosted at <code>https://taskpulse-mern-fullstack.vercel.app</code> connected to the MongoDB Atlas database.
  </p>

  <h2 class="section-title">5.1 User Authentication (Login)</h2>
  <p class="no-indent">
    The authentication portal allows registered students and faculty members to log in. It verifies credentials against MongoDB Atlas and issues a signed JWT.
  </p>
  <div class="figure-box">
    <img src="${imgLogin}" alt="Figure 5.1: User Login Portal">
    <div class="figure-caption">Figure 5.1: Authentication &amp; Login Portal (/login) with JWT Verification</div>
  </div>

  <h2 class="section-title">5.2 User Dashboard with Real-Time KPIs</h2>
  <p class="no-indent">
    Upon successful login, the user is navigated to the dashboard. The system displays live summary counters (Total, Completed, In Progress, Pending) and an animated progress bar.
  </p>
  <div class="figure-box">
    <img src="${imgDashboard}" alt="Figure 5.2: Student Dashboard">
    <div class="figure-caption">Figure 5.2: Main Dashboard Showing Live Analytics from MongoDB Atlas</div>
  </div>

  <div class="page-break"></div>

  <h2 class="section-title">5.3 CREATE Operation — Adding a New Task</h2>
  <p class="no-indent">
    The user accesses the <code>/create-task</code> route and fills in the task title, notes, priority (High), and category (Assignment). Submitting the form issues a <code>POST /api/tasks</code> request.
  </p>
  <div class="figure-box">
    <img src="${imgCreate}" alt="Figure 5.3: Create Task Form">
    <div class="figure-caption">Figure 5.3: CREATE Operation — Form Submission to Insert Record into MongoDB Atlas</div>
  </div>

  <h2 class="section-title">5.4 READ &amp; FILTER Operation — Listing Tasks</h2>
  <p class="no-indent">
    The <code>/tasks</code> view performs a <code>GET /api/tasks</code> query. The search bar filters tasks matching keywords (e.g., "Assignment"), and dropdown menus filter by status or priority.
  </p>
  <div class="figure-box">
    <img src="${imgRead}" alt="Figure 5.4: Read and Filter Operation">
    <div class="figure-caption">Figure 5.4: READ Operation — Task List with Real-Time Keyword Search &amp; Filtering</div>
  </div>

  <div class="page-break"></div>

  <h2 class="section-title">5.5 UPDATE Operation — Modifying Status &amp; Details</h2>
  <p class="no-indent">
    Clicking the quick-advance action button or navigating to <code>/edit-task/:id</code> issues a <code>PUT /api/tasks/:id</code> request. The status updates from "Pending" to "Completed" immediately.
  </p>
  <div class="figure-box">
    <img src="${imgUpdate}" alt="Figure 5.5: Update Task Operation">
    <div class="figure-caption">Figure 5.5: UPDATE Operation — Advancing Task Status to "Completed"</div>
  </div>

  <h2 class="section-title">5.6 DELETE Operation — Removing Task with Confirmation</h2>
  <p class="no-indent">
    Clicking the delete icon displays a modal confirmation dialog to prevent accidental deletion. Confirming issues a <code>DELETE /api/tasks/:id</code> call to permanently remove the item.
  </p>
  <div class="figure-box">
    <img src="${imgDelete}" alt="Figure 5.6: Delete Confirmation Modal">
    <div class="figure-caption">Figure 5.6: DELETE Operation — Confirmation Dialog Removing Record from Database</div>
  </div>

  <div class="page-break"></div>

  <h2 class="section-title">5.7 Real-Time Analytics &amp; Workload Distribution</h2>
  <p class="no-indent">
    The <code>/analytics</code> page aggregates task data from MongoDB Atlas, presenting productivity percentages, status distributions, and urgency rankings.
  </p>
  <div class="figure-box">
    <img src="${imgAnalytics}" alt="Figure 5.7: Analytics Breakdown">
    <div class="figure-caption">Figure 5.7: Analytics &amp; Workload Distribution Screen (/analytics)</div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== CHAPTER 6 ==================== -->
  <h1 class="chapter-title">6. Source Code Implementation</h1>
  <p>
    The complete source code for both the backend REST API and the React frontend is documented below:
  </p>

  <h2 class="section-title">6.1 Server Entrypoint (server/server.js)</h2>
  <div class="code-container">${escapeHtml(codeServer)}</div>

  <div class="page-break"></div>

  <h2 class="section-title">6.2 Database Connection Module (server/config/db.js)</h2>
  <div class="code-container">${escapeHtml(codeDb)}</div>

  <h2 class="section-title">6.3 User Mongoose Model (server/models/User.js)</h2>
  <div class="code-container">${escapeHtml(codeUser)}</div>

  <div class="page-break"></div>

  <h2 class="section-title">6.4 Task Mongoose Model (server/models/Task.js)</h2>
  <div class="code-container">${escapeHtml(codeTask)}</div>

  <h2 class="section-title">6.5 Authentication Controller (server/controllers/authController.js)</h2>
  <div class="code-container">${escapeHtml(codeAuthCtrl)}</div>

  <div class="page-break"></div>

  <h2 class="section-title">6.6 Task CRUD Controller (server/controllers/taskController.js)</h2>
  <div class="code-container">${escapeHtml(codeTaskCtrl)}</div>

  <div class="page-break"></div>

  <h2 class="section-title">6.7 JWT Authentication Middleware (server/middleware/authMiddleware.js)</h2>
  <div class="code-container">${escapeHtml(codeAuthMiddleware)}</div>

  <h2 class="section-title">6.8 Axios Client with Bearer Token Interceptor (client/src/api/axios.js)</h2>
  <div class="code-container">${escapeHtml(codeAxios)}</div>

  <div class="page-break"></div>

  <h2 class="section-title">6.9 Authentication Context API (client/src/context/AuthContext.jsx)</h2>
  <div class="code-container">${escapeHtml(codeAuthContext)}</div>

  <div class="page-break"></div>

  <h2 class="section-title">6.10 Task CRUD Context API (client/src/context/TaskContext.jsx)</h2>
  <div class="code-container">${escapeHtml(codeTaskContext)}</div>

  <div class="page-break"></div>

  <h2 class="section-title">6.11 Protected Route Component (client/src/components/ProtectedRoute.jsx)</h2>
  <div class="code-container">${escapeHtml(codeProtected)}</div>

  <h2 class="section-title">6.12 Main React Application Layout (client/src/App.jsx)</h2>
  <div class="code-container">${escapeHtml(codeApp)}</div>

  <div class="page-break"></div>

  <!-- ==================== CHAPTER 7 ==================== -->
  <h1 class="chapter-title">7. Viva Voce Questions &amp; Answers</h1>

  <p class="no-indent"><strong>Question 1: What is JSON Web Token (JWT) and how is it used in this project?</strong></p>
  <p>
    <strong>Answer:</strong> JSON Web Token is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. In our application, when a user logs in, the server generates a token signed with a secret key using <code>jwt.sign({ id: user._id }, secret, { expiresIn: '7d' })</code>. The client saves this token in <code>localStorage</code> and attaches it to the <code>Authorization: Bearer &lt;token&gt;</code> header on every outgoing API request.
  </p>

  <p class="no-indent"><strong>Question 2: How does the Express authentication middleware protect private routes?</strong></p>
  <p>
    <strong>Answer:</strong> In <code>authMiddleware.js</code>, the <code>protect</code> function intercepts incoming requests, extracts the Bearer token, and verifies it with <code>jwt.verify()</code>. If the token is valid, it retrieves the user from MongoDB excluding the password field (<code>select('-password')</code>), attaches the record to <code>req.user</code>, and calls <code>next()</code>. If invalid or missing, it responds with an HTTP 401 Unauthorized status.
  </p>

  <p class="no-indent"><strong>Question 3: Why was the Context API chosen over Redux for state management?</strong></p>
  <p>
    <strong>Answer:</strong> The Context API is native to React, requiring no external packages or boilerplate files (action types, action creators, reducers). It provides predictable, centralized state management across the component hierarchy for authentication (<code>AuthContext</code>) and tasks (<code>TaskContext</code>) without prop drilling.
  </p>

  <p class="no-indent"><strong>Question 4: How are passwords secured in the database?</strong></p>
  <p>
    <strong>Answer:</strong> Passwords are never stored as plain text. In <code>server/models/User.js</code>, a Mongoose pre-save hook automatically intercepts new or modified passwords, generates a cryptographic salt using <code>bcrypt.genSalt(10)</code>, and hashes the password before writing to MongoDB. During login, <code>bcrypt.compare()</code> verifies candidate passwords in constant time.
  </p>

  <p class="no-indent"><strong>Question 5: How are multi-tenant permissions enforced so users cannot alter each other's tasks?</strong></p>
  <p>
    <strong>Answer:</strong> Each task document in MongoDB contains a <code>user</code> field referencing the creator's ObjectId. In <code>taskController.js</code>, before updating or deleting a task, the controller executes: <code>if (task.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });</code>. This prevents unauthorized access even if another user's task ID is known.
  </p>

  <!-- ==================== CHAPTER 8 ==================== -->
  <h1 class="chapter-title">8. Conclusion</h1>
  <p>
    The <strong>TaskPulse</strong> project successfully demonstrates the design and deployment of a modern MERN stack application meeting all criteria specified for BCA Semester V Assignment II (Course 24CA3511). The system incorporates a robust Node.js/Express REST API, cloud persistence on MongoDB Atlas, secure JWT authentication, and a responsive React frontend utilizing functional components, React Router v6, and the Context API.
  </p>

</body>
</html>
`;

(async () => {
  console.log('Generating traditional academic PDF report...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const projectPdfPath = path.join(__dirname, '../TaskPulse_MERN_Project_Report_Thouseef_F.pdf');
  const desktopPdfPath = 'C:\\Users\\thous\\Desktop\\TaskPulse_MERN_Project_Report_Thouseef_F.pdf';

  await page.pdf({
    path: projectPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '20mm',
      right: '20mm',
    },
  });

  fs.copyFileSync(projectPdfPath, desktopPdfPath);

  console.log('✅ Traditional Academic PDF successfully generated!');
  console.log('Location 1:', projectPdfPath);
  console.log('Location 2:', desktopPdfPath);

  await browser.close();
})();
