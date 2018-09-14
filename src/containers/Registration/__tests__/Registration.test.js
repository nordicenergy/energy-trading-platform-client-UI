import React from 'react';
import { Registration } from '../Registration';
import { RegistrationForm } from '../../../components';
import { shallowWithIntl } from '../../../services/intlTestHelper';
import * as userActionPerformers from '../../../action_performers/users';
import * as appActionPerformers from '../../../action_performers/app';
import * as notificationsActionPerformers from '../../../action_performers/notifications';

const historyMock = {
    push: jest.fn()
};
const routeMock = {
    location: {
        search: '?city=Berlin&consumption='
    }
};
const routerMock = {
    history: historyMock,
    route: routeMock,
    getQueryParam: f => f
};

function renderComponent(props = {}, context = { router: routerMock }, mountFn = shallowWithIntl) {
    return mountFn(<Registration {...props} />, { context });
}

describe('<Registration /> container', () => {
    afterEach(() => {
        historyMock.push.mockClear();
    });

    it('should renders with necessary elements', () => {
        const registration = renderComponent();

        expect(registration.find('header.registration-container-header')).toHaveLength(1);
        expect(registration.find('main.registration-container-wrapper')).toHaveLength(1);
        expect(registration.find('footer.registration-container-footer')).toHaveLength(1);
        expect(registration.find('Logo')).toHaveLength(1);
        expect(registration.find('RegistrationForm')).toHaveLength(1);
    });

    it("should map state to component's properties", () => {
        const stateMock = {
            Users: {
                registration: {
                    loading: true,
                    error: 'test error',
                    data: { username: 'test' }
                }
            }
        };
        const props = Registration.mapStateToProps(stateMock);

        expect(props.loading).toEqual(stateMock.Users.registration.loading);
        expect(props.registeredUser).toEqual(stateMock.Users.registration.data);
        expect(props.error).toEqual(stateMock.Users.registration.error);
    });

    it('should call `performRegistration` when `RegistrationFrom` was submitted', () => {
        jest.spyOn(userActionPerformers, 'performRegistration').mockImplementation(jest.fn());
        const registration = renderComponent();

        registration
            .find('RegistrationForm')
            .props()
            .onSubmit({
                username: 'test',
                password: 'qwerty123',
                firstName: 'John',
                lastName: 'Doe',
                business: false,
                birthday: '1535543065',
                extraField: 'bar'
            });

        expect(userActionPerformers.performRegistration).toHaveBeenCalledWith({
            username: 'test',
            password: 'qwerty123',
            firstName: 'John',
            lastName: 'Doe',
            business: false,
            birthday: '2018-08-29'
        });
    });

    it('should show loader during `/user/create` request', () => {
        jest.spyOn(appActionPerformers, 'performSetupLoaderVisibility').mockImplementation(jest.fn());
        const registration = renderComponent();

        registration.setProps({ loading: true });
        registration.update();
        expect(appActionPerformers.performSetupLoaderVisibility).toHaveBeenCalledWith(true);

        registration.setProps({ loading: true });
        registration.update();

        registration.setProps({ loading: false });
        registration.update();
        expect(appActionPerformers.performSetupLoaderVisibility).toHaveBeenCalledWith(false);

        expect(appActionPerformers.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
    });

    it('should open login page and show notification when registration is succeed', () => {
        jest.spyOn(notificationsActionPerformers, 'performPushNotification');
        const registration = renderComponent();

        registration.setProps({ loading: true });
        registration.update();

        registration.setProps({ loading: false, registeredUser: { username: 'newuser' } });
        registration.update();

        expect(routerMock.history.push).toHaveBeenCalledWith('/login');
        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'success',
            message: expect.any(String)
        });
    });

    it('should show error when registration is failed', () => {
        jest.spyOn(notificationsActionPerformers, 'performPushNotification');
        const registration = renderComponent();

        registration.setProps({ loading: true });
        registration.update();

        registration.setProps({ loading: false, error: { message: 'test error' } });
        registration.update();

        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'error',
            message: 'test error'
        });
    });

    it('should set default values from url query to RegistrationForm', () => {
        const getQueryParam = (param) => {
            switch(param) {
                case'city': return 'Berlin';
                default: return '';
            }
        };
        const registration = renderComponent({}, { router: { ...routerMock, getQueryParam: getQueryParam } });
        const registrationForm = registration.find(RegistrationForm);

        expect(registrationForm.props().defaultValues).toEqual({
            postcode: '',
            city: 'Berlin',
            usage: ''
        });
    });
});
