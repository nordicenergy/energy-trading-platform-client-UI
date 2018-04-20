import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash.pick';
import TextField from '../TextField';
import DatePicker, { DateLabelsPropType, DATE_PICKER_HEIGHT } from './DatePicker';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid';
import './DateField.css';

class DateField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
            hasFocus: false,
            datePickerPosition: 'top'
        };
    }

    getState() {
        return { ...this.state, ...pick(this.props, ['value']) };
    }

    getFormattedDate() {
        const { labels } = this.props;
        const { value } = this.getState();

        if (!value) {
            return '';
        }

        const day = value.getDate();
        const month = labels.monthsShort[value.getMonth()];
        const year = value.getFullYear();

        return `${month} ${day}, ${year}`;
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
        this.setState(
            () => ({ value: date }),
            () => {
                const { onChange } = this.props;
                if (typeof onChange === 'function') {
                    onChange(date);
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
        const { labels } = this.props;
        const { value, hasFocus, datePickerPosition } = this.getState();
        const classes = classNames('date-field-datepicker', `date-field-datepicker--${datePickerPosition}`);

        if (hasFocus) {
            return (
                <DatePicker
                    className={classes}
                    position={datePickerPosition}
                    labels={labels}
                    date={value}
                    onChange={date => this.handleChange(date)}
                    onCancel={() => this.handleOnCancel()}
                    onConfirm={date => this.handleConfirm(date)}
                />
            );
        }

        return null;
    }

    render() {
        const { hasFocus } = this.state;
        const addon = (
            <span className="date-field-addon">
                <FontAwesomeIcon icon={faCalendarAlt} />
            </span>
        );

        return (
            <div className="date-field" ref={ref => (this.dateFieldRef = ref)}>
                <TextField
                    label="Selected since"
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
    labels: DateLabelsPropType,
    value: PropTypes.instanceOf(Date),
    defaultValue: PropTypes.instanceOf(Date),
    onChange: PropTypes.func
};
DateField.defaultProps = {
    labels: {
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
