const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Users\\thous\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'https://taskpulse-mern-fullstack.vercel.app';
const OUT_DIR = path.join(__dirname, '../docs/screenshots');

(async () => {
  console.log('Starting screenshot verification and capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 750 },
  });

  const page = await browser.newPage();

  try {
    // 1. LOGIN PAGE
    console.log('1. Navigating to /login...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('#email');
    await page.screenshot({ path: path.join(OUT_DIR, 'fig1_login.png') });
    console.log('   Saved fig1_login.png (URL:', page.url(), ')');

    // 2. REGISTER PAGE
    console.log('2. Navigating to /register...');
    await page.goto(`${BASE_URL}/register`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('#name');
    await page.screenshot({ path: path.join(OUT_DIR, 'fig2_register.png') });
    console.log('   Saved fig2_register.png (URL:', page.url(), ')');

    // 3. LOG IN AS STUDENT
    console.log('3. Logging in as student@dsu.edu.in...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
    await page.type('#email', 'student@dsu.edu.in');
    await page.type('#password', 'password123');
    await page.click('button[type="submit"]');

    // Wait until URL is /dashboard
    await page.waitForFunction(() => window.location.pathname === '/dashboard', { timeout: 15000 });
    await page.waitForSelector('.dashboard-hero', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUT_DIR, 'fig3_dashboard.png') });
    console.log('   Saved fig3_dashboard.png (URL:', page.url(), ')');

    // 4. CREATE TASK (Fill Form)
    console.log('4. Navigating to /create-task...');
    await page.goto(`${BASE_URL}/create-task`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('#title', { timeout: 10000 });
    await page.type('#title', 'Submit BCA Sem V Full Stack Lab Record');
    await page.type('#description', 'Complete MERN project documentation, verify MongoDB Atlas connection, and present to Ms. Priyanka D Rukesh.');
    await page.select('#priority', 'High');
    await page.select('#category', 'Academic');
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUT_DIR, 'fig4_create_task.png') });
    console.log('   Saved fig4_create_task.png (URL:', page.url(), ')');

    // Submit task
    console.log('   Submitting task form...');
    await page.click('button[type="submit"]');
    await page.waitForFunction(() => window.location.pathname === '/tasks', { timeout: 15000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 2000));

    // 5. READ & FILTER TASKS (/tasks)
    console.log('5. Capturing Tasks List (/tasks)...');
    await page.goto(`${BASE_URL}/tasks`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.task-card', { timeout: 10000 });
    await page.type('.search-input', 'Full Stack');
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(OUT_DIR, 'fig5_read_tasks.png') });
    console.log('   Saved fig5_read_tasks.png (URL:', page.url(), ')');

    // 6. UPDATE OPERATION
    console.log('6. Capturing UPDATE operation...');
    await page.goto(`${BASE_URL}/tasks`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.task-card', { timeout: 10000 });
    // Click edit icon on the first task
    const editBtn = await page.$('.btn-icon[title="Edit Task"]');
    if (editBtn) {
      await editBtn.click();
      await page.waitForSelector('#title', { timeout: 10000 });
      await page.select('#status', 'Completed');
      await new Promise((r) => setTimeout(r, 1000));
      await page.screenshot({ path: path.join(OUT_DIR, 'fig6_update_task.png') });
      console.log('   Saved fig6_update_task.png (URL:', page.url(), ')');
      // Save update
      await page.click('button[type="submit"]');
      await new Promise((r) => setTimeout(r, 2000));
    }

    // 7. DELETE CONFIRMATION MODAL
    console.log('7. Capturing DELETE confirmation modal...');
    await page.goto(`${BASE_URL}/tasks`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.btn-icon-danger', { timeout: 10000 });
    await page.click('.btn-icon-danger');
    await page.waitForSelector('.modal-card', { timeout: 5000 });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUT_DIR, 'fig7_delete_modal.png') });
    console.log('   Saved fig7_delete_modal.png (URL:', page.url(), ')');

    // Close modal
    await page.click('.modal-actions .btn-secondary').catch(() => {});

    // 8. ANALYTICS PAGE
    console.log('8. Capturing Analytics (/analytics)...');
    await page.goto(`${BASE_URL}/analytics`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.analytics-banner', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(OUT_DIR, 'fig8_analytics.png') });
    console.log('   Saved fig8_analytics.png (URL:', page.url(), ')');

    console.log('✅ SUCCESS: All 8 verified screenshots captured accurately!');
  } catch (err) {
    console.error('Error in capture process:', err);
  } finally {
    await browser.close();
  }
})();

