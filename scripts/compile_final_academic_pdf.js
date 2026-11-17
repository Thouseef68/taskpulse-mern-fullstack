const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Users\\thous\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.join(__dirname, '../docs/screenshots');

const toBase64 = (fileName) => {
  try {
    const file = fs.readFileSync(path.join(SCREENSHOTS_DIR, fileName));
    return `data:image/png;base64,${file.toString('base64')}`;
  } catch (e) {
    console.error('Missing image:', fileName);
    return '';
  }
};

const fig1 = toBase64('fig1_login.png');
const fig2 = toBase64('fig2_register.png');
const fig3 = toBase64('fig3_dashboard.png');
const fig4 = toBase64('fig4_create_task.png');
const fig5 = toBase64('fig5_read_tasks.png');
const fig6 = toBase64('fig6_update_task.png');
const fig7 = toBase64('fig7_delete_modal.png');
const fig8 = toBase64('fig8_analytics.png');

// Read code files
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
  <title>MERN Assignment Report - Dayananda Sagar University</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #111111;
      line-height: 1.45;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }

    /* Cover Page */
    .cover {
      text-align: center;
      padding-top: 20px;
      page-break-after: always;
      break-after: page;
    }
    .cover-h1 {
      font-size: 19pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }
    .cover-h2 {
      font-size: 13pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 4px;
      color: #222;
    }
    .cover-h3 {
      font-size: 11pt;
      margin-bottom: 22px;
    }
    .line {
      width: 70%;
      height: 1.5px;
      background: #000;
      margin: 12px auto 20px auto;
    }
    .assignment-tag {
      font-size: 13pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .course-details {
      font-size: 11pt;
      line-height: 1.6;
      margin-bottom: 25px;
    }
    .project-box {
      border: 1.5px solid #000;
      padding: 12px 18px;
      display: inline-block;
      width: 82%;
      font-size: 14pt;
      font-weight: bold;
      text-transform: uppercase;
      margin: 15px auto;
      background: #fafafa;
    }
    .info-container {
      margin-top: 50px;
      width: 100%;
      display: table;
    }
    .col-left {
      display: table-cell;
      width: 50%;
      text-align: left;
      font-size: 11pt;
      line-height: 1.6;
      vertical-align: top;
    }
    .col-right {
      display: table-cell;
      width: 50%;
      text-align: right;
      font-size: 11pt;
      line-height: 1.6;
      vertical-align: top;
    }
    .cover-foot {
      margin-top: 65px;
      font-size: 10.5pt;
      font-weight: bold;
      text-align: center;
    }

    /* Headings */
    h1.chapter {
      font-size: 13pt;
      font-weight: bold;
      text-transform: uppercase;
      border-bottom: 1.5px solid #000;
      padding-bottom: 2px;
      margin-top: 14px;
      margin-bottom: 6px;
      page-break-after: avoid;
      break-after: avoid;
    }
    h2.section {
      font-size: 11pt;
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 4px;
      page-break-after: avoid;
      break-after: avoid;
    }

    p {
      text-align: justify;
      margin: 0 0 6px 0;
      text-indent: 18px;
    }
    p.no-indent {
      text-indent: 0;
    }

    /* Academic Tables */
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0 10px 0;
      font-size: 8.8pt;
    }
    table.data-table th, table.data-table td {
      border: 1px solid #444444;
      padding: 3.5px 6px;
      text-align: left;
      vertical-align: middle;
    }
    table.data-table th {
      background-color: #f1f3f5;
      font-weight: bold;
    }

    ul, ol {
      margin: 0 0 8px 18px;
      padding: 0;
    }
    li {
      margin-bottom: 3px;
      text-align: justify;
    }

    /* Code Snippets */
    .code-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 7px 9px;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 7.5pt;
      line-height: 1.32;
      margin: 6px 0 12px 0;
      white-space: pre-wrap;
      word-break: break-word;
      color: #0f172a;
    }

    /* Screenshots & Figures */
    .fig-container {
      text-align: center;
      margin: 10px auto 14px auto;
      page-break-inside: avoid;
      break-inside: avoid;
      width: 92%;
    }
    .fig-container img {
      width: 88%;
      max-height: 270px;
      object-fit: contain;
      border: 1px solid #94a3b8;
      display: block;
      margin: 0 auto;
      background: #ffffff;
    }
    .fig-title {
      font-size: 9.5pt;
      font-weight: bold;
      margin-top: 5px;
      text-align: center;
      color: #1e293b;
    }

    .page-break {
      page-break-before: always;
      break-before: page;
    }
  </style>
