const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Users\\thous\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'https://taskpulse-mern-fullstack.vercel.app';
const SCREENSHOT_DIR = path.join(__dirname, '../docs/screenshots');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 750 },
  });

  const page = await browser.newPage();

  try {
    // 1. Login
    console.log('Capturing 01_login...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_login_screen.png') });

    // Perform Login
    await page.type('#email', 'student@dsu.edu.in');
    await page.type('#password', 'password123');
    await page.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 2000));

    // 2. Dashboard
    console.log('Capturing 02_dashboard...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_dashboard_screen.png') });

    // 3. CREATE OPERATION: Fill form with sample assignment task
    console.log('Capturing 03_create_operation...');
    await page.goto(`${BASE_URL}/create-task`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('form.task-form');
    await page.type('#title', 'Submit Full Stack Assignment II to Ms. Priyanka D Rukesh');
    await page.type('#description', 'Complete MERN project documentation, push to GitHub, and deploy on Vercel with MongoDB Atlas cloud database.');
    await page.select('#status', 'Pending');
    await page.select('#priority', 'High');
    await page.select('#category', 'Assignment');
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_create_operation.png') });

    // Submit task
    await page.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 2000));

    // 4. READ & FILTER OPERATION: Search for "Assignment"
    console.log('Capturing 04_read_operation...');
    await page.goto(`${BASE_URL}/tasks`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.tasks-grid');
    await page.type('.search-input', 'Assignment');
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_read_operation.png') });

    // 5. UPDATE OPERATION: Refresh tasks page, click toggle status button
    console.log('Capturing 05_update_operation...');
    await page.goto(`${BASE_URL}/tasks`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.tasks-grid');
    const toggleButtons = await page.$$('.btn-toggle-status');
    if (toggleButtons.length > 0) {
      await toggleButtons[0].click();
      await new Promise((r) => setTimeout(r, 1800));
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_update_operation.png') });

    // 6. DELETE OPERATION: Click trash icon to show confirmation modal
    console.log('Capturing 06_delete_operation...');
    const deleteButtons = await page.$$('.btn-icon-danger');
    if (deleteButtons.length > 0) {
      await deleteButtons[0].click();
      await new Promise((r) => setTimeout(r, 1000));
      await page.waitForSelector('.modal-card').catch(() => {});
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_delete_operation.png') });

    // Close modal
    const cancelBtn = await page.$('.modal-actions .btn-secondary');
    if (cancelBtn) await cancelBtn.click();
    await new Promise((r) => setTimeout(r, 500));

    // 7. Analytics
    console.log('Capturing 07_analytics...');
    await page.goto(`${BASE_URL}/analytics`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_analytics_screen.png') });

    console.log('✅ ALL CRUD Screenshots Captured Successfully!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();
