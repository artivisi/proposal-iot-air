const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Dapatkan path absolut ke file HTML
  const htmlPath = path.resolve(__dirname, '../src/mockup.html');
  
  // Buka file HTML lokal
  await page.goto(`file://${htmlPath}`);
  
  // Ambil screenshot dari elemen .window
  const elementHandle = await page.$('.window');
  if (elementHandle) {
    await elementHandle.screenshot({ path: 'proposal/assets/mockup.png' });
    console.log('Screenshot saved to proposal/assets/mockup.png');
  } else {
    console.error('Could not find the .window element to screenshot.');
  }
  
  await browser.close();
})();
