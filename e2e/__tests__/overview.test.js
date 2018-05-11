import factory, { TIMEOUT } from '../page_objects';

let overviewPage, pageFactory;

describe('Work with overview page', () => {
    beforeAll(async () => {
        pageFactory = await factory();
    });

    afterAll(() => {
        pageFactory.destruct();
    });

    test(
        'User can open overview page after success login',
        async () => {
            const loginPage = await pageFactory.createLoginPage();
            await loginPage.open();
            overviewPage = await loginPage.login('powerclouduser', 'powercloudpass');
        },
        TIMEOUT
    );

    test(
        'User can open wattcoin page for more details about recent transactions',
        async () => {
            await overviewPage.open();
            await overviewPage.clickMoreOnRecentTransactions();
        },
        TIMEOUT
    );

    test(
        'User can check information about his energy producer',
        async () => {
            await overviewPage.open();
            await overviewPage.clickMyProducer();
        },
        TIMEOUT
    );

    test(
        'User can buy energy',
        async () => {
            await overviewPage.open();
            await overviewPage.clickBuyEnergy();
        },
        TIMEOUT
    );

    test(
        'User can sell energy',
        async () => {
            await overviewPage.open();
            await overviewPage.clickSellEnergy();
        },
        TIMEOUT
    );
});
