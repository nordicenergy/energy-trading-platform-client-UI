import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash.pick';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/fontawesome-free-solid';
import { faTimesCircle } from '@fortawesome/fontawesome-free-regular';
import FilterCheckbox from './FilterCheckbox';
import './ProducersFilter.css';

class ProducersFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: Array.isArray(props.defaultValue) ? props.defaultValue : [],
            optionsIsVisible: false
        };
    }

    getState() {
        return { ...this.state, ...pick(this.props, ['value']) };
    }

    handleChange(event) {
        const { onChange } = this.props;
        const { value } = this.getState();
        const { name } = event.currentTarget;
        const isIncludesName = value.indexOf(name) > -1;
        let changedValue;

        if (isIncludesName) {
            changedValue = value.filter(option => option !== name);
        } else {
            changedValue = [...value, name];
        }

        this.setState({
            value: changedValue
        });

        if (typeof onChange === 'function') {
            onChange(changedValue);
        }
    }

    handleDefaultOptionClick() {
        const { onChange } = this.props;

        this.setState({ value: [] });
        if (typeof onChange === 'function') {
            onChange([]);
        }
    }

    handleOpenButtonClick() {
        this.setState({
            optionsIsVisible: true
        });
    }

    handleCloseButtonClick() {
        this.setState({
            optionsIsVisible: false
        });
    }

    render() {
        const { className, labels, options } = this.props;
        const { value, optionsIsVisible } = this.getState();
        const classes = classNames('producers-filter', className);
        const backdropClasses = classNames(
            'producers-filter-backdrop',
            optionsIsVisible && 'producers-filter-backdrop--visible'
        );

        return (
            <aside className={classes}>
                <div className="producers-filter-meta">
                    <strong>{labels.helpMessage}:</strong>
                    <button className="producers-filter-open-button" onClick={() => this.handleOpenButtonClick()}>
                        <FontAwesomeIcon icon={faFilter} />
                        {labels.helpMessage}
                    </button>
                </div>
                <div className={backdropClasses}>
                    <button className="producers-filter-close-button" onClick={() => this.handleCloseButtonClick()}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                    <div className="producers-filter-options">
                        <FilterCheckbox
                            className="producers-filter-option"
                            label={labels.defaultOption}
                            type="default"
                            name="reset"
                            checked={value.length === 0}
                            onChange={() => this.handleDefaultOptionClick()}
                        />
                        {options.map(({ name, label, type }) => {
                            const isIncludesName = value.indexOf(name) > -1;
                            return (
                                <FilterCheckbox
                                    key={name}
                                    className="producers-filter-option"
                                    label={label}
                                    type={type}
                                    name={name}
                                    checked={isIncludesName}
                                    onChange={event => {
                                        this.handleChange(event);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </aside>
        );
    }
}

ProducersFilter.propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    labels: PropTypes.shape({
        helpMessage: PropTypes.string,
        defaultOption: PropTypes.string
    }),
    onChange: PropTypes.func,
    defaultValue: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.arrayOf(PropTypes.string)
};
ProducersFilter.defaultProps = {
    labels: {
        helpMessage: 'Filter by',
        defaultOption: 'All'
    },
    defaultValue: []
};

export default ProducersFilter;
