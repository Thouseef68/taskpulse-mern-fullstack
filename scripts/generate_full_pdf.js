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
  <title>BCA Assignment II - MERN Project Report</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 14mm 18mm 14mm;
    }
    body {
      font-family: Arial, Helvetica, sans-serif;
      color: #1f2937;
      line-height: 1.5;
      font-size: 10pt;
    }
    .cover-box {
      border: 2px solid #2563eb;
      padding: 18px;
      border-radius: 6px;
      text-align: center;
      background: #f8fafc;
      margin-bottom: 20px;
    }
    .cover-box h1 {
      margin: 0;
      color: #1e3a8a;
      font-size: 18pt;
      font-weight: bold;
    }
    .cover-box h2 {
      margin: 5px 0;
      font-size: 12pt;
      color: #374151;
    }
    .cover-box p {
      margin: 4px 0;
      font-size: 9.5pt;
      color: #4b5563;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 18px;
      font-size: 9pt;
    }
    .details-table td, .details-table th {
      border: 1px solid #d1d5db;
      padding: 5px 8px;
    }
    .details-table th {
      background: #f3f4f6;
      text-align: left;
      width: 30%;
      color: #111827;
    }
    h2.heading {
      color: #1d4ed8;
      border-bottom: 2px solid #bfdbfe;
      padding-bottom: 3px;
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 12pt;
      text-transform: uppercase;
    }
    h3.subheading {
      color: #2563eb;
      margin-top: 14px;
      margin-bottom: 5px;
      font-size: 10.5pt;
    }
    p {
      margin: 0 0 8px 0;
      text-align: justify;
    }
    ul, ol {
      margin: 0 0 10px 18px;
      padding: 0;
    }
    li {
      margin-bottom: 3px;
    }
    .code-box {
      background: #111827;
      color: #f3f4f6;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 7.8pt;
      margin-bottom: 12px;
      overflow-x: hidden;
      white-space: pre-wrap;
      line-height: 1.35;
      page-break-inside: avoid;
    }
    .screenshot-wrap {
      margin: 10px 0 16px 0;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      overflow: hidden;
      background: #ffffff;
      page-break-inside: avoid;
    }
    .screenshot-wrap img {
      width: 100%;
      display: block;
      border-bottom: 1px solid #e5e7eb;
    }
    .screenshot-label {
      padding: 6px 10px;
      font-size: 8.5pt;
      font-weight: bold;
      color: #374151;
      background: #f9fafb;
      text-align: center;
    }
    .page-break {
      page-break-before: always;
    }
    .tag {
      background: #dbeafe;
      color: #1e40af;
      padding: 1px 5px;
      border-radius: 3px;
      font-family: monospace;
      font-size: 8.5pt;
    }
  </style>
