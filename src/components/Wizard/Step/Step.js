import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';
import classNames from 'classnames';
import './Step.css';

class Step extends Component {
    getOffsetX() {
        const { left, right } = this.buttonRef.getBoundingClientRect();
        return parseInt((left + right) / 2, 10);
    }

    render() {
        const { className, number, title, isSucceed, isActive } = this.props;
        const classes = classNames(
            'wizard-step',
            isSucceed && 'wizard-step--succeed',
            isActive && 'wizard-step--active',
            className
        );

        return (
            <div className={classes}>
                <button ref={ref => (this.buttonRef = ref)} className="wizard-step-icon">
                    {isSucceed ? <FontAwesomeIcon icon={faCheck} /> : number}
                </button>
                {title && <strong className="wizard-step-title">{title}</strong>}
            </div>
        );
    }
}

Step.propTypes = {
    className: PropTypes.string,
    number: PropTypes.number.isRequired,
    title: PropTypes.string,
    isSucceed: PropTypes.bool,
    isActive: PropTypes.bool
};
Step.defaultProps = {
    isSucceed: false,
    isActive: false
};

export default Step;
