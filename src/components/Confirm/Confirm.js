import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Confirm.css';

const Confirm = ({ className, labels, show, onConfirm, onCancel }) => {
    const classes = classNames('confirm', show && 'confirm--show', className);

    return (
        <div className={classes}>
            <dialog className="confirm-dialog" open={show}>
                <strong className="confirm-dialog-message">{labels.message}</strong>
                <div className="confirm-dialog-actions">
                    <button onClick={onConfirm}>{labels.confirmButton}</button>
                    <button onClick={onCancel}>{labels.cancelButton}</button>
                </div>
            </dialog>
        </div>
    );
};

Confirm.propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({
        message: PropTypes.string.isRequired,
        confirmButton: PropTypes.string.isRequired,
        cancelButton: PropTypes.string.isRequired
    }).isRequired,
    show: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
};
Confirm.defaultProps = {
    show: false
};

export default Confirm;
