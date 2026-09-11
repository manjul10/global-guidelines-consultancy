const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const OUTPUT_DIR = path.join(__dirname, '../public/social');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    if (!url || !url.startsWith('http')) return resolve(null);
    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' } }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(destPath));
        });
      } else {
        file.close();
        fs.unlink(destPath, () => {});
        resolve(null);
      }
    }).on('error', () => {
      file.close();
      fs.unlink(destPath, () => {});
      resolve(null);
    });
  });
}

async function scrapeInstagram(browser) {
  console.log('--- Scraping Instagram: https://www.instagram.com/globalguidelines/ ---');
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  try {
    await page.goto('https://www.instagram.com/globalguidelines/', { waitUntil: 'networkidle', timeout: 35000 });
    await page.waitForTimeout(4000);

    // Try closing login banner / cookies
    try {
      const closeBtn = await page.$('svg[aria-label="Close"], button:has-text("Not now"), button:has-text("Decline optional cookies")');
      if (closeBtn) await closeBtn.click();
    } catch (e) {}

    await page.screenshot({ path: path.join(OUTPUT_DIR, 'instagram-page-screenshot.png'), fullPage: false });
    console.log('Saved instagram-page-screenshot.png');

    const imgElements = await page.$$eval('img', (imgs) => {
      return imgs.map((img) => ({
        src: img.src,
        alt: img.alt || ''
      })).filter((i) => i.src && i.src.includes('http') && !i.src.includes('data:'));
    });

    console.log(`Found ${imgElements.length} images on Instagram page.`);

    const textContent = await page.evaluate(() => {
      return {
        title: document.title,
        header: document.querySelector('header')?.innerText || '',
        bodySnippet: document.body?.innerText?.slice(0, 15000) || ''
      };
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, 'instagram-data.json'), JSON.stringify({ textContent, imgElements }, null, 2));

    let count = 0;
    for (let i = 0; i < imgElements.length && count < 15; i++) {
      const item = imgElements[i];
      if (item.src.includes('fbcdn.net') || item.src.includes('cdninstagram.com')) {
        const dest = path.join(OUTPUT_DIR, `instagram-photo-${count + 1}.jpg`);
        const saved = await downloadImage(item.src, dest);
        if (saved) {
          console.log(`Downloaded Instagram image ${count + 1}`);
          count++;
        }
      }
    }
  } catch (err) {
    console.error('Instagram scrape error:', err.message);
  } finally {
    await context.close();
  }
}

async function scrapeFacebook(browser) {
  console.log('--- Scraping Facebook: https://www.facebook.com/globalguidelinesnepal ---');
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 1000 }
  });
  const page = await context.newPage();

  try {
    await page.goto('https://www.facebook.com/globalguidelinesnepal', { waitUntil: 'networkidle', timeout: 35000 });
    await page.waitForTimeout(4000);

    // Try closing login banners / cookie banners
    try {
      const closeBtn = await page.$('div[aria-label="Close"], [aria-label="Decline optional cookies"], [data-testid="cookie-policy-manage-dialog-accept-button"]');
      if (closeBtn) await closeBtn.click();
    } catch (e) {}

    await page.screenshot({ path: path.join(OUTPUT_DIR, 'facebook-page-screenshot.png'), fullPage: false });
    console.log('Saved facebook-page-screenshot.png');

    const imgElements = await page.$$eval('img', (imgs) => {
      return imgs.map((img) => ({
        src: img.src,
        alt: img.alt || ''
      })).filter((i) => i.src && i.src.includes('http') && !i.src.includes('data:'));
    });

    console.log(`Found ${imgElements.length} images on Facebook page.`);

    const textContent = await page.evaluate(() => {
      return {
        title: document.title,
        bodySnippet: document.body?.innerText?.slice(0, 20000) || ''
      };
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, 'facebook-data.json'), JSON.stringify({ textContent, imgElements }, null, 2));

    let count = 0;
    for (let i = 0; i < imgElements.length && count < 15; i++) {
      const item = imgElements[i];
      if (item.src.includes('fbcdn.net') && !item.src.includes('rsrc.php')) {
        const dest = path.join(OUTPUT_DIR, `facebook-photo-${count + 1}.jpg`);
        const saved = await downloadImage(item.src, dest);
        if (saved) {
          console.log(`Downloaded Facebook image ${count + 1}`);
          count++;
        }
      }
    }
  } catch (err) {
    console.error('Facebook scrape error:', err.message);
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    await scrapeInstagram(browser);
    await scrapeFacebook(browser);
  } finally {
    await browser.close();
  }

  console.log('All scraping completed!');
}

main().catch(console.error);
