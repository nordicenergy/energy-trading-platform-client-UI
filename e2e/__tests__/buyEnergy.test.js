import config from '../config';
import factory from '../page_objects';

const { timeout, credentials } = config;
let buyEnergyPage, pageFactory;

describe('Walk through buy energy page', () => {
    beforeAll(async () => {
        pageFactory = await factory();
    });

    afterAll(() => {
        pageFactory.destruct();
    });

    test(
        'User can open show buy energy page after success login',
        async () => {
            const loginPage = await pageFactory.createLoginPage();
            await loginPage.open();
            await loginPage.login(credentials.username, credentials.password);
            buyEnergyPage = await pageFactory.createBuyEnergyPage();
            await buyEnergyPage.open();
        },
        timeout
    );

    test(
        'User can back to overview page through breadcrumbs',
        async () => {
            await buyEnergyPage.open();
            await buyEnergyPage.clickOnLevelUpInBreadcrumbs();
        },
        timeout
    );

    test(
        'User click on first producer in list and open producer page, then back to buy energy',
        async () => {
            await buyEnergyPage.open();

            let producerPage = await buyEnergyPage.openFirstProducer();
            buyEnergyPage = await producerPage.clickOnLevelUpInBreadcrumbs();

            producerPage = await buyEnergyPage.openFirstProducer();
            await producerPage.openProducerList();
        },
        timeout
    );
});
