import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import './RadioButton.css';

class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checkedDefault
        };
    }

    getState() {
        return { ...this.state, ...pick(this.props, ['checked']) };
    }

    handleChange(event) {
        this.setState({ checked: event.target.checked });
        this.props.onChange(event);
    }

    render() {
        const { name, value, label, required } = this.props;
        const { checked } = this.getState();
        const labelContent = required ? (
            <Fragment>
                {label} <sup className="radio-button-asterisk">*</sup>
            </Fragment>
        ) : (
            label
        );

        return (
            <label className="radio-button">
                <input
                    className="radio-button-native-control"
                    name={name}
                    type="radio"
                    value={value}
                    checked={checked}
                    onChange={event => this.handleChange(event)}
                />
                <span className="radio-button-control" aria-hidden />
                {label && <span className="radio-button-label">{labelContent}</span>}
            </label>
        );
    }
}

RadioButton.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    checked: PropTypes.bool,
    checkedDefault: PropTypes.bool,
    label: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func
};
RadioButton.defaultProps = {
    checkedDefault: false,
    onChange: () => {}
};

export default RadioButton;
