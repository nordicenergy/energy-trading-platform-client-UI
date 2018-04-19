import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import DE from 'antd/lib/date-picker/locale/de_DE';
import EN from 'antd/lib/date-picker/locale/en_US';
import CalendarIcon from './CalendarIcon';
import 'antd/lib/date-picker/style/index.css';
import './DateField.css';

import { DATE_FORMAT } from '../../constants';

const pickerLocales = {
    de: DE,
    en: EN
};

class DateField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            date: undefined
        };
    }

    componentDidUpdate({ value }) {
        // FIXME @vlad.nickulcha@instinctools.ru
        // if (this.props.value !== value) {
        //     this.setState({
        //         date: this.props.value
        //     });
        // }
    }

    onOkHandler(event) {
        event.preventDefault();
        if (this.props.value !== this.state.date) {
            this.props.onOk(this.state.date);
        }
        this.setState({ isOpened: false });
    }

    onCancelHandler(event) {
        event.preventDefault();
        if (this.state.date !== this.props.value) {
            this.setState({
                date: this.props.value
            });
        }
        this.setState({
            isOpened: false
        });
        this.props.onCancel();
    }

    handleFocus(event) {
        const { onFocus } = this.props;
        this.setState({ isOpened: true });

        if (typeof onFocus === 'function') {
            onFocus(event);
        }
    }

    handleBlur(event) {
        const { onBlur } = this.props;

        if (typeof onBlur === 'function') {
            onBlur(event);
        }
    }

    renderFooter() {
        return (
            <div className="footer-buttons">
                <button className="cancel-button" onClick={event => this.onCancelHandler(event)}>
                    Cancel
                </button>
                <button className="ok-button" onClick={event => this.onOkHandler(event)}>
                    Ok
                </button>
            </div>
        );
    }

    handleChange(date) {
        const formattedDate = date.format('YYYY-MM-DD');
        this.setState({
            date: formattedDate
        });
    }

    render() {
        const {
            props: {
                label,
                error,
                darkMode,
                className,
                disabled,
                placeholder,
                helperText,
                showToday,
                locale,
                renderTo,
                format
            },
            state: { isOpened, date }
        } = this;
        const renderContainer = document.querySelector(renderTo);
        const classes = classNames(
            'date-picker-field',
            isOpened && 'date-picker-field--focused',
            error && 'date-picker-field--error',
            darkMode && 'date-picker-field--dark',
            className
        );
        return (
            <div className={classes}>
                <label className="date-picker-field-layout">
                    <strong className="date-picker-field-label">{label}</strong>
                    <div className="date-picker-field-input-group">
                        <DatePicker
                            format={format}
                            getCalendarContainer={() => renderContainer}
                            locale={pickerLocales[locale]}
                            showToday={showToday}
                            disabled={disabled}
                            placeholder={placeholder}
                            open={isOpened}
                            value={moment(date || Date.now())}
                            onFocus={event => this.handleFocus(event)}
                            onBlur={event => this.handleBlur(event)}
                            onChange={(date, dateString) => this.handleChange(date, dateString)}
                            renderExtraFooter={() => this.renderFooter()}
                        />
                        <span className="date-picker-field-addon">
                            <CalendarIcon />
                        </span>
                    </div>
                </label>
                {helperText && <p className="date-picker-field-helper-text">{helperText}</p>}
                {error && (
                    <div role="alert" className="date-picker-field-error">
                        {error}
                    </div>
                )}
            </div>
        );
    }
}

DateField.propTypes = {
    className: PropTypes.string,
    darkMode: PropTypes.bool,
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    addon: PropTypes.node,
    helperText: PropTypes.node,
    error: PropTypes.string,
    showToday: PropTypes.bool,
    renderTo: PropTypes.string,
    format: PropTypes.string
};
DateField.defaultProps = {
    darkMode: false,
    type: 'text',
    showToday: false,
    disabled: false,
    onCancel: () => {},
    onOk: () => {},
    renderTo: 'body',
    format: DATE_FORMAT
};

export default DateField;
