import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash.pick';
import moment from 'moment/moment';
import { DATE_FORMAT } from '../../constants';
import TextField from '../TextField';
import DatePicker, { DateLabelsPropType } from './DatePicker';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid';
import './DateField.css';

const DATE_PICKER_HEIGHT = 362; //pixels
const HEADER_HEIGHT = 72; //pixels
const PAGE_TOP_OFFSET = DATE_PICKER_HEIGHT + HEADER_HEIGHT; // pixels
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
        const datePickerPosition = dateFieldBounds.top >= PAGE_TOP_OFFSET ? 'top' : 'bottom';

        this.setState({
            hasFocus: true,
            datePickerPosition
        });
    }

    handleChange(date) {
        const { onChange } = this.props;
        const timestamp = parseInt(date.getTime() / SECOND, 10);

        this.setState({ value: timestamp });
        onChange && onChange(timestamp);
    }

    handleOnCancel() {
        this.setState({ hasFocus: false });
    }

    handleConfirm(date) {
        this.setState({ hasFocus: false });
        this.handleChange(date);
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
        const { label, error, disabled } = this.props;
        const { hasFocus } = this.state;
        const addon = (
            <span className="date-field-addon">
                <FontAwesomeIcon icon={faCalendarAlt} />
            </span>
        );
        const classes = classNames('date-field', disabled && 'date-field--disabled');

        return (
            <div className={classes} ref={ref => (this.dateFieldRef = ref)}>
                <TextField
                    label={label}
                    addon={addon}
                    value={this.getFormattedDate()}
                    error={error}
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
    error: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool
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
