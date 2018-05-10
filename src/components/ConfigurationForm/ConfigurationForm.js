import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SelectField, { OptionPropType } from '../SelectField';
import TextField from '../TextField';
import Button from '../Button';
import './ConfigurationForm.css';

class ConfigurationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockChain: props.blockChainFieldOptions[0],
            address: ''
        };
    }

    handleSelectChange(name, value) {
        this.setState({ [name]: value });
    }

    handleChange(event) {
        const { name, value } = event.currentTarget;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { onSubmit } = this.props;
        onSubmit &&
            onSubmit({
                ...this.state,
                blockChain: this.state.blockChain.value
            });
    }

    renderAddressHelperText() {
        const { labels } = this.props;

        return (
            <span className="address-helper-text">
                {labels.addressFieldHelperText}: <strong>0x123f681646d4a755815f9cb19e1acc8565a0c2ac</strong>
            </span>
        );
    }

    render() {
        const { className, labels, errors, blockChainFieldOptions, disabled } = this.props;
        const { blockChain, address } = this.state;
        const classes = classNames('configuration-form', className);

        return (
            <div className={classes}>
                <h3>{labels.title}</h3>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <div className="configuration-form-field">
                        <SelectField
                            label={labels.blockChainField}
                            options={blockChainFieldOptions}
                            value={blockChain}
                            onChange={value => this.handleSelectChange('blockChain', value)}
                        />
                    </div>
                    <div className="configuration-form-field">
                        <TextField
                            name="address"
                            label={labels.addressField}
                            helperText={this.renderAddressHelperText()}
                            value={address}
                            onChange={event => this.handleChange(event)}
                            error={errors.address}
                        />
                    </div>
                    <div className="configuration-form-actions">
                        <Button disabled={disabled}>{labels.button}</Button>
                        <br />
                        <small>{labels.helperText}</small>
                    </div>
                </form>
            </div>
        );
    }
}

ConfigurationForm.propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({
        title: PropTypes.string,
        blockChainField: PropTypes.string,
        addressField: PropTypes.string,
        addressFieldHelperText: PropTypes.string,
        button: PropTypes.string,
        helperText: PropTypes.string
    }),
    errors: PropTypes.shape({
        address: PropTypes.string
    }),
    blockChainFieldOptions: PropTypes.arrayOf(OptionPropType),
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func
};
ConfigurationForm.defaultProps = {
    labels: {
        title: 'Configuration',
        blockChainField: 'Blockchain',
        addressField: 'Your Address',
        addressFieldHelperText: 'Example',
        button: 'Add Your Address',
        helperText: 'Assign your address to your Lition account'
    },
    errors: {},
    blockChainFieldOptions: [
        { value: 'ethereum', title: 'Ethereum' },
        { value: 'ledger', title: 'Ledger', disabled: true }
    ],
    disabled: false
};

export default ConfigurationForm;
