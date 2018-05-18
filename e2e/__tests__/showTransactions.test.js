import config from '../config';
import factory from '../page_objects';

const { timeout, credentials } = config;
let showTransactionsPage, pageFactory;

describe('Walk through show transactions page', () => {
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
            showTransactionsPage = await pageFactory.createShowTransactionsPage();
            await showTransactionsPage.open();
        },
        timeout
    );

    test(
        'User can back to overview page through breadcrumbs',
        async () => {
            await showTransactionsPage.open();
            await showTransactionsPage.clickOnLevelUpInBreadcrumbs();
        },
        timeout
    );
});
