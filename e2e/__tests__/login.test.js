import config from '../config';
import factory from '../page_objects';

const { timeout, credentials } = config;
let loginPage, overviewPage, pageFactory;

describe('Sign-in / login app processes', () => {
    beforeAll(async () => {
        const pageFactory = await factory();
        loginPage = await pageFactory.createLoginPage();
    });

    afterAll(() => {
        pageFactory.destruct();
    });

    test(
        'User can login into the app',
        async () => {
            await loginPage.open();
            overviewPage = await loginPage.login(credentials.username, credentials.password);
        },
        timeout
    );

    test(
        'User can logout from the app',
        async () => {
            await overviewPage.open();
            await overviewPage.logout();
        },
        timeout
    );

    test(
        'User can navigate to restore password page',
        async () => {
            await loginPage.open();
            await loginPage.clickForgotPassword();
        },
        timeout
    );
});
