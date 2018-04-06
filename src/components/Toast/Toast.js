import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faExclamationTriangle
} from '@fortawesome/fontawesome-free-solid';
import './Toast.css';

const Toast = props => {
    const { className, type, message } = props;
    const classes = classNames('toast', `toast--${type}`, className);
    let icon = null;

    if (type === 'success') {
        icon = <FontAwesomeIcon icon={faCheckCircle} className="toast-icon" />;
    }

    if (type === 'error') {
        icon = (
            <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="toast-icon"
            />
        );
    }

    return (
        <div className={classes}>
            {icon}
            <h2 className="toast-message">{message}</h2>
        </div>
    );
};

Toast.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['success', 'error']),
    message: PropTypes.string.isRequired
};
Toast.defaultProps = {
    type: 'success'
};

export default Toast;
