import factory, { TIMEOUT } from '../page_objects';

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
            overviewPage = await loginPage.login('powerclouduser', 'powercloudpass');
        },
        TIMEOUT
    );

    test(
        'User can logout from the app',
        async () => {
            await overviewPage.open();
            await overviewPage.logout();
        },
        TIMEOUT
    );

    test(
        'User can navigate to restore password page',
        async () => {
            await loginPage.open();
            await loginPage.clickForgotPassword();
        },
        TIMEOUT
    );
});
