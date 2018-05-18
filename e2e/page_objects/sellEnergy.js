import AbstractPageObject from './common/abstract';
import createOverviewPage from './overview';

export class SellEnergyPage extends AbstractPageObject {
    async open() {
        await this.page.goto(`${this.options.url}/sell_energy`);
        await this.page.waitForSelector('.sell-energy-page .offer-card .offer-card-header');
        return this;
    }

    async clickOnLevelUpInBreadcrumbs() {
        const viewport = await this.page.viewport();
        const breadcrumbsSelector = viewport.isMobile
            ? 'a.back-link'
            : '.breadcrumbs .breadcrumb-item:first-child a.icon-breadcrumb';

        await this.page.waitForSelector(breadcrumbsSelector);
        await this.page.click(breadcrumbsSelector);
        await this.page.waitForSelector('.overview-page');
        return createOverviewPage(this.page, this.options);
    }
}

async function createSellEnergyPage(browserPage, options) {
    return new SellEnergyPage(browserPage, options);
}

export default createSellEnergyPage;
