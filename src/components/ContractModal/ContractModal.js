import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SelectField from '../SelectField/SelectField';

import './ContractModal.css';

// TODO @artur.basak: in case with this modal window `focusManager` will broke focus for native browser tabs, need to think how to avoid this issue

const ContractModal = ({ className, labels, show, selectedContractId, contracts, onSelect, ...other }) => {
    const classes = classNames('contract-modal-container', show && 'contract-modal-container--show', className);
    return (
        <div aria-hidden={!show} className={classes} {...other}>
            <dialog className="contract-modal" open={show}>
                <strong className="contract-modal-message">
                    {!!contracts.length ? labels.contractMessage : labels.noContractMessage}
                </strong>
                <div className="contract-modal-actions">
                    {!!contracts.length ? (
                        <SelectField
                            className="contract-modal-select"
                            name="working-contract"
                            label={labels.selectLabel}
                            options={contracts.map(({ id }) => ({ value: id, label: `#${id}` }))}
                            value={selectedContractId}
                            onChange={onSelect}
                            supportEmptyValue
                        />
                    ) : null}
                </div>
            </dialog>
        </div>
    );
};

ContractModal.propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({
        contractMessage: PropTypes.string,
        noContractMessage: PropTypes.string,
        selectLabel: PropTypes.string
    }),
    show: PropTypes.bool,
    contracts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string
        })
    ),
    selectedContractId: PropTypes.string,
    onSelect: PropTypes.func
};
ContractModal.defaultProps = {
    labels: {
        contractMessage: 'To continue, please select a contract.',
        noContractMessage: 'There are no contracts available, please contact administrator to resolve the issue.',
        selectLabel: 'Select contract'
    },
    show: false,
    contracts: [],
    selectedContractId: null
};

export default ContractModal;
