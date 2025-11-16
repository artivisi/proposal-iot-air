const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport yang cukup besar untuk memastikan semua elemen terlihat
  await page.setViewportSize({ width: 1280, height: 1024 });

  const htmlPath = path.resolve(__dirname, '../src/mockups/screens.html');
  await page.goto(`file://${htmlPath}`);

  const screens = [
    { id: '#dashboard-screen', path: 'dist/assets/mockup_dashboard.png' },
    { id: '#sensor-list-screen', path: 'dist/assets/mockup_sensor_list.png' },
    { id: '#sensor-health-screen', path: 'dist/assets/mockup_sensor_health.png' },
    { id: '#sensor-management-screen', path: 'dist/assets/mockup_sensor_management.png' }
  ];

  for (const screen of screens) {
    const elementHandle = await page.$(screen.id);
    if (elementHandle) {
      await elementHandle.screenshot({ path: screen.path });
      console.log(`Screenshot saved to ${screen.path}`);
    } else {
      console.error(`Could not find element with id ${screen.id}`);
    }
  }

  await browser.close();
})();
