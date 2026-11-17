const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Users\\thous\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'https://taskpulse-mern-fullstack.vercel.app';
const SCREENSHOT_DIR = path.join(__dirname, '../docs/screenshots');
const ARTIFACT_DIR = 'C:\\Users\\thous\\.gemini\\antigravity\\brain\\fae703b8-7a84-4de1-87c3-91cea65aff10';

const copyToArtifact = (filename) => {
  try {
    const src = path.join(SCREENSHOT_DIR, filename);
    const dest = path.join(ARTIFACT_DIR, filename);
    fs.copyFileSync(src, dest);
  } catch (err) {
    console.warn(`Failed to copy ${filename}:`, err.message);
  }
};

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1366, height: 768 },
  });

  const page = await browser.newPage();

  try {
    // 1. Login Page
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_login_page.png') });
    copyToArtifact('01_login_page.png');

    // 2. Register Page
    await page.goto(`${BASE_URL}/register`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_register_page.png') });
    copyToArtifact('02_register_page.png');

    // 3. Login
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
    await page.type('#email', 'student@dsu.edu.in');
    await page.type('#password', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
    await new Promise((r) => setTimeout(r, 2000));

    // 4. Dashboard
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_dashboard_page.png') });
    copyToArtifact('03_dashboard_page.png');

    // 5. Tasks Page
    await page.goto(`${BASE_URL}/tasks`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_tasks_page.png') });
    copyToArtifact('04_tasks_page.png');

    // 6. Create Task Page
    await page.goto(`${BASE_URL}/create-task`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('form.task-form', { timeout: 10000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_create_task_form.png') });
    copyToArtifact('05_create_task_form.png');

    // 7. Analytics Page
    await page.goto(`${BASE_URL}/analytics`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.analytics-grid', { timeout: 10000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_analytics_page.png') });
    copyToArtifact('06_analytics_page.png');

    console.log('✅ All 6 screenshots successfully captured and stored!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
  }
})();
