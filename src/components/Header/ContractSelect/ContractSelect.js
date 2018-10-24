import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SelectField from '../../SelectField';
import './ContractSelect.css';

class ContractSelect extends Component {
    handleChange({ value }) {
        const { onChange } = this.props;
        onChange && onChange(value);
    }

    render() {
        const { className, label, contracts, selectedContractId } = this.props;
        const classes = classNames('contract-select', className);

        return (
            <div className={classes} aria-label={label}>
                <SelectField
                    className="select-field--contract"
                    options={contracts.map(({ id }) => ({ value: id, label: `${label} #${id}` }))}
                    value={selectedContractId}
                    onChange={data => this.handleChange(data)}
                />
            </div>
        );
    }
}

ContractSelect.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    contracts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string
        })
    ).isRequired,
    selectedContractId: PropTypes.string,
    onChange: PropTypes.func
};

ContractSelect.defaultProps = {
    contracts: [],
    onChange: f => f
};

export default ContractSelect;
