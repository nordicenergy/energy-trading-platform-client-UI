import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash.pick';
import NumberField from '../NumberField';
import './DeltaField.css';

class DeltaField extends Component {
    constructor(props) {
        super(props);

        const initialValue = !props.initialValue || isNaN(props.initialValue) ? 0 : Number(props.initialValue);
        this.state = {
            initialValue,
            value: initialValue,
            delta: 0
        };
    }

    getState() {
        return { ...this.state, ...pick(this.props, ['delta', 'value', 'initialValue']) };
    }

    handleChange(delta) {
        const { onChange } = this.props;
        const { initialValue } = this.getState();
        const value = Number((initialValue + delta).toFixed(2));

        this.setState({ delta: delta, value });
        onChange && onChange({ delta, value });
    }

    render() {
        const { className, labels } = this.props;
        const { initialValue, delta, value } = this.getState();
        const classes = classNames('delta-field', className);

        return (
            <div>
                <table className={classes} cellSpacing={0}>
                    <tbody>
                        <tr className="delta-field-value-row">
                            <td>{labels.beforeLabel}:</td>
                            <td>
                                {initialValue} <small>{labels.units}</small>
                            </td>
                            {labels.units && <td />}
                        </tr>
                        <tr className="delta-field-input-row">
                            <td>{labels.inputLabel}</td>
                            <td>
                                <NumberField value={delta} onChange={delta => this.handleChange(delta)} />
                            </td>
                            {labels.units && <td>{labels.units}</td>}
                        </tr>
                        <tr className="delta-field-value-row">
                            <td>{labels.afterLabel}:</td>
                            <td>
                                {value} <small>{labels.units}</small>
                            </td>
                            {labels.units && <td />}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

DeltaField.propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({
        beforeLabel: PropTypes.string.isRequired,
        inputLabel: PropTypes.string.isRequired,
        afterLabel: PropTypes.string.isRequired,
        units: PropTypes.string
    }).isRequired,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    delta: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
};
DeltaField.defaultProps = {
    initialValue: 0
};

export default DeltaField;