</head>
<body>

  <!-- ==================== COVER PAGE ==================== -->
  <div class="cover">
    <div class="cover-h1">DAYANANDA SAGAR UNIVERSITY</div>
    <div class="cover-h2">SCHOOL OF COMPUTER APPLICATIONS (IQAC)</div>
    <div class="cover-h3">Department of Computer Applications • Shavige Malleshwara Hills, Bengaluru</div>

    <div class="line"></div>

    <div class="assignment-tag">ASSIGNMENT II - MERN PROJECT REPORT</div>
    <div class="course-details">
      Course Title: <strong>FULL STACK DEVELOPMENT (24CA3511)</strong><br>
      Programme: <strong>Bachelor of Computer Applications (BCA)</strong><br>
      Semester: <strong>V (Sections A &amp; B)</strong> • Academic Year: <strong>2026-2027</strong>
    </div>

    <div style="font-size: 11pt; text-transform: uppercase;">A MERN Stack Project Report On:</div>
    <div class="project-box">
      TASKPULSE: SMART TASK &amp; PROJECT MANAGEMENT SYSTEM
    </div>

    <div class="info-container">
      <div class="col-left">
        <strong>Submitted By:</strong><br>
        Candidate: <strong>Thouseef F</strong><br>
        Class: <strong>BCA 5th Semester</strong><br>
        Course Code: <strong>24CA3511</strong>
      </div>
      <div class="col-right">
        <strong>Course In-Charge / Evaluator:</strong><br>
        <strong>Ms. Priyanka D Rukesh</strong><br>
        Assistant Professor, School of CA<br>
        Dean: <strong>Dr. S Senthil</strong>
      </div>
    </div>

    <div class="cover-foot">
      SCHOOL OF COMPUTER APPLICATIONS<br>
      DAYANANDA SAGAR UNIVERSITY, BENGALURU — 560078
    </div>
  </div>

  <!-- ==================== CHAPTER 1 ==================== -->
  <h1 class="chapter" style="margin-top: 0;">1. Introduction &amp; Project Overview</h1>
  
  <p>
    This project was designed and developed to fulfill the curriculum requirements of the Fifth Semester BCA course, <strong>FULL STACK DEVELOPMENT (24CA3511)</strong>, at Dayananda Sagar University. The prompt requires designing one complete MERN stack (MongoDB, Express, React, Node.js) application featuring a REST API with full CRUD operations, JWT user authentication with protected middleware, and a React frontend utilizing functional components, React Router navigation, and the Context API for state management.
  </p>
  <p>
    The developed system, titled <strong>TaskPulse</strong>, is an academic task and project management application. It offers a centralized web portal where students and teachers can track assignments, project milestones, priorities, and deadlines. Each user gets an isolated workspace with real-time completion analytics.
  </p>

  <h2 class="section">1.1 Objectives Achieved</h2>
  <ul>
    <li>Developed a RESTful API with Node.js and Express supporting full CRUD operations.</li>
    <li>Implemented secure user registration and login with salt-hashed passwords (bcryptjs) and JSON Web Tokens (JWT).</li>
    <li>Created a custom authorization middleware verifying Bearer tokens on protected endpoints.</li>
    <li>Engineered a responsive React frontend using 100% functional components and React Hooks.</li>
    <li>Implemented single-page navigation and protected routes using React Router v6.</li>
    <li>Centralized authentication and task states using the native React Context API.</li>
    <li>Deployed to cloud production on Vercel connected to MongoDB Atlas.</li>
  </ul>

  <!-- ==================== CHAPTER 2 ==================== -->
  <h1 class="chapter">2. Technology Stack &amp; Specifications</h1>

  <table class="data-table">
    <tr>
      <th style="width: 28%;">Component</th>
      <th style="width: 28%;">Technology</th>
      <th>Role in Application</th>
    </tr>
    <tr>
      <td>Database</td>
      <td>MongoDB Atlas</td>
      <td>Cloud NoSQL database storing users and tasks collections</td>
    </tr>
    <tr>
      <td>Backend Framework</td>
      <td>Node.js &amp; Express.js</td>
      <td>RESTful API routing, business controllers, and middleware</td>
    </tr>
    <tr>
      <td>Frontend Framework</td>
      <td>React.js (v18) + Vite</td>
      <td>User interface built with functional components &amp; hooks</td>
    </tr>
    <tr>
      <td>Authentication</td>
      <td>JWT &amp; Bcryptjs</td>
      <td>Stateless token authentication and password encryption</td>
    </tr>
    <tr>
      <td>Routing</td>
      <td>React Router DOM (v6)</td>
      <td>Client-side routing and protected route access control</td>
    </tr>
    <tr>
      <td>State Management</td>
      <td>React Context API</td>
      <td>Global stores: AuthContext and TaskContext</td>
    </tr>
    <tr>
      <td>Cloud Hosting</td>
      <td>Vercel</td>
      <td>Serverless function API and static asset deployment</td>
    </tr>
  </table>

  <div class="page-break"></div>

  <!-- ==================== CHAPTER 3 ==================== -->
  <h1 class="chapter" style="margin-top: 0;">3. Database Schema Design</h1>

  <p>
    The MongoDB database consists of two primary collections connected via a referenced relationship: <code>users</code> and <code>tasks</code>.
  </p>

  <h2 class="section">3.1 User Schema (server/models/User.js)</h2>
  <table class="data-table">
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Validation / Constraints</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>_id</td>
      <td>ObjectId</td>
      <td>Primary Key</td>
      <td>Unique MongoDB identifier</td>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>Required, Trimmed</td>
      <td>User's full name</td>
    </tr>
    <tr>
      <td>email</td>
      <td>String</td>
      <td>Required, Unique, Lowercase</td>
      <td>Account email and login ID</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Required, Min 6 chars</td>
      <td>Hashed password generated by bcrypt</td>
    </tr>
    <tr>
      <td>role</td>
      <td>String</td>
      <td>Enum: ['student', 'faculty', 'admin']</td>
      <td>User access role (default: 'student')</td>
    </tr>
  </table>

  <h2 class="section">3.2 Task Schema (server/models/Task.js)</h2>
  <table class="data-table">
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Validation / Constraints</th>
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
      <td>Task title or assignment name</td>
    </tr>
    <tr>
      <td>description</td>
      <td>String</td>
      <td>Max 1000 chars</td>
      <td>Notes, instructions, or project scope</td>
    </tr>
    <tr>
      <td>status</td>
      <td>String</td>
      <td>Enum: ['Pending', 'In Progress', 'Completed']</td>
      <td>Workflow stage (default: 'Pending')</td>
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
      <td>Task category classification</td>
    </tr>
    <tr>
      <td>dueDate</td>
      <td>Date</td>
      <td>Optional</td>
      <td>Submission deadline date</td>
    </tr>
    <tr>
      <td>user</td>
      <td>ObjectId</td>
      <td>Required, Ref: 'User'</td>
      <td>Foreign key referencing user who owns task</td>
    </tr>
  </table>

  <!-- ==================== CHAPTER 4 ==================== -->
  <h1 class="chapter">4. RESTful API Endpoints</h1>

  <p>
    The REST API is structured with clear URL patterns. Protected routes require <code>Authorization: Bearer &lt;token&gt;</code>.
  </p>

  <table class="data-table">
    <tr>
      <th>Method</th>
      <th>Route</th>
      <th>Access</th>
      <th>Function Description</th>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/register</td>
      <td>Public</td>
      <td>Registers user; hashes password; returns signed JWT</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/auth/login</td>
      <td>Public</td>
      <td>Validates credentials; returns signed JWT on success</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/auth/me</td>
      <td>Protected</td>
      <td>Fetches currently logged-in user profile</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/tasks</td>
      <td>Protected</td>
      <td><strong>READ:</strong> Retrieves tasks filtered by status, priority, or search</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/tasks</td>
      <td>Protected</td>
      <td><strong>CREATE:</strong> Inserts new task linked to logged-in user ID</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/tasks/stats</td>
      <td>Protected</td>
      <td>Returns total, completed, pending counts and completion percentage</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/tasks/:id</td>
      <td>Protected</td>
      <td><strong>READ:</strong> Retrieves single task by ID with ownership verification</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>/api/tasks/:id</td>
      <td>Protected</td>
      <td><strong>UPDATE:</strong> Updates task status, priority, or title</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/api/tasks/:id</td>
      <td>Protected</td>
      <td><strong>DELETE:</strong> Removes task permanently from MongoDB</td>
    </tr>
  </table>

  <div class="page-break"></div>

  <!-- ==================== CHAPTER 5 ==================== -->
  <h1 class="chapter" style="margin-top: 0;">5. CRUD Execution &amp; Output Screenshots</h1>

  <p class="no-indent">
    The following verified figures illustrate each operational phase captured from the live deployed application at <code>https://taskpulse-mern-fullstack.vercel.app</code>:
  </p>

  <h2 class="section">5.1 Figure 1: User Login Screen (/login)</h2>
  <p class="no-indent">Demonstrates the login interface with email, password, and instant demo test buttons.</p>
  <div class="fig-container">
    <img src="${fig1}" alt="Figure 5.1: User Login Screen">
    <div class="fig-title">Figure 5.1: User Authentication Portal (/login) with JWT Verification</div>
  </div>

  <h2 class="section">5.2 Figure 2: User Registration Screen (/register)</h2>
  <p class="no-indent">Demonstrates student account registration with password validation and role selection.</p>
  <div class="fig-container">
    <img src="${fig2}" alt="Figure 5.2: User Registration Screen">
    <div class="fig-title">Figure 5.2: User Registration Screen (/register) with Role Selection</div>
  </div>

  <div class="page-break"></div>

  <h2 class="section" style="margin-top: 0;">5.3 Figure 3: Main Dashboard Screen (/dashboard)</h2>
  <p class="no-indent">Displays live summary metrics from MongoDB Atlas (Total, Completed, In Progress, Pending) and progress bar.</p>
  <div class="fig-container">
    <img src="${fig3}" alt="Figure 5.3: Main Dashboard Screen">
    <div class="fig-title">Figure 5.3: Student Dashboard Displaying Real-Time Metrics from MongoDB Atlas</div>
  </div>

  <h2 class="section">5.4 Figure 4: CREATE Operation — Adding a New Task</h2>
  <p class="no-indent">Shows form completion to insert a new academic assignment into MongoDB Atlas with priority tags.</p>
  <div class="fig-container">
    <img src="${fig4}" alt="Figure 5.4: CREATE Operation">
    <div class="fig-title">Figure 5.4: CREATE Operation — Submitting New Task Details (/create-task)</div>
  </div>

  <div class="page-break"></div>

  <h2 class="section" style="margin-top: 0;">5.5 Figure 5: READ Operation — Task List with Real-Time Filtering</h2>
  <p class="no-indent">Shows the task list filtered dynamically by keyword ("Full Stack") with urgency badges.</p>
  <div class="fig-container">
    <img src="${fig5}" alt="Figure 5.5: READ Operation">
    <div class="fig-title">Figure 5.5: READ Operation — Retrieving and Filtering Tasks by Keyword and Status</div>
  </div>

  <h2 class="section">5.6 Figure 6: UPDATE Operation — Modifying Task Status</h2>
  <p class="no-indent">Demonstrates updating task attributes and advancing status to "Completed" on MongoDB Atlas.</p>
  <div class="fig-container">
    <img src="${fig6}" alt="Figure 5.6: UPDATE Operation">
    <div class="fig-title">Figure 5.6: UPDATE Operation — Editing Task Attributes and Changing Status</div>
  </div>

  <div class="page-break"></div>

  <h2 class="section" style="margin-top: 0;">5.7 Figure 7: DELETE Operation — Removal with Confirmation Modal</h2>
  <p class="no-indent">Shows the active modal prompt requiring confirmation before permanently deleting from MongoDB Atlas.</p>
  <div class="fig-container">
    <img src="${fig7}" alt="Figure 5.7: DELETE Operation">
    <div class="fig-title">Figure 5.7: DELETE Operation — Confirmation Dialog Removing Record from Database</div>
  </div>

  <h2 class="section">5.8 Figure 8: Real-Time Analytics &amp; Productivity Breakdown</h2>
  <p class="no-indent">Displays aggregated distribution charts categorized by workflow stage and priority urgency.</p>
  <div class="fig-container">
    <img src="${fig8}" alt="Figure 5.8: Analytics Breakdown">
    <div class="fig-title">Figure 5.8: Analytics Breakdown Screen (/analytics) with Aggregated MongoDB Metrics</div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== CHAPTER 6 ==================== -->
  <h1 class="chapter" style="margin-top: 0;">6. Complete Source Code Implementation</h1>

  <h2 class="section">6.1 Express Server Entrypoint (server/server.js)</h2>
  <div class="code-box">${escapeHtml(codeServer)}</div>

  <h2 class="section">6.2 MongoDB Connection Module (server/config/db.js)</h2>
  <div class="code-box">${escapeHtml(codeDb)}</div>

  <h2 class="section">6.3 User Mongoose Model (server/models/User.js)</h2>
  <div class="code-box">${escapeHtml(codeUser)}</div>

  <h2 class="section">6.4 Task Mongoose Model (server/models/Task.js)</h2>
  <div class="code-box">${escapeHtml(codeTask)}</div>

  <h2 class="section">6.5 Authentication Controller (server/controllers/authController.js)</h2>
  <div class="code-box">${escapeHtml(codeAuthCtrl)}</div>

  <h2 class="section">6.6 Task CRUD Controller (server/controllers/taskController.js)</h2>
  <div class="code-box">${escapeHtml(codeTaskCtrl)}</div>

  <h2 class="section">6.7 JWT Authentication Middleware (server/middleware/authMiddleware.js)</h2>
  <div class="code-box">${escapeHtml(codeAuthMiddleware)}</div>

  <h2 class="section">6.8 Axios Client with Bearer Token Interceptor (client/src/api/axios.js)</h2>
  <div class="code-box">${escapeHtml(codeAxios)}</div>

  <h2 class="section">6.9 Authentication Context API (client/src/context/AuthContext.jsx)</h2>
  <div class="code-box">${escapeHtml(codeAuthContext)}</div>

  <h2 class="section">6.10 Task CRUD Context API (client/src/context/TaskContext.jsx)</h2>
  <div class="code-box">${escapeHtml(codeTaskContext)}</div>

  <h2 class="section">6.11 Protected Route Component (client/src/components/ProtectedRoute.jsx)</h2>
  <div class="code-box">${escapeHtml(codeProtected)}</div>

  <h2 class="section">6.12 Main React Application Layout (client/src/App.jsx)</h2>
  <div class="code-box">${escapeHtml(codeApp)}</div>

  <!-- ==================== CHAPTER 7 ==================== -->
  <h1 class="chapter">7. Conclusion</h1>
  <p>
    The <strong>TaskPulse</strong> project successfully demonstrates the design and deployment of a complete MERN stack application meeting all criteria specified for BCA Semester V Assignment II (Course 24CA3511). The system incorporates a robust Node.js/Express REST API, cloud persistence on MongoDB Atlas, secure JWT authentication, and a responsive React frontend utilizing functional components, React Router v6, and the Context API.
  </p>
  <p>
    The system is fully operational and hosted in production at <code>https://taskpulse-mern-fullstack.vercel.app</code> with continuous delivery linked to the GitHub repository at <code>https://github.com/Thouseef68/taskpulse-mern-fullstack</code>.
  </p>

</body>
</html>
`;

(async () => {
  console.log('Compiling academic PDF report without viva questions and without empty pages...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'load' });

  const projectPdfPath = path.join(__dirname, '../TaskPulse_MERN_Project_Report_Thouseef_F.pdf');
  const desktopPdfPath = 'C:\\Users\\thous\\Desktop\\TaskPulse_MERN_Project_Report_Thouseef_F.pdf';

  await page.pdf({
    path: projectPdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="font-size: 8pt; font-family: \'Times New Roman\', serif; width: 100%; text-align: center; color: #666; padding-bottom: 4mm;">Dayananda Sagar University • School of Computer Applications | Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
    margin: {
      top: '16mm',
      bottom: '16mm',
      left: '16mm',
      right: '16mm',
    },
  });

  fs.copyFileSync(projectPdfPath, desktopPdfPath);

  console.log('✅ PDF successfully regenerated!');
  console.log('Project Path:', projectPdfPath);
  console.log('Desktop Path:', desktopPdfPath);

  await browser.close();
})();