</head>
<body>

  <!-- Cover Box -->
  <div class="cover-box">
    <h1>DAYANANDA SAGAR UNIVERSITY</h1>
    <h2>School of Computer Applications (IQAC)</h2>
    <p><strong>Department of Computer Applications • Odd Semester 2026-2027</strong></p>
    <p style="margin-top: 6px; font-size: 11pt; font-weight: bold; color: #1e40af;">
      ASSIGNMENT II - MERN PROJECT LAB REPORT
    </p>
    <p style="font-size: 10.5pt; color: #2563eb;"><strong>Project Title:</strong> TaskPulse • Task & Project Management System</p>
  </div>

  <table class="details-table">
    <tr>
      <th>Course Name</th>
      <td><strong>FULL STACK DEVELOPMENT</strong></td>
    </tr>
    <tr>
      <th>Course Code</th>
      <td><strong>24CA3511</strong></td>
    </tr>
    <tr>
      <th>Programme & Semester</th>
      <td>BCA — Semester V (Section A & B)</td>
    </tr>
    <tr>
      <th>Course In-Charge / Faculty</th>
      <td><strong>Ms. Priyanka D Rukesh</strong></td>
    </tr>
    <tr>
      <th>Dean, School of CA</th>
      <td><strong>Dr. S Senthil</strong></td>
    </tr>
    <tr>
      <th>Student Name</th>
      <td><strong>Thouseef F</strong></td>
    </tr>
    <tr>
      <th>Outcomes Mapped</th>
      <td>CO5, PO5, PSO3</td>
    </tr>
    <tr>
      <th>Live Website URL</th>
      <td>https://taskpulse-mern-fullstack.vercel.app</td>
    </tr>
    <tr>
      <th>GitHub Repository</th>
      <td>https://github.com/Thouseef68/taskpulse-mern-fullstack</td>
    </tr>
  </table>

  <h2 class="heading">1. Introduction & Project Overview</h2>
  <p>
    This project was created as part of the BCA 5th Semester Full Stack Development Assignment II. 
    The goal is to build a complete <strong>MERN (MongoDB, Express, React, Node.js)</strong> application that implements a REST API, full CRUD operations, JWT authentication with protected routes, and a React frontend with functional components, React Router, and the Context API for state management.
  </p>
  <p>
    The application, named <strong>TaskPulse</strong>, is an academic task and project management website. It allows students and teachers to create their personal accounts, log in securely, and manage their daily assignments, lab tasks, and project milestones with priority badges, deadlines, status filters, and real-time completion analytics.
  </p>

  <h2 class="heading">2. Software & Technology Stack</h2>
  <ul>
    <li><strong>MongoDB Atlas:</strong> Cloud database storing collections for users and tasks.</li>
    <li><strong>Express.js:</strong> Web application framework running on Node.js to create the REST API endpoints.</li>
    <li><strong>React.js (Vite):</strong> Frontend library using functional components and React Hooks (useState, useEffect, useContext).</li>
    <li><strong>Node.js:</strong> JavaScript runtime environment executing backend code.</li>
    <li><strong>JSON Web Tokens (JWT):</strong> Used to issue secure authentication tokens for session verification.</li>
    <li><strong>Bcryptjs:</strong> Used for hashing user passwords before saving them in MongoDB.</li>
    <li><strong>React Router v6:</strong> Handles client-side navigation between pages with protected routes.</li>
    <li><strong>Context API:</strong> Provides centralized state management for authentication and tasks.</li>
    <li><strong>Vercel:</strong> Cloud platform used to deploy the frontend and serverless API together.</li>
  </ul>

  <h2 class="heading">3. REST API Endpoints Specification</h2>
  <table class="details-table">
    <tr>
      <th>HTTP Method</th>
      <th>Endpoint Route</th>
      <th>Access</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/register</td>
      <td>Public</td>
      <td>Registers new user with name, email, password, and role.</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/login</td>
      <td>Public</td>
      <td>Validates email and password, returns signed JWT token.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/auth/me</td>
      <td>Private (JWT)</td>
      <td>Returns profile of currently logged-in user.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/tasks</td>
      <td>Private (JWT)</td>
      <td>Retrieves user's tasks with search query and filters. (READ)</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/tasks</td>
      <td>Private (JWT)</td>
      <td>Creates a new task with title, priority, due date. (CREATE)</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/tasks/stats</td>
      <td>Private (JWT)</td>
      <td>Calculates task totals, pending, in-progress, and completed counts.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/tasks/:id</td>
      <td>Private (JWT)</td>
      <td>Retrieves single task details for editing. (READ)</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>/api/tasks/:id</td>
      <td>Private (JWT)</td>
      <td>Updates task title, priority, or status. (UPDATE)</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/api/tasks/:id</td>
      <td>Private (JWT)</td>
      <td>Deletes the task permanently from MongoDB. (DELETE)</td>
    </tr>
  </table>

  <div class="page-break"></div>

  <h2 class="heading">4. CRUD Operations & Live Execution Screenshots</h2>
  <p>The following screenshots demonstrate each operation performed on the live deployed website:</p>

  <h3 class="subheading">Output 1: User Login & Authentication Screen</h3>
  <p>Users enter their email and password. Includes quick-fill buttons for immediate testing during evaluation.</p>
  <div class="screenshot-wrap">
    <img src="${imgLogin}" alt="Login Screen">
    <div class="screenshot-label">Screenshot 1: Authentication Portal (/login) with JWT Session Handler</div>
  </div>

  <h3 class="subheading">Output 2: Main Dashboard Screen</h3>
  <p>Greets the student by name and displays real-time KPI counters (Total, Completed, In Progress, Pending) and progress bar.</p>
  <div class="screenshot-wrap">
    <img src="${imgDashboard}" alt="Dashboard Screen">
    <div class="screenshot-label">Screenshot 2: User Dashboard with Live Analytics from MongoDB Atlas</div>
  </div>

  <div class="page-break"></div>

  <h3 class="subheading">Output 3: CREATE Operation — Adding a New Task</h3>
  <p>The student opens the Create Task form, fills in the title, description, category, and priority (High), then saves it to MongoDB.</p>
  <div class="screenshot-wrap">
    <img src="${imgCreate}" alt="Create Task Screen">
    <div class="screenshot-label">Screenshot 3: CREATE Operation — Filling and submitting a new task record</div>
  </div>

  <h3 class="subheading">Output 4: READ & FILTER Operation — Listing Tasks</h3>
  <p>Displays all tasks stored in MongoDB for the logged-in user. The search bar filters by keyword, and dropdowns filter by status.</p>
  <div class="screenshot-wrap">
    <img src="${imgRead}" alt="Read Operation Screen">
    <div class="screenshot-label">Screenshot 4: READ Operation — Filtering tasks by keyword ("Assignment") and priority</div>
  </div>

  <div class="page-break"></div>

  <h3 class="subheading">Output 5: UPDATE Operation — Modifying Status & Details</h3>
  <p>The student clicks the quick-advance button or edits task details to update the status to "Completed". The database updates immediately.</p>
  <div class="screenshot-wrap">
    <img src="${imgUpdate}" alt="Update Operation Screen">
    <div class="screenshot-label">Screenshot 5: UPDATE Operation — Advancing task status to "Completed"</div>
  </div>

  <h3 class="subheading">Output 6: DELETE Operation — Removing a Task with Confirmation</h3>
  <p>When the delete button is clicked, a confirmation modal pops up asking the user to confirm. Once confirmed, it deletes from MongoDB.</p>
  <div class="screenshot-wrap">
    <img src="${imgDelete}" alt="Delete Operation Screen">
    <div class="screenshot-label">Screenshot 6: DELETE Operation — Delete Confirmation Modal removing record from MongoDB</div>
  </div>

  <div class="page-break"></div>

  <h3 class="subheading">Output 7: Real-Time Analytics Breakdown Page</h3>
  <p>Visual breakdown of tasks by status (Completed, In Progress, Pending) and priority distribution (High, Medium, Low).</p>
  <div class="screenshot-wrap">
    <img src="${imgAnalytics}" alt="Analytics Screen">
    <div class="screenshot-label">Screenshot 7: Productivity & Workload Analytics Screen (/analytics)</div>
  </div>

  <div class="page-break"></div>

  <h2 class="heading">5. Complete Project Source Code</h2>
  <p>Below is the complete source code for all required backend and frontend files:</p>

  <h3 class="subheading">5.1 Backend Server Entry Point (server/server.js)</h3>
  <div class="code-box">${escapeHtml(codeServer)}</div>

  <h3 class="subheading">5.2 MongoDB Cloud Database Connection (server/config/db.js)</h3>
  <div class="code-box">${escapeHtml(codeDb)}</div>

  <div class="page-break"></div>

  <h3 class="subheading">5.3 User Model with Bcrypt Hashing (server/models/User.js)</h3>
  <div class="code-box">${escapeHtml(codeUser)}</div>

  <h3 class="subheading">5.4 Task Model with Mongoose Schema (server/models/Task.js)</h3>
  <div class="code-box">${escapeHtml(codeTask)}</div>

  <div class="page-break"></div>

  <h3 class="subheading">5.5 Authentication Controller (server/controllers/authController.js)</h3>
  <div class="code-box">${escapeHtml(codeAuthCtrl)}</div>

  <div class="page-break"></div>

  <h3 class="subheading">5.6 Task CRUD Controller (server/controllers/taskController.js)</h3>
  <div class="code-box">${escapeHtml(codeTaskCtrl)}</div>

  <div class="page-break"></div>

  <h3 class="subheading">5.7 JWT Authentication Middleware (server/middleware/authMiddleware.js)</h3>
  <div class="code-box">${escapeHtml(codeAuthMiddleware)}</div>

  <h3 class="subheading">5.8 Axios API Client with Bearer Interceptor (client/src/api/axios.js)</h3>
  <div class="code-box">${escapeHtml(codeAxios)}</div>

  <div class="page-break"></div>

  <h3 class="subheading">5.9 Auth State Management Context (client/src/context/AuthContext.jsx)</h3>
  <div class="code-box">${escapeHtml(codeAuthContext)}</div>

  <div class="page-break"></div>

  <h3 class="subheading">5.10 Task CRUD State Management Context (client/src/context/TaskContext.jsx)</h3>
  <div class="code-box">${escapeHtml(codeTaskContext)}</div>

  <div class="page-break"></div>

  <h3 class="subheading">5.11 Protected Route Guard Component (client/src/components/ProtectedRoute.jsx)</h3>
  <div class="code-box">${escapeHtml(codeProtected)}</div>

  <h3 class="subheading">5.12 Main React Application Router Layout (client/src/App.jsx)</h3>
  <div class="code-box">${escapeHtml(codeApp)}</div>

  <div class="page-break"></div>

  <h2 class="heading">6. Viva Questions & Quick Answers for Evaluation</h2>

  <p><strong>Q1: What is JWT and how does it protect routes in this project?</strong><br>
  <em>Answer:</em> JWT stands for JSON Web Token. When a user registers or logs in, the server generates a signed token containing their User ID with a 7-day expiry. The React client saves it in localStorage and includes it in the HTTP <code>Authorization: Bearer &lt;token&gt;</code> header on every API call. The backend middleware (<code>authMiddleware.js</code>) verifies the token using <code>jwt.verify()</code> before allowing access to task endpoints.</p>

  <p><strong>Q2: Explain how passwords are secured in MongoDB.</strong><br>
  <em>Answer:</em> Passwords are never saved in plain text. In <code>server/models/User.js</code>, a Mongoose pre-save hook automatically runs bcrypt hashing with 10 salt rounds before saving to the database. During login, <code>bcrypt.compare()</code> verifies the entered password against the stored hash in constant time.</p>

  <p><strong>Q3: Why did you use the Context API instead of Redux?</strong><br>
  <em>Answer:</em> The Context API is built directly into React, requiring no extra dependencies. It provides global state for user authentication (<code>AuthContext</code>) and tasks (<code>TaskContext</code>) cleanly without the boilerplate of Redux actions and reducers.</p>

  <p><strong>Q4: How are CRUD operations implemented?</strong><br>
  <em>Answer:</em> In <code>taskController.js</code>:
  <ul>
    <li><strong>CREATE:</strong> <code>POST /api/tasks</code> validates fields and creates a task for the logged-in user.</li>
    <li><strong>READ:</strong> <code>GET /api/tasks</code> finds tasks matching the user ID with status/priority filters and search keywords.</li>
    <li><strong>UPDATE:</strong> <code>PUT /api/tasks/:id</code> checks ownership and updates task attributes.</li>
    <li><strong>DELETE:</strong> <code>DELETE /api/tasks/:id</code> checks ownership and removes the task from MongoDB.</li>
  </ul>
  </p>

  <p><strong>Q5: How is the application deployed?</strong><br>
  <em>Answer:</em> The application is deployed on <strong>Vercel</strong>. The React frontend is built as static files, and the Express backend runs as a Vercel Serverless Function via <code>api/index.js</code>. The database is hosted on <strong>MongoDB Atlas</strong>, allowing live cloud persistence from any device.</p>

  <h2 class="heading">7. Conclusion</h2>
  <p>
    The <strong>TaskPulse</strong> project completely satisfies all requirements for Assignment II (Course 24CA3511). 
    It features a working MERN stack architecture, full CRUD operations, secure token authentication, protected routes, clean React functional components, and live cloud deployment on Vercel and MongoDB Atlas.
  </p>

</body>
</html>
`;

(async () => {
  console.log('Generating complete academic PDF report...');
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
      top: '14mm',
      bottom: '14mm',
      left: '12mm',
      right: '12mm',
    },
  });

  fs.copyFileSync(projectPdfPath, desktopPdfPath);

  console.log('✅ Updated PDF successfully generated!');
  console.log('Location 1:', projectPdfPath);
  console.log('Location 2:', desktopPdfPath);

  await browser.close();
})();
