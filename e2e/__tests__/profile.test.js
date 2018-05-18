import config from '../config';
import factory from '../page_objects';

const { timeout, credentials } = config;
let profilePage, pageFactory;

describe('Walk through profile page', () => {
    beforeAll(async () => {
        pageFactory = await factory();
    });

    afterAll(() => {
        pageFactory.destruct();
    });

    test(
        'User can open profile page after success login',
        async () => {
            const loginPage = await pageFactory.createLoginPage();
            await loginPage.open();
            await loginPage.login(credentials.username, credentials.password);
            profilePage = await pageFactory.createProfilePage();
            await profilePage.open();
        },
        timeout
    );

    test(
        'User can edit some form field and try to save',
        async () => {
            await profilePage.open();
            await profilePage.tryToSaveEmptyRequiredField();
        },
        timeout
    );
});
