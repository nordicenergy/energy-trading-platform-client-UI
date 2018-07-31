import config from '../config';
import factory from '../page_objects';

const { timeout, credentials } = config;
let tradingPage, pageFactory;

describe('Walk through trading page', () => {
    beforeAll(async () => {
        pageFactory = await factory();
        const loginPage = await pageFactory.createLoginPage();
        await loginPage.open();
        await loginPage.login(credentials.username, credentials.password);
    }, timeout);

    afterAll(() => {
        pageFactory.destruct();
    });

    test(
        'User can open trading page after success login',
        async () => {
            const tradingPage = await pageFactory.createTradingPage();
            await tradingPage.open();
        },
        timeout
    );

    test(
        'User can check information about his energy producer',
        async () => {
            const tradingPage = await pageFactory.createTradingPage();
            await tradingPage.open();
            await tradingPage.clickMyProducer();
        },
        timeout
    );

    test(
        'User can buy energy',
        async () => {
            const tradingPage = await pageFactory.createTradingPage();
            await tradingPage.open();
            await tradingPage.clickBuyEnergy();
        },
        timeout
    );

    test(
        'User can sell energy',
        async () => {
            const tradingPage = await pageFactory.createTradingPage();
            await tradingPage.open();
            await tradingPage.clickSellEnergy();
        },
        timeout
    );
});
