import config from '../config';
import factory from '../page_objects';

const { timeout, credentials } = config;
let directTradingPage, pageFactory;

describe('Walk through direct trading page', () => {
    beforeAll(async () => {
        pageFactory = await factory();
    });

    afterAll(() => {
        pageFactory.destruct();
    });

    test(
        'User can open show transaction page after success login',
        async () => {
            const loginPage = await pageFactory.createLoginPage();
            await loginPage.open();
            await loginPage.login(credentials.username, credentials.password);
            directTradingPage = await pageFactory.createDirectTradingPage();
            await directTradingPage.open();
        },
        timeout
    );
});
