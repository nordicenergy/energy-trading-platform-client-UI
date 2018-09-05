import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import './Checkbox.css';

class Checkbox extends Component {
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
                {label} <sup className="checkbox-asterisk">*</sup>
            </Fragment>
        ) : (
            label
        );

        return (
            <label className="checkbox">
                <input
                    className="checkbox-native-control"
                    name={name}
                    type="checkbox"
                    value={value}
                    checked={checked}
                    onChange={event => this.handleChange(event)}
                />
                <span className="checkbox-control" aria-hidden />
                {label && <span className="checkbox-label">{labelContent}</span>}
            </label>
        );
    }
}

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    checked: PropTypes.bool,
    checkedDefault: PropTypes.bool,
    label: PropTypes.node,
    required: PropTypes.bool,
    onChange: PropTypes.func
};
Checkbox.defaultProps = {
    checkedDefault: false,
    onChange: () => {}
};

export default Checkbox;
