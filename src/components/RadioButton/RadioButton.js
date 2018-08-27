import React, { Component } from 'react';
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
        const { name, value, label } = this.props;
        const { checked } = this.getState();

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
                {label && <span className="radio-button-label">{label}</span>}
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
    onChange: PropTypes.func
};
RadioButton.defaultProps = {
    checkedDefault: false,
    onChange: () => {}
};

export default RadioButton;
