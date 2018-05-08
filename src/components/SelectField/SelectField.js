import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash.pick';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';
import './SelectField.css';

export const OptionPropType = PropTypes.shape({
    value: PropTypes.string,
    title: PropTypes.string
});

class SelectField extends Component {
    constructor(props) {
        super(props);

        const [firstOption] = props.options;

        this.handleBodyClick = this.handleBodyClick.bind(this);
        this.state = {
            value: props.defaultValue || firstOption,
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

    handleOptionClick(option) {
        const { onChange } = this.props;

        this.setState({ value: option, isFocused: false });
        onChange && onChange(option);
    }

    renderOption(option) {
        const { value: selectedOption } = this.getState();
        const classes = classNames({
            'options-list-item': true,
            'options-list-item--selected': selectedOption.value === option.value
        });

        return (
            <li className={classes} key={option.value} onClick={() => this.handleOptionClick(option)}>
                {option.title}
            </li>
        );
    }

    render() {
        const { id, className, label, options, disabled } = this.props;
        const { value: selectedOption, isFocused } = this.getState();
        const listBoxId = `listbox-${id}`;
        const classes = classNames('select-field', isFocused && 'select-field--focused', disabled && 'select-field--disabled',className);

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
                            <strong className="select-control-text">{selectedOption && selectedOption.title}</strong>
                            <FontAwesomeIcon className="select-control-icon" icon={faChevronDown} />
                        </div>
                        {isFocused && (
                            <ul id={listBoxId} className="options-list" role="listbox">
                                {options.map(this.renderOption.bind(this))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

SelectField.propTypes = {
    className: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    options: PropTypes.arrayOf(OptionPropType),
    defaultValue: OptionPropType,
    value: OptionPropType,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};
SelectField.defaultProps = {
    id: Date.now(),
    options: []
};

export default SelectField;
