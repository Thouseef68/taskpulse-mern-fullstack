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
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
    await page.type('#email', 'student@dsu.edu.in');
    await page.type('#password', 'password123');
    await page.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 2000));

    // 2. Go to /tasks
    await page.goto(`${BASE_URL}/tasks`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1500));

    // UPDATE: Advance status on first task
    console.log('Capturing update...');
    const toggleButtons = await page.$$('.btn-toggle-status');
    if (toggleButtons.length > 0) {
      await toggleButtons[0].click();
      await new Promise((r) => setTimeout(r, 1500));
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_update_operation.png') });

    // DELETE: Click delete icon to trigger modal
    console.log('Capturing delete modal...');
    const deleteButtons = await page.$$('.btn-icon-danger');
    if (deleteButtons.length > 0) {
      await deleteButtons[0].click();
      await new Promise((r) => setTimeout(r, 1000));
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_delete_operation.png') });

    console.log('Done capturing update and delete!');
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();
