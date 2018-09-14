import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { Registration as messages } from '../../services/translations/messages';
import { performRegistration } from '../../action_performers/users';
import { performSetupLoaderVisibility } from '../../action_performers/app';
import { performPushNotification } from '../../action_performers/notifications';
import { Logo, RegistrationForm } from '../../components';
import { getQueryParameter } from '../../services/url-params';
import './Registration.css';
import PropTypes from 'prop-types';

export class Registration extends AbstractContainer {
    static mapStateToProps({ Users }) {
        return {
            loading: Users.registration.loading,
            registeredUser: Users.registration.data,
            error: Users.registration.error
        };
    }

    componentDidUpdate(prevProps) {
        const { formatMessage } = this.context.intl;
        const { loading, registeredUser, error } = this.props;
        const loaded = prevProps.loading !== loading && !loading;

        if (loaded && registeredUser !== prevProps.registeredUser && registeredUser) {
            performPushNotification({
                type: 'success',
                message: formatMessage(messages.successfulRegistration)
            });
            this.openLoginPage();
        }

        if (error !== prevProps.error && error) {
            performPushNotification({
                type: 'error',
                message: error.message
            });
        }

        if (prevProps.loading !== loading) {
            performSetupLoaderVisibility(loading);
        }
    }

    prepareStepFormLabels({ fields, errors, ...messages }) {
        const { formatMessage } = this.context.intl;

        return {
            ...super.prepareLabels(messages),
            fields: Object.keys(fields).reduce((fieldsLabels, fieldName) => {
                const fieldDescriptor = fields[fieldName];

                return {
                    ...fieldsLabels,
                    [fieldName]: Array.isArray(fieldDescriptor)
                        ? fieldDescriptor.map(descriptor => formatMessage(descriptor))
                        : formatMessage(fieldDescriptor)
                };
            }, {}),
            errors: super.prepareLabels(errors)
        };
    }

    prepareLabels() {
        const { formatMessage } = this.context.intl;
        const { stepsMessages, ...otherMessages } = messages;

        return {
            ...super.prepareLabels(otherMessages),
            formLabels: Object.keys(stepsMessages).reduce((formLabels, stepNumber) => {
                const { title, formMessages } = stepsMessages[stepNumber];

                return {
                    ...formLabels,
                    [stepNumber]: {
                        title: formatMessage(title),
                        formLabels: this.prepareStepFormLabels(formMessages)
                    }
                };
            }, {})
        };
    }

    openLoginPage() {
        const { history } = this.context.router;
        history.push('/login');
    }

    handleSubmit(formData) {
        const allowedProperties = [
            'customerSpecification',
            'username',
            'password',
            'email',
            'phone',
            'phoneAreaCode',
            'usage',
            'business',
            'salutation',
            'lastName',
            'firstName',
            'birthday',
            'postcode',
            'city',
            'street',
            'streetNumber',
            'company',
            'legalForm',
            'iban',
            'sepaApproval',
            'billingAlternativeAddress',
            'billingCompany',
            'billingLegalForm',
            'billingSalutation',
            'billingSurname',
            'billingFirstName',
            'billingZip',
            'billingCity',
            'billingStreet',
            'billingHouseNumber',
            'desiredData',
            'terminationDate',
            'relocationDate',
            'enableNotifications',
            'customerNumber',
            'counterNumber',
            'message'
        ];
        const dateProperties = ['birthday', 'desiredData', 'terminationDate', 'relocationDate'];
        const userData = Object.keys(formData).reduce((properties, property) => {
            let value = formData[property];

            if (value && dateProperties.indexOf(property) > -1) {
                value = moment.unix(value).format('YYYY-MM-DD');
            }

            if (value !== '' && allowedProperties.indexOf(property) > -1) {
                return { ...properties, [property]: value };
            }

            return properties;
        }, {});

        performRegistration(userData);
    }

    render() {
        const { copyright, formLabels } = this.prepareLabels();
        const { location: { search } = {} } = this.context.router.route;
        const retrieveGetParameter = getQueryParameter.bind(null, search);

        return (
            <div className="registration-container">
                <header className="registration-container-header">
                    <Logo size="small" />
                </header>
                <main className="registration-container-wrapper">
                    <RegistrationForm
                        defaultValues={{
                            postcode: retrieveGetParameter('zip'),
                            city: retrieveGetParameter('city'),
                            usage: retrieveGetParameter('consumption')
                        }}
                        labels={formLabels}
                        onSubmit={formData => this.handleSubmit(formData)}
                    />
                </main>
                <footer className="registration-container-footer">&copy; {copyright}</footer>
            </div>
        );
    }
}

Registration.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        route: PropTypes.shape({
            location: PropTypes.object.isRequired
        }).isRequired
    }),
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};
Registration.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.shape({}),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
Registration.defaultProps = {
    loading: false,
    data: {},
    error: null
};

export default connect(Registration.mapStateToProps)(Registration);
