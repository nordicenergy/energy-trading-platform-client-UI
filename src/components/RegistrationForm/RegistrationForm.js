import React from 'react';
import PropTypes from 'prop-types';
import Wizard from '../Wizard';
import DeliveryAddressForm from './DeliveryAddressForm';
import ConsumptionForm from './ConsumptionForm';
import PersonalInformationForm from './PersonalInformationForm';
import PaymentInformationForm from './PaymentInformationForm';
import AuthInformationForm from './AuthInformationForm';
import TermsAndConditionsForm from './TermsAndConditionsForm';
import './RegistrationForm.css';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.goToPreviousStep = this.goToPreviousStep.bind(this);
        this.goToNextStep = this.goToNextStep.bind(this);
        this.state = {
            activeStep: 1,
            succeedSteps: [],
            stepsFormData: {
                1: {
                    business: false,
                    company: '',
                    legalForm: '',
                    salutation: '1',
                    firstName: '',
                    lastName: '',
                    postcode: props.defaultValues.postcode || '',
                    city: props.defaultValues.city || '',
                    street: '',
                    streetNumber: '',
                    billingAlternativeAddress: false,
                    billingCompany: '',
                    billingLegalForm: '',
                    billingSalutation: '1',
                    billingSurname: '',
                    billingFirstName: '',
                    billingZip: '',
                    billingCity: '',
                    billingStreet: '',
                    billingHouseNumber: ''
                },
                2: {
                    customerSpecification: 'earliest_possible_date',
                    usage: props.defaultValues.usage || '',
                    counterNumber: '',
                    relocationDate: ''
                },
                3: {
                    email: '',
                    birthday: '',
                    phoneAreaCode: '',
                    phone: ''
                },
                4: {
                    paymentMethod: 'debit',
                    iban: '',
                    alternativeAccountHolder: '',
                    sepaApproval: false
                },
                5: {
                    username: '',
                    password: '',
                    passwordConfirmation: ''
                },
                6: {
                    message: '',
                    agbApproval: false,
                    enableNotifications: false,
                    googleReCaptchaResponse: ''
                }
            }
        };
    }

    getStepFormData(number) {
        const { stepsFormData } = this.state;
        return stepsFormData[number] || {};
    }

    setStepFormData(number, newFormData) {
        const { stepsFormData } = this.state;

        this.setState({
            stepsFormData: {
                ...stepsFormData,
                [number]: {
                    ...stepsFormData[number],
                    ...newFormData
                }
            }
        });
    }

    setPersonalInformationFormData(newFormData) {
        const { stepsFormData } = this.state;

        this.setState({
            stepsFormData: {
                ...stepsFormData,
                3: {
                    ...stepsFormData[3],
                    ...newFormData
                },
                5: {
                    ...stepsFormData[5],
                    username: stepsFormData[3].email
                }
            }
        });
    }

    goToPreviousStep() {
        const { activeStep } = this.state;

        this.setState({
            activeStep: activeStep - 1
        });
    }

    goToNextStep() {
        const { activeStep, succeedSteps } = this.state;

        this.setState({
            activeStep: activeStep + 1,
            succeedSteps: succeedSteps.indexOf(activeStep) > -1 ? succeedSteps : succeedSteps.concat(activeStep)
        });
    }

    handleSubmit() {
        const { onSubmit } = this.props;
        const { stepsFormData } = this.state;

        onSubmit(
            Object.keys(stepsFormData).reduce((formData, stepNumber) => {
                const stepFormData = stepsFormData[stepNumber];

                return { ...formData, ...stepFormData };
            }, {})
        );
    }

    renderStep1() {
        const { labels } = this.props;

        return (
            <DeliveryAddressForm
                formData={this.getStepFormData(1)}
                labels={labels[1].formLabels}
                setFormData={newFormData => this.setStepFormData(1, newFormData)}
                onSubmit={this.goToNextStep}
            />
        );
    }

    renderStep2() {
        const { labels } = this.props;

        return (
            <ConsumptionForm
                formData={this.getStepFormData(2)}
                labels={labels[2].formLabels}
                setFormData={newFormData => this.setStepFormData(2, newFormData)}
                onCancel={this.goToPreviousStep}
                onSubmit={this.goToNextStep}
            />
        );
    }

    renderStep3() {
        const { labels } = this.props;

        return (
            <PersonalInformationForm
                formData={this.getStepFormData(3)}
                labels={labels[3].formLabels}
                setFormData={newFormData => this.setPersonalInformationFormData(newFormData)}
                onCancel={this.goToPreviousStep}
                onSubmit={this.goToNextStep}
            />
        );
    }

    renderStep4() {
        const { labels } = this.props;

        return (
            <PaymentInformationForm
                formData={this.getStepFormData(4)}
                labels={labels[4].formLabels}
                setFormData={newFormData => this.setStepFormData(4, newFormData)}
                onCancel={this.goToPreviousStep}
                onSubmit={this.goToNextStep}
            />
        );
    }

    renderStep5() {
        const { labels } = this.props;

        return (
            <AuthInformationForm
                formData={this.getStepFormData(5)}
                labels={labels[5].formLabels}
                setFormData={newFormData => this.setStepFormData(5, newFormData)}
                onCancel={this.goToPreviousStep}
                onSubmit={this.goToNextStep}
            />
        );
    }

    renderStep6() {
        const { labels } = this.props;

        return (
            <TermsAndConditionsForm
                formData={this.getStepFormData(6)}
                labels={labels[6].formLabels}
                setFormData={newFormData => this.setStepFormData(6, newFormData)}
                onCancel={this.goToPreviousStep}
                onSubmit={() => this.handleSubmit()}
            />
        );
    }

    render() {
        const { labels } = this.props;
        const { activeStep, succeedSteps } = this.state;
        const steps = [
            { number: 1, title: labels[1].title },
            { number: 2, title: labels[2].title },
            { number: 3, title: labels[3].title },
            { number: 4, title: labels[4].title },
            { number: 5, title: labels[5].title },
            { number: 6, title: labels[6].title }
        ];

        return (
            <div className="registration-form">
                <div className="registration-form-steps">
                    <Wizard steps={steps} activeStep={activeStep} succeedSteps={succeedSteps} />
                </div>
                <div className="registration-form-content">
                    {activeStep === 1 && this.renderStep1()}
                    {activeStep === 2 && this.renderStep2()}
                    {activeStep === 3 && this.renderStep3()}
                    {activeStep === 4 && this.renderStep4()}
                    {activeStep === 5 && this.renderStep5()}
                    {activeStep === 6 && this.renderStep6()}
                </div>
            </div>
        );
    }
}

