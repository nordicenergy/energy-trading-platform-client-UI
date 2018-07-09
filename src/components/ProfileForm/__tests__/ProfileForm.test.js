import React from 'react';
import { shallow, mount } from 'enzyme';
import ProfileForm from '../ProfileForm';

const labelsDummy = {
    save: 'Save',
    firstName: 'First name',
    lastName: 'Last name',
    birthday: 'Date of birth',
    iban: 'Bank account number',
    email: 'Email',
    street: 'Street',
    streetNumber: 'Street Number',
    postcode: 'Postcode',
    city: 'City',
    oldPassword: 'Old password',
    newPassword: 'New password',
    confirmNewPassword: 'Repeat new password',
    emptyFirstName: 'Enter your first name.',
    emptyLastName: 'Enter your last name.',
    emptyIban: 'Enter your IBAN.',
    emptyStreet: 'Enter your street.',
    emptyStreetNumber: 'Enter your street number.',
    emptyPostcode: 'Enter your postcode.',
    emptyCity: 'Enter your city.',
    emptyEmail: 'Enter your email.',
    passwordsMismatch: "Passwords don't match.",
    emptyPassword: 'Enter new password.',
    emptyOldPassword: 'Enter old password.',
    emptyConfirmPassowrd: 'Repeat your password.',
    invalidEmail: 'Invalid email address.'
};

const stateWithPassword = {
    firstName: '',
    lastName: '',
    birthday: '',
    IBAN: '',
    email: '',
    street: '',
    postcode: '',
    city: '',
    streetNumber: '',
    newPassword: '',
    confirmNewPassword: '',
    oldPassword: ''
};

const stateWithoutPassword = {
    firstName: '',
    lastName: '',
    birthday: '',
    IBAN: '',
    email: '',
    street: '',
    postcode: '',
    city: '',
    streetNumber: ''
};

const onForgotPasswordLinkClickStub = jest.fn();
const onSubmitStub = jest.fn();
function renderComponent(
    {
        labels = labelsDummy,
        onForgotPasswordLinkClick = onForgotPasswordLinkClickStub,
        onSubmit = onSubmitStub,
        profile = {},
        isSuccessfullyUpdated = true
    } = {},
    mountFn = shallow
) {
    return mountFn(<ProfileForm labels={labels} profile={profile} onSubmit={onSubmitStub} errors={{}} />);
}

