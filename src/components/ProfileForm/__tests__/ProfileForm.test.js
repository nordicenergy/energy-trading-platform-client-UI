import React from 'react';
import { shallow } from 'enzyme';
import ProfileForm from '../ProfileForm';

const dummyProfile = {
    email: 'john.doe@test.com',
    firstName: 'John',
    lastName: 'Doe',
    country: 'Germany',
    postcode: '10115',
    city: 'Berlin',
    street: 'test-street',
    streetNumber: '5a',
    birthday: 1535587200,
    IBAN: 'DE89370400440532013000'
};

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<ProfileForm profile={dummyProfile} {...props} />);
}

describe('<ProfileForm /> component', () => {
    it('should renders with necessary components', () => {
        const profileForm = renderComponent();

        expect(profileForm.find('.profile-form-tab-list')).toHaveLength(1);
        expect(profileForm.find('.profile-form-tab-list > button')).toHaveLength(2);
        expect(profileForm.find('.profile-form-tab-panel')).toHaveLength(2);
        expect(profileForm.find('TextField[name="firstName"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="lastName"]')).toHaveLength(1);
        expect(profileForm.find('DateField[name="birthday"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="city"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="street"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="streetNumber"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="email"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="oldPassword"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="newPassword"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="confirmNewPassword"]')).toHaveLength(1);
        expect(profileForm.find('RadioButton[name="paymentMethod"]')).toHaveLength(2);
        expect(profileForm.find('IBANField[name="IBAN"]')).toHaveLength(1);
        expect(profileForm.find('Checkbox[name="sepaApproval"]')).toHaveLength(1);
        expect(profileForm.find('Button')).toHaveLength(1);
    });

    it('should hide payment fields when `transfer` payment method selected', () => {
        const profileForm = renderComponent();

        profileForm
            .find('RadioButton[value="transfer"]')
            .props()
            .onChange({ target: { name: 'paymentMethod', value: 'transfer' } });
        profileForm.update();

        expect(profileForm.find('IBANField[name="IBAN"]')).toHaveLength(0);
        expect(profileForm.find('Checkbox[name="sepaApproval"]')).toHaveLength(0);
    });

    it('should toggle tabs', () => {
        const profileForm = renderComponent();

        profileForm
            .find('.profile-form-tab-list > button')
            .at(1)
            .props()
            .onClick();
        profileForm.update();

        expect(profileForm.state().selectedTabIndex).toBe(1);
        expect(
            profileForm
                .find('.profile-form-tab-panel')
                .at(1)
                .props().hidden
        ).toBeFalsy();

        profileForm
            .find('.profile-form-tab-list > button')
            .at(0)
            .props()
            .onClick();
        profileForm.update();

        expect(profileForm.state().selectedTabIndex).toBe(0);
        expect(
            profileForm
                .find('.profile-form-tab-panel')
                .at(0)
                .props().hidden
        ).toBeFalsy();

        profileForm
            .find('.profile-form-tab-list > button')
            .at(0)
            .props()
            .onKeyDown({ key: 'ArrowRight' });
        profileForm.update();

        expect(profileForm.state().selectedTabIndex).toBe(1);
        expect(
            profileForm
                .find('.profile-form-tab-panel')
                .at(1)
                .props().hidden
        ).toBeFalsy();

        profileForm
            .find('.profile-form-tab-list > button')
            .at(1)
            .props()
            .onKeyDown({ key: 'ArrowLeft' });
        profileForm.update();

        expect(profileForm.state().selectedTabIndex).toBe(0);
        expect(
            profileForm
                .find('.profile-form-tab-panel')
                .at(0)
                .props().hidden
        ).toBeFalsy();

        profileForm
            .find('.profile-form-tab-list > button')
            .at(1)
            .props()
            .onKeyDown({ key: 'ArrowLeft' });
        profileForm.update();

        expect(profileForm.state().selectedTabIndex).toBe(1);
        expect(
            profileForm
                .find('.profile-form-tab-panel')
                .at(1)
                .props().hidden
        ).toBeFalsy();

        profileForm
            .find('.profile-form-tab-list > button')
            .at(1)
            .props()
            .onKeyDown({ key: 'ArrowRight' });
        profileForm.update();

        expect(profileForm.state().selectedTabIndex).toBe(0);
        expect(
            profileForm
                .find('.profile-form-tab-panel')
                .at(0)
                .props().hidden
        ).toBeFalsy();

        profileForm
            .find('.profile-form-tab-list > button')
            .at(1)
            .props()
            .onKeyDown({ preventDefault: jest.fn(), key: 'End' });
        profileForm.update();

        expect(profileForm.state().selectedTabIndex).toBe(1);
        expect(
            profileForm
                .find('.profile-form-tab-panel')
                .at(1)
                .props().hidden
        ).toBeFalsy();

        profileForm
            .find('.profile-form-tab-list > button')
            .at(1)
            .props()
            .onKeyDown({ preventDefault: jest.fn(), key: 'Home' });
        profileForm.update();

        expect(profileForm.state().selectedTabIndex).toBe(0);
        expect(
            profileForm
                .find('.profile-form-tab-panel')
                .at(0)
                .props().hidden
        ).toBeFalsy();

        profileForm
            .find('.profile-form-tab-list > button')
            .at(1)
            .props()
            .onKeyDown({ key: 'Tab' });
        profileForm.update();

        expect(profileForm.state().selectedTabIndex).toBe(0);
        expect(
            profileForm
                .find('.profile-form-tab-panel')
                .at(0)
                .props().hidden
        ).toBeFalsy();
    });

    it('should update form data when `profile` property is changed', () => {
        const profileForm = renderComponent();
        const profileWithoutIBAN = { ...dummyProfile };

        profileWithoutIBAN.IBAN = '';
        profileForm.setState({ oldPassword: 'test1234', newPassword: 'qwerty123', confirmNewPassword: 'qwerty1234' });
        profileForm.setProps({ profile: profileWithoutIBAN });

        expect(profileForm.state().formData).toEqual({
            ...profileWithoutIBAN,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            paymentMethod: 'transfer',
            sepaApproval: false
        });
    });

    it('should not throw an error if `onSubmit` is not given', () => {
        const profileForm = renderComponent();

        expect(() => {
            profileForm
                .find('Button')
                .props()
                .onClick();
        }).not.toThrow();
    });

    it('should update form data', () => {
        const profileForm = renderComponent();

        profileForm
            .find('TextField[name="email"]')
            .props()
            .onChange({ target: { type: 'text', name: 'email', value: 'new.email@example.com' } });
        profileForm
            .find('Checkbox[name="sepaApproval"]')
            .props()
            .onChange({ target: { type: 'checkbox', name: 'sepaApproval', checked: false } });
        profileForm
            .find('DateField[name="birthday"]')
            .props()
            .onChange({ name: 'birthday', value: 1535590800 });

        expect(profileForm.state().formData).toEqual({
            ...dummyProfile,
            email: 'new.email@example.com',
            birthday: 1535590800,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            paymentMethod: 'debit',
            sepaApproval: false
        });
    });

    it('should call `onSubmit` callback with form data', () => {
        const onSubmit = jest.fn();
        const profileForm = renderComponent({ onSubmit });

        profileForm
            .find('Button')
            .props()
            .onClick();

        expect(onSubmit).toHaveBeenCalledWith({
            ...dummyProfile,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            paymentMethod: 'debit',
            sepaApproval: true
        });
    });
});
