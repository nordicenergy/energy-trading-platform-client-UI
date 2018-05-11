import puppeteer from 'puppeteer';

import createLoginPage from './login';
import createOverviewPage from './overview';

export const APP_URL = 'http://localhost:3001';
export const WINDOW_WIDTH = 1280;
export const WINDOW_HEIGHT = 762;
export const TIMEOUT = 16000;

let browser;

async function factory() {
    const options = { url: APP_URL };
    const browserPageInstance = await initBrowserPage();

    return {
        createLoginPage: createLoginPage.bind(null, browserPageInstance, options),
        createOverviewPage: createOverviewPage.bind(null, browserPageInstance, options),
        destruct: () => browser.close()
    };
}

async function initBrowserPage() {
    browser = await puppeteer.launch({
        headless: true,
        slowMo: 80,
        args: [`--window-size=${WINDOW_WIDTH},${WINDOW_HEIGHT}`]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: WINDOW_WIDTH, height: WINDOW_HEIGHT });

    return page;
}

export default factory;