describe('<ProfileForm /> component', () => {
    beforeEach(() => {
        onSubmitStub.mockClear();
    });

    it('should renders without errors', () => {
        renderComponent();
    });

    it(`should render
        - text fields
        - login button`, () => {
        const component = renderComponent();

        expect(component.find('TextField')).toHaveLength(11);
        expect(component.find('DateField')).toHaveLength(1);
        expect(component.find('Button')).toHaveLength(1);
    });

    it('should update state if firstName field value change', () => {
        const component = renderComponent();

        component
            .find('TextField[name="firstName"]')
            .props()
            .onChange({
                target: {
                    name: 'firstName',
                    value: 'test'
                }
            });
        expect(component.state().firstName).toBe('test');
    });

    it('should update state if firstName field value change and it was edited', () => {
        const component = renderComponent();

        const field = component.find('TextField[name="firstName"]');
        field.props().onChange({
            target: {
                name: 'firstName',
                value: 'test'
            }
        });
        expect(component.state().firstName).toBe('test');
        field.props().onChange({
            target: {
                name: 'lastName',
                value: 'test2'
            }
        });
        expect(component.state().lastName).toBe('test2');
        expect(component.state().isEdited).toBe(true);
    });

    it('should update state if lastName field value change', () => {
        const component = renderComponent();

        component
            .find('TextField[name="lastName"]')
            .props()
            .onChange({
                target: {
                    name: 'lastName',
                    value: 'test'
                }
            });
        expect(component.state().lastName).toBe('test');
    });

    it('should update state if lastName field value change and it was edited', () => {
        const component = renderComponent();

        const field = component.find('TextField[name="lastName"]');
        field.props().onChange({
            target: {
                name: 'lastName',
                value: 'test'
            }
        });
        expect(component.state().lastName).toBe('test');
        field.props().onChange({
            target: {
                name: 'lastName',
                value: 'test2'
            }
        });
        expect(component.state().lastName).toBe('test2');
        expect(component.state().isEdited).toBe(true);
    });

    it('should update state if birthday field value change', () => {
        const component = renderComponent();

        component
            .find('DateField')
            .props()
            .onChange({ name: 'birthday', value: 'test' });
        expect(component.state().birthday).toBe('test');
    });

    it('should update state if birthday field value change and it was edited', () => {
        const component = renderComponent();

        const field = component.find('DateField');
        field.props().onChange({ name: 'birthday', value: 'test' });
        expect(component.state().birthday).toBe('test');
        field.props().onChange({ name: 'birthday', value: 'test2' });
        expect(component.state().birthday).toBe('test2');
        expect(component.state().isEdited).toBe(true);
    });

    it('should update state if city field value change', () => {
        const component = renderComponent();

        component
            .find('TextField[name="city"]')
            .props()
            .onChange({
                target: {
                    name: 'city',
                    value: 'test'
                }
            });
        expect(component.state().city).toBe('test');
    });

    it('should update state if city field value change and it was edited', () => {
        const component = renderComponent();

        const field = component.find('TextField[name="city"]');
        field.props().onChange({
            target: {
                name: 'city',
                value: 'test'
            }
        });
        expect(component.state().city).toBe('test');
        field.props().onChange({
            target: {
                name: 'city',
                value: 'test2'
            }
        });
        expect(component.state().city).toBe('test2');
        expect(component.state().isEdited).toBe(true);
    });

    it('should update state if street field value change', () => {
        const component = renderComponent();

        component
            .find('TextField[name="street"]')
            .props()
            .onChange({
                target: {
                    name: 'street',
                    value: 'test'
                }
            });
        expect(component.state().street).toBe('test');
    });

    it('should update state if street field value change and it was edited', () => {
        const component = renderComponent();

        const field = component.find('TextField[name="street"]');
        field.props().onChange({
            target: {
                name: 'street',
                value: 'test'
            }
        });
        expect(component.state().street).toBe('test');
        field.props().onChange({
            target: {
                name: 'street',
                value: 'test2'
            }
        });
        expect(component.state().street).toBe('test2');
        expect(component.state().isEdited).toBe(true);
    });

    it('should update state if streetNumber field value change', () => {
        const component = renderComponent();

        component
            .find('TextField[name="streetNumber"]')
            .props()
            .onChange({
                target: {
                    name: 'streetNumber',
                    value: 'test'
                }
            });
        expect(component.state().streetNumber).toBe('test');
    });

    it('should update state if streetNumber field value change and it was edited', () => {
        const component = renderComponent();

        const field = component.find('TextField[name="streetNumber"]');
        field.props().onChange({
            target: {
                name: 'streetNumber',
                value: 'test'
            }
        });
        expect(component.state().streetNumber).toBe('test');
        field.props().onChange({
            target: {
                name: 'streetNumber',
                value: 'test2'
            }
        });
        expect(component.state().streetNumber).toBe('test2');
        expect(component.state().isEdited).toBe(true);
    });

    it('should update state if postcode field value change', () => {
        const component = renderComponent();

        component
            .find('TextField[name="postcode"]')
            .props()
            .onChange({
                target: {
                    name: 'postcode',
                    value: 'test'
                }
            });
        expect(component.state().postcode).toBe('test');
    });

    it('should update state if postcode field value change and it was edited', () => {
        const component = renderComponent();

        const field = component.find('TextField[name="postcode"]');
        field.props().onChange({
            target: {
                name: 'postcode',
                value: 'test'
            }
        });
        expect(component.state().postcode).toBe('test');
        field.props().onChange({
            target: {
                name: 'postcode',
                value: 'test2'
            }
        });
        expect(component.state().postcode).toBe('test2');
        expect(component.state().isEdited).toBe(true);
    });

    it('should update state if IBAN field value change', () => {
        const component = renderComponent();

        component
            .find('TextField[name="IBAN"]')
            .props()
            .onChange({
                target: {
                    name: 'IBAN',
                    value: 'test'
                }
            });
        expect(component.state().IBAN).toBe('test');
    });

    it('should update state if IBAN field value change and it was edited', () => {
        const component = renderComponent();

        const field = component.find('TextField[name="IBAN"]');
        field.props().onChange({
            target: {
                name: 'IBAN',
                value: 'test'
            }
        });
        expect(component.state().IBAN).toBe('test');
        field.props().onChange({
            target: {
                name: 'IBAN',
                value: 'test2'
            }
        });
        expect(component.state().IBAN).toBe('test2');
        expect(component.state().isEdited).toBe(true);
    });

    it('should update state if email field value change', () => {
        const component = renderComponent();

        component
            .find('TextField[name="email"]')
            .props()
            .onChange({
                target: {
                    name: 'email',
                    value: 'test'
                }
            });
        expect(component.state().email).toBe('test');
    });

    it('should update state if email field value change and it was edited', () => {
        const component = renderComponent();

        const field = component.find('TextField[name="email"]');
        field.props().onChange({
            target: {
                name: 'email',
                value: 'test'
            }
        });
        expect(component.state().email).toBe('test');
        field.props().onChange({
            target: {
                name: 'email',
                value: 'test2'
            }
        });
        expect(component.state().email).toBe('test2');
        expect(component.state().isEdited).toBe(true);
    });

    it('should update state if oldPassword field value change', () => {
        const component = renderComponent();

        component
            .find('TextField[name="oldPassword"]')
            .props()
            .onChange({
                target: {
                    name: 'oldPassword',
                    value: 'test'
                }
            });
        expect(component.state().oldPassword).toBe('test');
    });

    it('should update state if oldPassword field value change and it was edited', () => {
        const component = renderComponent();

        const field = component.find('TextField[name="oldPassword"]');
        field.props().onChange({
            target: {
                name: 'oldPassword',
                value: 'test'
            }
        });
        expect(component.state().oldPassword).toBe('test');
        field.props().onChange({
            target: {
                name: 'oldPassword',
                value: 'test2'
            }
        });
        expect(component.state().oldPassword).toBe('test2');
        expect(component.state().isEdited).toBe(true);
    });

    it('should update state if newPassword field value change', () => {
        const component = renderComponent();

        component
            .find('TextField[name="newPassword"]')
            .props()
            .onChange({
                target: {
                    name: 'newPassword',
                    value: 'test'
                }
            });
        expect(component.state().newPassword).toBe('test');
    });

    it('should update state if newPassword field value change and it was edited', () => {
        const component = renderComponent();

        const field = component.find('TextField[name="newPassword"]');
        field.props().onChange({
            target: {
                name: 'newPassword',
                value: 'test'
            }
        });
        expect(component.state().newPassword).toBe('test');
        field.props().onChange({
            target: {
                name: 'newPassword',
                value: 'test2'
            }
        });
        expect(component.state().newPassword).toBe('test2');
        expect(component.state().isEdited).toBe(true);
    });

    it('should update state if confirmNewPassword field value change', () => {
        const component = renderComponent();

        component
            .find('TextField[name="confirmNewPassword"]')
            .props()
            .onChange({
                target: {
                    name: 'confirmNewPassword',
                    value: 'test'
                }
            });
        expect(component.state().confirmNewPassword).toBe('test');
    });

    it('should update state if confirmNewPassword field value change and it was edited', () => {
        const component = renderComponent();

        const field = component.find('TextField[name="confirmNewPassword"]');
        field.props().onChange({
            target: {
                name: 'confirmNewPassword',
                value: 'test'
            }
        });
        expect(component.state().confirmNewPassword).toBe('test');
        field.props().onChange({
            target: {
                name: 'confirmNewPassword',
                value: 'test2'
            }
        });
        expect(component.state().confirmNewPassword).toBe('test2');
        expect(component.state().isEdited).toBe(true);
    });

    it('should call onSubmit without password callback when form was submitted', () => {
        const component = renderComponent();

        component.find('form').simulate('submit', { preventDefault: () => null });
        expect(onSubmitStub).toHaveBeenCalledWith(stateWithoutPassword);
    });

    it('should call onSubmit with password callback when form was submitted', () => {
        const component = renderComponent();

        component.setState({ oldPassword: 'asd' });

        component.find('form').simulate('submit', { preventDefault: () => null });
        expect(onSubmitStub).toHaveBeenCalledWith({ ...stateWithPassword, oldPassword: 'asd' });
    });

    it('should clear passwords fields in case success of profile update', () => {
        const component = renderComponent();
        component.setProps({
            isSuccessfullyUpdated: true,
            profile: { firstName: 'newFirstName' }
        });
        expect(component.state().newPassword).toBe('');
        expect(component.state().confirmNewPassword).toBe('');
        expect(component.state().oldPassword).toBe('');
    });
});