RegistrationForm.propTypes = {
    defaultValues: PropTypes.shape({
        postcode: PropTypes.string,
        city: PropTypes.string,
        usage: PropTypes.string
    }),
    labels: PropTypes.shape({
        1: PropTypes.shape({
            title: PropTypes.string,
            formLabels: DeliveryAddressForm.propTypes.labels
        }),
        2: PropTypes.shape({
            title: PropTypes.string,
            formLabels: ConsumptionForm.propTypes.labels
        }),
        3: PropTypes.shape({
            title: PropTypes.string,
            formLabels: PersonalInformationForm.propTypes.labels
        }),
        4: PropTypes.shape({
            title: PropTypes.string,
            formLabels: PaymentInformationForm.propTypes.labels
        }),
        5: PropTypes.shape({
            title: PropTypes.string,
            formLabels: AuthInformationForm.propTypes.labels
        }),
        6: PropTypes.shape({
            title: PropTypes.string,
            formLabels: TermsAndConditionsForm.propTypes.labels
        })
    }),
    onSubmit: PropTypes.func
};
RegistrationForm.defaultProps = {
    defaultValues: {},
    labels: {
        1: { title: 'Lieferadresse' },
        2: { title: 'Lieferbeginn' },
        3: { title: 'Weitere Angaben' },
        4: { title: 'Zahlweise / Bankdaten' },
        5: { title: 'Dein Kundenkonto' },
        6: { title: 'Abschluss' }
    },
    onSubmit: () => {}
};

export default RegistrationForm;
