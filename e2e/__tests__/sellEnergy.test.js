import config from '../config';
import factory from '../page_objects';

const { timeout, credentials } = config;
let pageFactory;

describe('Walk through show sell energy page', () => {
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
        'User can open show transaction page after success login',
        async () => {
            const sellEnergyPage = await pageFactory.createSellEnergyPage();
            await sellEnergyPage.open();
        },
        timeout
    );

    test(
        'User can back to overview page through breadcrumbs',
        async () => {
            const sellEnergyPage = await pageFactory.createSellEnergyPage();
            await sellEnergyPage.open();
            await sellEnergyPage.clickOnLevelUpInBreadcrumbs();
        },
        timeout
    );
});
