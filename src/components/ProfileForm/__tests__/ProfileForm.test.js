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
    IBAN: 'DE89370400440532013000',
    contract: {
        id: '1000087',
        startDate: 339984000,
        endDate: 339984000,
        firstName: 'Max',
        lastName: 'Mustermann',
        street: 'Treskowstr.',
        houseNumber: '10',
        postcode: '13089',
        city: 'Berlin',
        birthday: 1535587200,
        email: 'max@example.com',
    }
};

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<ProfileForm profile={dummyProfile} {...props} />);
}

describe('<ProfileForm /> component', () => {
    it('should renders with necessary components', () => {
        const profileForm = renderComponent();

        /* Customer data */
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

        /* Contract data */
        expect(profileForm.find('TextField[name="contractContractNumber"]')).toHaveLength(1);
        expect(profileForm.find('DateField[name="contractStartDate"]')).toHaveLength(1);
        expect(profileForm.find('DateField[name="contractEndDate"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="contractFirstName"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="contractLastName"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="contractStreet"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="contractHouseNumber"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="contractPostcode"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="contractCity"]')).toHaveLength(1);
        expect(profileForm.find('DateField[name="contractBirthday"]')).toHaveLength(1);
        expect(profileForm.find('TextField[name="contractEmail"]')).toHaveLength(1);

        /* Payment */
        expect(profileForm.find('RadioButton[name="paymentMethod"]')).toHaveLength(3);
        expect(profileForm.find('IBANField[name="IBAN"]')).toHaveLength(1);
        expect(profileForm.find('Checkbox[name="sepaApproval"]')).toHaveLength(1);
        expect(profileForm.find('Button')).toHaveLength(1);
        expect(profileForm.find('Button').props().disabled).toBe(true);
        expect(profileForm.find('.profile-form-tab-errors-feedback')).toHaveLength(2);
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
        expect(profileForm.find('Button').props().disabled).toBe(false);
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

    it('should display tab feedback about errors', () => {
        const onSubmit = jest.fn();
        const profileForm = renderComponent({ profile: { ...dummyProfile, email: '', IBAN: '' }, onSubmit });

        expect(profileForm.find('.profile-form-tab-errors-feedback')).toHaveLength(2);
        expect(profileForm.find('.profile-form-tab-errors-feedback--hide')).toHaveLength(2);

        profileForm.setProps({
            errors: {
                IBAN: 'error',
                email: 'error'
            }
        });

        expect(profileForm.find('#personalDataTabErrors')).toHaveLength(1);
        expect(profileForm.find('#paymentDataTabErrors')).toHaveLength(1);
        expect(profileForm.find('.profile-form-tab-errors-feedback')).toHaveLength(2);
        expect(profileForm.find('.profile-form-tab-errors-feedback--hide')).toHaveLength(0);

        profileForm.setProps({
            errors: {
                sepaApproval: 'error',
                oldPassword: 'error'
            }
        });

        expect(profileForm.find('#personalDataTabErrors')).toHaveLength(1);
        expect(profileForm.find('#paymentDataTabErrors')).toHaveLength(1);
        expect(profileForm.find('.profile-form-tab-errors-feedback')).toHaveLength(2);
        expect(profileForm.find('.profile-form-tab-errors-feedback--hide')).toHaveLength(0);

        profileForm.setProps({
            errors: {}
        });

        expect(profileForm.find('#personalDataTabErrors')).toHaveLength(1);
        expect(profileForm.find('#paymentDataTabErrors')).toHaveLength(1);
        expect(profileForm.find('.profile-form-tab-errors-feedback')).toHaveLength(2);
        expect(profileForm.find('.profile-form-tab-errors-feedback--hide')).toHaveLength(2);
    });
});
