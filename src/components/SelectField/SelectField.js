import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash.pick';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';
import './SelectField.css';

export const OptionPropType = PropTypes.oneOfType([
    PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
        disabled: PropTypes.bool
    }),
    PropTypes.string
]);

class SelectField extends Component {
    constructor(props) {
        super(props);

        this.handleBodyClick = this.handleBodyClick.bind(this);
        this.state = {
            value: props.defaultValue,
            isFocused: false
        };
    }

    getState() {
        return { ...this.state, ...pick(this.props, ['value']) };
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handleBodyClick);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleBodyClick);
    }

    handleBodyClick(event) {
        this.setState({
            isFocused:
                this.state.isFocused && !event.target.classList.contains('options-list-item')
                    ? false
                    : !!(this.layoutRef.compareDocumentPosition(event.target) & Node.DOCUMENT_POSITION_CONTAINED_BY)
        });
    }

    handleOptionClick(value) {
        const { onChange, name } = this.props;

        this.setState({ value, isFocused: false });
        onChange && onChange({ name, value });
    }

    getSelectedOption() {
        const { options } = this.props;
        const { value } = this.state;
        const [selectedOption] = options;

        for (let i = 0; i < options.length; i += 1) {
            const option = options[i];
            if (value === option.value || value === option) {
                return option;
            }
        }

        return selectedOption;
    }

    renderOptions(selectedOption) {
        const { options } = this.props;
        const renderedOptions = [];

        for (let i = 0; i < options.length; i += 1) {
            const option = options[i];
            let isSelected, label, value;

            if (typeof option === 'string') {
                label = option;
                value = option;
                isSelected = selectedOption === value;
            } else {
                label = option.label || option.value;
                value = option.value;
                isSelected = selectedOption.value === value;
            }

            const classes = classNames(
                'options-list-item',
                option.disabled && 'options-list-item--disabled',
                isSelected && 'options-list-item--selected'
            );
            const onClick = option.disabled ? event => event.preventDefault() : () => this.handleOptionClick(value);

            renderedOptions.push(
                <li key={i} className={classes} onClick={onClick}>
                    {label}
                </li>
            );
        }

        return renderedOptions;
    }

    render() {
        const { id, className, label, disabled, error } = this.props;
        const { isFocused } = this.getState();
        const listBoxId = `listbox-${id}`;
        const classes = classNames(
            'select-field',
            isFocused && 'select-field--focused',
            disabled && 'select-field--disabled',
            className
        );
        const selectedOption = this.getSelectedOption();

        return (
            <div id={id} className={classes}>
                <div className="select-field-layout" ref={ref => (this.layoutRef = ref)}>
                    {label && <label className="select-field-label">{label}</label>}
                    <div
                        className="select-field-input"
                        role="combobox"
                        aria-expanded={isFocused}
                        aria-controls={listBoxId}
                    >
                        <div role="button" className="select-control">
                            <strong className="select-control-text">
                                {(selectedOption && selectedOption.label) || selectedOption}
                            </strong>
                            <FontAwesomeIcon className="select-control-icon" icon={faChevronDown} />
                        </div>
                        {isFocused && (
                            <ul id={listBoxId} className="options-list" role="listbox">
                                {this.renderOptions(selectedOption)}
                            </ul>
                        )}
                    </div>
                </div>
                {error && (
                    <div role="alert" className="select-field-error">
                        {error}
                    </div>
                )}
            </div>
        );
    }
}

SelectField.propTypes = {
    className: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.arrayOf(OptionPropType),
    defaultValue: OptionPropType,
    value: OptionPropType,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    error: PropTypes.string
};
SelectField.defaultProps = {
    id: Date.now(),
    options: [],
    defaultValue: ''
};

export default SelectField;
