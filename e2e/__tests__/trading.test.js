import config from '../config';
import factory from '../page_objects';

const { timeout, credentials } = config;
let tradingPage, pageFactory;

describe('Walk through trading page', () => {
    beforeAll(async () => {
        pageFactory = await factory();
    });

    afterAll(() => {
        pageFactory.destruct();
    });

    test(
        'User can open trading page after success login',
        async () => {
            const loginPage = await pageFactory.createLoginPage();
            await loginPage.open();
            await loginPage.login(credentials.username, credentials.password);
            tradingPage = await pageFactory.createTradingPage();
            await tradingPage.open();
        },
        timeout
    );

    test(
        'User can check information about his energy producer',
        async () => {
            await tradingPage.open();
            await tradingPage.clickMyProducer();
        },
        timeout
    );

    test(
        'User can buy energy',
        async () => {
            await tradingPage.open();
            await tradingPage.clickBuyEnergy();
        },
        timeout
    );

    test(
        'User can sell energy',
        async () => {
            await tradingPage.open();
            await tradingPage.clickSellEnergy();
        },
        timeout
    );
});
