import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IBAN from 'iban';
import TextField from '../TextField';
import './IBANField.css';

class IBANField extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value || '' };
    }

    componentDidUpdate(prevProps) {
        const { value } = this.props;

        if (prevProps.value !== value) {
            this.setState({ value: value });
        }
    }

    handleChange(event) {
        const { value, name } = event.target;
        const { onChange } = this.props;
        const formattedValue = IBAN.printFormat(value, '');

        this.setState({ value: formattedValue });
        onChange && onChange({ ...event, target: { value: formattedValue, name } });
    }

    render() {
        const { label, error, disabled, name } = this.props;

        return (
            <div className="iban-field">
                <TextField
                    name={name}
                    disabled={disabled}
                    label={label}
                    helperText="e.g. DE89 3704 0044 0532 0130 00"
                    value={IBAN.printFormat(this.state.value, ' ')}
                    error={error}
                    onChange={event => this.handleChange(event)}
                />
            </div>
        );
    }
}

IBANField.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};

export default IBANField;
