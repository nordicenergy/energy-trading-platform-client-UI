import createLoginPage from './login';

async function createOverviewPage(browserPage, options) {
    return {
        async open() {
            await browserPage.goto(`${options.url}/`);
            await browserPage.waitForSelector('.overview-page table td');
            return this;
        },
        async clickMoreOnRecentTransactions() {
            await browserPage.click('.overview-content-container button');
            await browserPage.waitForSelector('.wattcoin-page table td');
            return {}; // TODO TBD: return wattcoin page object
        },
        async clickMyProducer() {
            await browserPage.click('.navigation-cards .nav-card-container:first-child');
            await browserPage.waitForSelector('.my-producer-page');
            return {}; // TODO TBD: return my producer page object
        },
        async clickBuyEnergy() {
            await browserPage.click('.navigation-cards .nav-card-container:nth-child(0n+2)');
            await browserPage.waitForSelector('.buy-energy-page .producer-card-price');
            return {}; // TODO TBD: return buy energy page object
        },
        async clickSellEnergy() {
            await browserPage.click('.navigation-cards .nav-card-container:last-child');
            await browserPage.waitForSelector('.sell-energy-page');
            return {}; // TODO TBD: return sell energy page object
        },
        async logout() {
            await browserPage.click("button[aria-label='Logout']");
            await browserPage.waitForSelector('.confirm-dialog-actions');
            await browserPage.click('.confirm-dialog-actions button:first-child');
            await browserPage.waitForSelector('.login-container');
            return createLoginPage(browserPage, options);
        }
    };
}

export default createOverviewPage;
