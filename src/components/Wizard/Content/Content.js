import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/fontawesome-free-solid';
import Button from '../../Button';
import './Content.css';

function Content({
    className,
    title,
    subTitle,
    children,
    labels,
    nextButtonType,
    allowNextStep,
    allowPreviousStep,
    onPreviousButtonClick,
    onNextButtonClick
}) {
    const classes = classNames('wizard-content', className);

    return (
        <section className={classes}>
            <div className="wizard-content-body">
                {title && <h2 className="wizard-content-title">{title}</h2>}
                {subTitle && <h3 className="wizard-content-subtitle">{subTitle}</h3>}
                {children}
            </div>
            <div className="wizard-content-actions-wrapper">
                <div className="wizard-content-actions">
                    {allowNextStep && (
                        <Button onClick={onNextButtonClick} type={nextButtonType}>
                            {labels.nextButton}
                        </Button>
                    )}
                    {allowPreviousStep && (
                        <button className="wizard-content-back-button" onClick={onPreviousButtonClick}>
                            <FontAwesomeIcon icon={faReply} /> <span>{labels.previousButton}</span>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}

Content.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    children: PropTypes.node,
    labels: PropTypes.shape({
        previousButton: PropTypes.string,
        nextButton: PropTypes.string
    }),
    allowNextStep: PropTypes.bool,
    nextButtonType: PropTypes.oneOf(['primary', 'success']),
    onNextButtonClick: PropTypes.func,
    allowPreviousStep: PropTypes.bool,
    onPreviousButtonClick: PropTypes.func
};
Content.defaultProps = {
    children: null,
    labels: {
        previousButton: 'Previous Step',
        nextButton: 'Next Step'
    },
    allowNextStep: true,
    nextButtonType: 'primary',
    onNextButtonClick: () => {},
    allowPreviousStep: true,
    onPreviousButtonClick: () => {}
};

export default Content;
