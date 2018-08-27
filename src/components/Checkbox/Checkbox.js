import React, { Component } from 'react';
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
        const { name, value, label } = this.props;
        const { checked } = this.getState();

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
                {label && <span className="checkbox-label">{label}</span>}
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
    label: PropTypes.string,
    onChange: PropTypes.func
};
Checkbox.defaultProps = {
    checkedDefault: false,
    onChange: () => {}
};

export default Checkbox;
