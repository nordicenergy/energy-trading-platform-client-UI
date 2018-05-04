import React from 'react';
import { Profile } from '../Profile';
import { mountWithIntl, shallowWithIntl } from '../../../services/intlTestHelper';
import * as userActionPerformers from '../../../action_performers/users';
import * as notificationsActionPerformers from '../../../action_performers/notifications';

function renderComponent(props = {}, mountFn = shallowWithIntl) {
    return mountFn(<Profile {...props} />);
}

describe('<Profile /> Container', () => {
    it(`should renders with:
        - profile form
        - title`, () => {
        const component = renderComponent();

        expect(component.find('ProfileForm')).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
        expect(component.find('h1').text()).toBe('Profile');
    });

    it('should show loader', () => {
        const component = renderComponent(
            {
                loading: true
            },
            mountWithIntl
        );

        expect(component.find('.loader-backdrop--show')).toHaveLength(1);
    });

    it('should map state properties', () => {
        const stateMock = {
            Users: {
                profile: {
                    loading: true,
                    data: { user: { foo: 'bar' } }
                }
            }
        };
        const props = Profile.mapStateToProps(stateMock);

        expect(props.loading).toEqual(stateMock.Users.profile.loading);
        expect(props.profile).toEqual(stateMock.Users.profile.data.user);
    });

    it('should validate fields', () => {
        const component = renderComponent();
        const dataMock = {
            firstName: '',
            lastName: '',
            IBAN: '',
            email: '',
            street: '',
            postcode: '',
            city: '',
            streetNumber: '',
            password: '',
            confirmNewPassword: '',
            oldPassword: 'ss'
        };
        // Disable console warning for the test.
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        jest.spyOn(userActionPerformers, 'performUpdateUserData').mockImplementation(jest.fn());

        component
            .find('ProfileForm')
            .props()
            .onSubmit(dataMock);
        expect(userActionPerformers.performUpdateUserData).not.toHaveBeenCalled();
        expect(component.state().errors).toHaveProperty('firstName');
        expect(component.state().errors).toHaveProperty('lastName');
        expect(component.state().errors).toHaveProperty('IBAN');
        expect(component.state().errors).toHaveProperty('email');
        expect(component.state().errors).toHaveProperty('street');
        expect(component.state().errors).toHaveProperty('postcode');
        expect(component.state().errors).toHaveProperty('city');
        expect(component.state().errors).toHaveProperty('streetNumber');
        expect(component.state().errors).toHaveProperty('password');
        expect(component.state().errors).toHaveProperty('confirmNewPassword');

        console.warn.mockRestore();
        userActionPerformers.performUpdateUserData.mockRestore();
    });

    it('should validate password fields', () => {
        const component = renderComponent();
        const dataMock = {
            firstName: '',
            lastName: '',
            IBAN: '',
            email: '',
            street: '',
            postcode: '',
            city: '',
            streetNumber: '',
            password: 'aa',
            confirmNewPassword: 'asd',
            oldPassword: ''
        };
        // Disable console warning for the test.
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        jest.spyOn(userActionPerformers, 'performUpdateUserData').mockImplementation(jest.fn());

        component
            .find('ProfileForm')
            .props()
            .onSubmit(dataMock);
        expect(userActionPerformers.performUpdateUserData).not.toHaveBeenCalled();
        expect(component.state().errors).toHaveProperty('confirmNewPassword');
        expect(component.state().errors).toHaveProperty('oldPassword');

        console.warn.mockRestore();
        userActionPerformers.performUpdateUserData.mockRestore();
    });

    it('should shows server error if authentication is failed', () => {
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        const component = renderComponent();

        component.setProps({
            loading: false,
            profile: null,
            error: { message: 'Error message' }
        });

        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'error',
            message: 'Error message'
        });

        notificationsActionPerformers.performPushNotification.mockRestore();
    });

    it('should calls performUpdateUserData after form was submitted', () => {
        const component = renderComponent();
        const dataMock = {
            firstName: 'fname',
            lastName: 'lname',
            IBAN: 'iban',
            email: 'ss@gmail.com',
            street: 'street',
            postcode: '111',
            city: 'city',
            streetNumber: '1',
            password: 'password',
            confirmNewPassword: 'password',
            oldPassword: 'oldPassword'
        };
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        jest.spyOn(userActionPerformers, 'performUpdateUserData').mockImplementation(() => {
            component.setProps({
                loading: true
            });
        });

        component
            .find('ProfileForm')
            .props()
            .onSubmit(dataMock);
        expect(userActionPerformers.performUpdateUserData).toHaveBeenCalledWith(dataMock);
        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'success',
            message: 'Profile successfully updated.'
        });
        userActionPerformers.performUpdateUserData.mockRestore();
    });
});
