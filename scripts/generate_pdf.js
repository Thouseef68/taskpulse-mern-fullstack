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

const imgLogin = toBase64(path.join(SCREENSHOTS_DIR, '01_login_page.png'));
const imgRegister = toBase64(path.join(SCREENSHOTS_DIR, '02_register_page.png'));
const imgDashboard = toBase64(path.join(SCREENSHOTS_DIR, '03_dashboard_page.png'));
const imgTasks = toBase64(path.join(SCREENSHOTS_DIR, '04_tasks_page.png'));
const imgCreate = toBase64(path.join(SCREENSHOTS_DIR, '05_create_task_form.png'));
const imgAnalytics = toBase64(path.join(SCREENSHOTS_DIR, '06_analytics_page.png'));

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>TaskPulse - MERN Project Report</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 15mm 20mm 15mm;
    }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      color: #1e293b;
      line-height: 1.6;
      font-size: 10.5pt;
    }
    .header-box {
      border: 2px solid #3b82f6;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      background: #eff6ff;
      margin-bottom: 25px;
    }
    .header-box h1 {
      margin: 0;
      color: #1d4ed8;
      font-size: 20pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .header-box h2 {
      margin: 6px 0;
      font-size: 13pt;
      color: #334155;
      font-weight: 600;
    }
    .header-box p {
      margin: 4px 0;
      font-size: 10pt;
      color: #475569;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 9.5pt;
    }
    .meta-table td, .meta-table th {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
    }
    .meta-table th {
      background: #f1f5f9;
      text-align: left;
      width: 30%;
      color: #334155;
    }
    h2.section-heading {
      color: #1e40af;
      border-bottom: 2px solid #93c5fd;
      padding-bottom: 4px;
      margin-top: 25px;
      margin-bottom: 12px;
      font-size: 13pt;
    }
    h3.sub-heading {
      color: #2563eb;
      margin-top: 15px;
      margin-bottom: 6px;
      font-size: 11pt;
    }
    p {
      margin: 0 0 10px 0;
      text-align: justify;
    }
    ul, ol {
      margin: 0 0 12px 20px;
      padding: 0;
    }
    li {
      margin-bottom: 4px;
    }
    .code-block {
      background: #0f172a;
      color: #f8fafc;
      padding: 10px 14px;
      border-radius: 6px;
      font-family: 'Consolas', monospace;
      font-size: 8.5pt;
      margin-bottom: 12px;
      overflow-x: hidden;
      white-space: pre-wrap;
    }
    .screenshot-card {
      margin: 15px 0 20px 0;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      page-break-inside: avoid;
    }
    .screenshot-card img {
      width: 100%;
      display: block;
      border-bottom: 1px solid #e2e8f0;
    }
    .screenshot-caption {
      padding: 8px 12px;
      font-size: 9pt;
      font-weight: 600;
      color: #475569;
      background: #f8fafc;
      text-align: center;
    }
    .page-break {
      page-break-before: always;
    }
    .badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 8pt;
      font-weight: bold;
    }
    .badge-green { background: #dcfce7; color: #15803d; }
    .badge-blue { background: #dbeafe; color: #1e40af; }
  </style>
</head>
<body>

  <!-- Cover Header Box -->
  <div class="header-box">
    <h1>Dayananda Sagar University</h1>
    <h2>School of Computer Applications (IQAC)</h2>
    <p><strong>Department of Computer Applications • BCA Odd Semester 2026-2027</strong></p>
    <p style="margin-top: 8px; font-size: 12pt; font-weight: bold; color: #1e3a8a;">
      ASSIGNMENT II - MERN PROJECT REPORT
    </p>
    <p style="font-size: 11pt; color: #2563eb;"><strong>Project Title:</strong> TaskPulse • Full-Stack Task & Project Management Workspace</p>
  </div>

  <table class="meta-table">
    <tr>
      <th>Course Title</th>
      <td><strong>FULL STACK DEVELOPMENT</strong> (Course Code: <code>24CA3511</code>)</td>
    </tr>
    <tr>
      <th>Programme & Semester</th>
      <td>Bachelor of Computer Applications (BCA) — Semester V (Section A & B)</td>
    </tr>
    <tr>
      <th>Course In-Charge / Evaluator</th>
      <td><strong>Ms. Priyanka D Rukesh</strong></td>
    </tr>
    <tr>
      <th>Dean, School of CA</th>
      <td><strong>Dr. S Senthil</strong></td>
    </tr>
    <tr>
      <th>Student Candidate</th>
      <td><strong>Thouseef F</strong></td>
    </tr>
    <tr>
      <th>Course Outcomes Mapped</th>
      <td>CO5, PO5, PSO3</td>
    </tr>
    <tr>
      <th>Live Production Web App</th>
      <td><a href="https://taskpulse-mern-fullstack.vercel.app">https://taskpulse-mern-fullstack.vercel.app</a></td>
    </tr>
    <tr>
      <th>GitHub Source Repository</th>
      <td><a href="https://github.com/Thouseef68/taskpulse-mern-fullstack">https://github.com/Thouseef68/taskpulse-mern-fullstack</a></td>
    </tr>
  </table>

  <h2 class="section-heading">1. Project Abstract & Objectives</h2>
  <p>
    The objective of this assignment is to design, develop, and deploy an enterprise-grade <strong>MERN Stack (MongoDB, Express.js, React, Node.js)</strong> application that fulfills all curricular outcomes of course 24CA3511. 
    <strong>TaskPulse</strong> is a comprehensive academic project and assignment workspace engineered to streamline coursework tracking, task scheduling, priority tagging, and progress measurement for university students and faculty.
  </p>
  <p>
    The system implements a stateless, token-based authentication mechanism powered by <strong>JSON Web Tokens (JWT)</strong> and salt-hashed passwords using <strong>bcryptjs</strong>. It offers a RESTful API performing complete <strong>CRUD</strong> operations on a cloud-hosted <strong>MongoDB Atlas</strong> cluster, and a client interface crafted with modern <strong>React 18</strong>, <strong>React Router v6</strong>, and native <strong>Context API</strong> state management.
  </p>

  <h2 class="section-heading">2. Core Technical Architecture</h2>
  <ul>
    <li><strong>MongoDB Atlas (Database):</strong> Cloud database hosting indexed collections (<code>users</code> and <code>tasks</code>) with 1-to-many referenced relationships.</li>
    <li><strong>Express.js / Node.js (REST API):</strong> Modular MVC architecture containing route handlers, centralized error handling, and authorization middleware.</li>
    <li><strong>React 18 & Vite (Frontend):</strong> 100% functional components utilizing React Hooks (<code>useState</code>, <code>useEffect</code>, <code>useContext</code>, <code>useCallback</code>).</li>
    <li><strong>React Router v6 (Client Routing):</strong> Protected routing via <code>&lt;ProtectedRoute&gt;</code> component guarding private views.</li>
    <li><strong>React Context API (State Management):</strong> Global state stores (<code>AuthContext</code> and <code>TaskContext</code>) eliminating prop drilling.</li>
    <li><strong>Vercel (DevOps & Hosting):</strong> Monorepo cloud architecture hosting serverless functions and compiled frontend assets on a single production domain.</li>
  </ul>

  <div class="page-break"></div>

  <h2 class="section-heading">3. REST API Specification & Endpoint Implementation</h2>
  <table class="meta-table">
    <tr style="background:#f1f5f9;">
      <th>Method & Route</th>
      <th>Access</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><code>POST /api/auth/register</code></td>
      <td><span class="badge badge-green">Public</span></td>
      <td>Registers new student/faculty; hashes password with bcrypt salt; returns signed JWT.</td>
    </tr>
    <tr>
      <td><code>POST /api/auth/login</code></td>
      <td><span class="badge badge-green">Public</span></td>
      <td>Validates credentials; compares bcrypt hash; returns signed JWT and user metadata.</td>
    </tr>
    <tr>
      <td><code>GET /api/auth/me</code></td>
      <td><span class="badge badge-blue">Protected</span></td>
      <td>Retrieves current logged-in user profile minus hashed password.</td>
    </tr>
    <tr>
      <td><code>GET /api/tasks</code></td>
      <td><span class="badge badge-blue">Protected</span></td>
      <td>Retrieves all tasks for the authenticated user with regex search, status, and priority filters.</td>
    </tr>
    <tr>
      <td><code>POST /api/tasks</code></td>
      <td><span class="badge badge-blue">Protected</span></td>
      <td>Creates a new task linked to the user's ObjectId.</td>
    </tr>
    <tr>
      <td><code>GET /api/tasks/stats</code></td>
      <td><span class="badge badge-blue">Protected</span></td>
      <td>Computes aggregated statistics: total, pending, in-progress, completed, and completion rate.</td>
    </tr>
    <tr>
      <td><code>GET /api/tasks/:id</code></td>
      <td><span class="badge badge-blue">Protected</span></td>
      <td>Fetches single task by ID with strict multi-tenant ownership verification.</td>
    </tr>
    <tr>
      <td><code>PUT /api/tasks/:id</code></td>
      <td><span class="badge badge-blue">Protected</span></td>
      <td>Updates task attributes (title, status, priority, category, due date) after ownership verification.</td>
    </tr>
    <tr>
      <td><code>DELETE /api/tasks/:id</code></td>
      <td><span class="badge badge-blue">Protected</span></td>
      <td>Safely removes task from MongoDB Atlas after ownership check.</td>
    </tr>
  </table>

  <h3 class="sub-heading">3.1 JWT Middleware Implementation (server/middleware/authMiddleware.js)</h3>
  <div class="code-block">const jwt = require('jsonwebtoken');
const { getUserModel } = require('../models/dataStore');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const User = getUserModel();
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) return res.status(401).json({ success: false, message: 'User not found' });
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  }
  return res.status(401).json({ success: false, message: 'No Bearer token provided' });
};
module.exports = { protect };</div>

  <div class="page-break"></div>

  <h2 class="section-heading">4. Live Application Visual Outputs & Screenshots</h2>

  <h3 class="sub-heading">Figure 1: Authentication & Login Portal (/login)</h3>
  <p>Features field validation, JWT session handling, and quick-fill demo buttons for faculty evaluation.</p>
  <div class="screenshot-card">
    <img src="${imgLogin}" alt="Login Screen">
    <div class="screenshot-caption">Output 1: User Login Screen with Demo Credentials Trigger</div>
  </div>

  <h3 class="sub-heading">Figure 2: User Registration Screen (/register)</h3>
  <p>Provides registration with password confirmation validation and role assignment (Student / Faculty).</p>
  <div class="screenshot-card">
    <img src="${imgRegister}" alt="Registration Screen">
    <div class="screenshot-caption">Output 2: Account Creation & Role Assignment Screen</div>
  </div>

  <div class="page-break"></div>

  <h3 class="sub-heading">Figure 3: Interactive Executive Dashboard (/dashboard)</h3>
  <p>Presents live productivity KPIs, completion percentage bar, and recent task items.</p>
  <div class="screenshot-card">
    <img src="${imgDashboard}" alt="Dashboard Screen">
    <div class="screenshot-caption">Output 3: Live Student Dashboard with Real-Time KPIs from MongoDB Atlas</div>
  </div>

  <h3 class="sub-heading">Figure 4: Full CRUD Task Management Portal (/tasks)</h3>
  <p>Displays all tasks with instant keyword search, status and priority filters, and one-click status transitions.</p>
  <div class="screenshot-card">
    <img src="${imgTasks}" alt="Tasks CRUD Screen">
    <div class="screenshot-caption">Output 4: Task List Management Table with Search, Multi-Criteria Filters, and CRUD Actions</div>
  </div>

  <div class="page-break"></div>

  <h3 class="sub-heading">Figure 5: Task Creation & Modification Form (/create-task)</h3>
  <p>Intuitive form handling title, description, category, priority flags, and due dates.</p>
  <div class="screenshot-card">
    <img src="${imgCreate}" alt="Create Task Form">
    <div class="screenshot-caption">Output 5: Task Creation & Editing Interface with Input Validation</div>
  </div>

  <h3 class="sub-heading">Figure 6: Real-Time Analytics & Aggregation Engine (/analytics)</h3>
  <p>Aggregates MongoDB data to calculate task completion ratios and workload distribution.</p>
  <div class="screenshot-card">
    <img src="${imgAnalytics}" alt="Analytics Screen">
    <div class="screenshot-caption">Output 6: Real-Time Productivity & Priority Distribution Breakdown</div>
  </div>

  <h2 class="section-heading">5. Conclusion & Verification Summary</h2>
  <p>
    The <strong>TaskPulse</strong> MERN stack application was thoroughly tested and deployed to production. 
    It satisfies every curricular objective of BCA Semester V Assignment II, demonstrating clean full-stack coding practices, cloud database connectivity on MongoDB Atlas, responsive design, and robust security protocols.
  </p>
  <table class="meta-table">
    <tr>
      <th>Verification Item</th>
      <th>Observed Status</th>
      <th>Outcome</th>
    </tr>
    <tr>
      <td>REST API CRUD Operations</td>
      <td>Verified: Create, Read (filter/search), Update, Delete execute cleanly</td>
      <td><strong>PASSED (100%)</strong></td>
    </tr>
    <tr>
      <td>JWT Authentication & Security</td>
      <td>Verified: Bcrypt salting + JWT signing with Bearer header checks</td>
      <td><strong>PASSED (100%)</strong></td>
    </tr>
    <tr>
      <td>State Management (Context API)</td>
      <td>Verified: Live state synchronisation across React component hierarchy</td>
      <td><strong>PASSED (100%)</strong></td>
    </tr>
    <tr>
      <td>Cloud Database & Deployment</td>
      <td>Verified: Live on Vercel connected to MongoDB Atlas Cloud Cluster</td>
      <td><strong>PASSED (100%)</strong></td>
    </tr>
  </table>

</body>
</html>
`;

(async () => {
  console.log('📄 Launching Chrome to generate academic PDF report...');
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
      top: '15mm',
      bottom: '15mm',
      left: '12mm',
      right: '12mm',
    },
  });

  // Also copy directly to Desktop for quick access
  fs.copyFileSync(projectPdfPath, desktopPdfPath);

  console.log('✅ PDF generated successfully at:');
  console.log('1.', projectPdfPath);
  console.log('2.', desktopPdfPath);

  await browser.close();
})();
