import { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'async-validator';

class AbstractForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleDateFieldFocus = this.handleDateFieldFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleDateFieldBlur = this.handleDateFieldBlur.bind(this);
        this.state = { errors: {} };
    }

    prepareValidator() {
        return new Validator({});
    }

    validateField(fieldName) {
        const { formData } = this.props;
        const validator = this.prepareValidator(fieldName);

        validator.validate(formData, errors => {
            if (errors) {
                const [{ message, field }] = errors;

                this.setState({
                    errors: { ...this.state.errors, [field]: message }
                });
            }
        });
    }

    resetFieldError(field) {
        const { errors } = this.state;

        this.setState({
            errors: Object.keys(errors).reduce((newErrors, key) => {
                return field === key ? newErrors : { ...newErrors, [key]: errors[key] };
            }, {})
        });
    }

    handleChange(event) {
        const { setFormData } = this.props;
        const { name, value } = event.target;

        setFormData({ [name]: value });
    }

    handleSelectChange({ name, value }) {
        const { setFormData } = this.props;

        setFormData({ [name]: value });
    }

    handleDateChange({ name, value }) {
        const { setFormData } = this.props;

        setFormData({ [name]: value });
    }

    handleCheckboxChange(event) {
        const { setFormData } = this.props;
        const { checked, name } = event.target;

        setFormData({ [name]: checked });
    }

    handleSubmit(event) {
        if (event) {
            event.preventDefault();
        }

        const { formData, onSubmit } = this.props;
        const validator = this.prepareValidator();

        validator.validate(formData, { firstFields: true }, errors => {
            if (errors) {
                this.setState({
                    errors: errors.reduce(
                        (errorsState, { field, message }) => ({
                            ...errorsState,
                            [field]: message
                        }),
                        {}
                    )
                });
            } else {
                this.setState({ errors: {} });
                onSubmit();
            }
        });
    }

    handleFocus(event) {
        this.resetFieldError(event.target.name);
    }

    handleBlur(event) {
        this.validateField(event.target.name);
    }

    handleDateFieldFocus({ name }) {
        this.resetFieldError(name);
    }

    handleDateFieldBlur({ name }) {
        this.validateField(name);
    }
}

AbstractForm.propTypes = {
    setFormData: PropTypes.func,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
};
AbstractForm.defaultProps = {
    setFormData: () => {},
    onSubmit: () => {},
    onCancel: () => {}
};

export default AbstractForm;
