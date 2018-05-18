import AbstractPageObject from './common/abstract';
import { cardNavigationMixin } from './common/mixins';

const BasePage = cardNavigationMixin(AbstractPageObject);

export class TradingPage extends BasePage {
    async open() {
        await this.page.goto(`${this.options.url}/trading`);
        await this.page.waitForSelector('.trading-page svg');
        return this;
    }
}

async function createTradingPage(browserPage, options) {
    return new TradingPage(browserPage, options);
}

export default createTradingPage;
