import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash.pick';
import moment from 'moment/moment';
import { DATE_FORMAT } from '../../constants';
import TextField from '../TextField';
import DatePicker, { DateLabelsPropType, DATE_PICKER_HEIGHT } from './DatePicker';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid';
import './DateField.css';

const SECOND = 1000; // milliseconds.

class DateField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: parseInt(props.defaultValue, 10),
            hasFocus: false,
            datePickerPosition: 'top'
        };
    }

    getState() {
        return { ...this.state, ...pick(this.props, ['value']) };
    }

    getFormattedDate() {
        const { value } = this.getState();

        if (!value || isNaN(value)) {
            return '';
        }

        const date = new Date(value * SECOND);
        return moment(date).format(DATE_FORMAT);
    }

    handleFocus() {
        const dateFieldBounds = this.dateFieldRef.getBoundingClientRect();
        const datePickerPosition = dateFieldBounds.top >= DATE_PICKER_HEIGHT ? 'top' : 'bottom';

        this.setState(() => ({
            hasFocus: true,
            datePickerPosition
        }));
    }

    handleChange(date) {
        const timestamp = parseInt(date.getTime() / SECOND, 10);
        this.setState(
            () => ({ value: timestamp }),
            () => {
                const { onChange } = this.props;
                if (typeof onChange === 'function') {
                    onChange(timestamp);
                }
            }
        );
    }

    handleOnCancel() {
        this.setState(() => ({ hasFocus: false }));
    }

    handleConfirm(date) {
        this.setState(() => ({ hasFocus: false }), () => this.handleChange(date));
    }

    renderDatePicker() {
        const { datePickerLabels } = this.props;
        const { value, hasFocus, datePickerPosition } = this.getState();
        const classes = classNames('date-field-datepicker', `date-field-datepicker--${datePickerPosition}`);

        if (hasFocus) {
            return (
                <DatePicker
                    className={classes}
                    position={datePickerPosition}
                    labels={datePickerLabels}
                    date={!value || isNaN(value) ? new Date() : new Date(value * SECOND)}
                    onChange={date => this.handleChange(date)}
                    onCancel={() => this.handleOnCancel()}
                    onConfirm={date => this.handleConfirm(date)}
                />
            );
        }

        return null;
    }

    render() {
        const { label } = this.props;
        const { hasFocus } = this.state;
        const addon = (
            <span className="date-field-addon">
                <FontAwesomeIcon icon={faCalendarAlt} />
            </span>
        );

        return (
            <div className="date-field" ref={ref => (this.dateFieldRef = ref)}>
                <TextField
                    label={label}
                    addon={addon}
                    value={this.getFormattedDate()}
                    hasFocus={hasFocus}
                    onFocus={event => this.handleFocus(event)}
                />
                {this.renderDatePicker()}
            </div>
        );
    }
}

DateField.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    datePickerLabels: DateLabelsPropType,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
};
DateField.defaultProps = {
    datePickerLabels: {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
};

export default DateField;
