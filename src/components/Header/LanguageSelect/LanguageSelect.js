import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash.pick';
import SelectField from '../../SelectField';
import './LanguageSelect.css';

class LanguageSelect extends Component {
    static getSelectOption(locale) {
        return { value: locale, title: locale.toUpperCase() };
    }

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue
        };
    }

    getState() {
        return { ...this.state, ...pick(this.props, ['value']) };
    }

    handleChange({ value }) {
        const { onChange } = this.props;

        this.setState({ value });
        if (typeof onChange === 'function') {
            onChange(value);
        }
    }

    render() {
        const { className, locales } = this.props;
        const { value } = this.getState();
        const classes = classNames('language-select', className);

        return (
            <div className={classes}>
                <SelectField
                    className="select-field--language"
                    options={locales.map(LanguageSelect.getSelectOption)}
                    value={LanguageSelect.getSelectOption(value)}
                    onChange={option => this.handleChange(option)}
                />
            </div>
        );
    }
}

LanguageSelect.propTypes = {
    className: PropTypes.string,
    locales: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
};
LanguageSelect.defaultProps = {
    locales: [],
    defaultValue: ''
};

export default LanguageSelect;
