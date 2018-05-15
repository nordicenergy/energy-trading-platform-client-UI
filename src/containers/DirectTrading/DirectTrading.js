import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Validator from 'async-validator';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { MetaMaskAlert, ConfigurationForm, TradePositionsList } from '../../components';
import web3Service from '../../services/web3';
import { DirectTrading as messages } from '../../services/translations/messages';
import { performGetAvailableAddresses, performGetOpenTradePositions } from '../../action_performers/transactions';
import { performSetupLoaderVisibility } from '../../action_performers/app';
import { performPushNotification } from '../../action_performers/notifications';
import { META_MASK_DOWNLOAD_LINKS, META_MASK_LINK } from '../../constants';
import './DirectTrading.css';

const DEFAULT_FORM_DATA = {
    blockChain: 'ethereum',
    address: ''
};

export class DirectTrading extends AbstractContainer {
    constructor(props, context, breadcrumbs) {
        super(props, context, breadcrumbs);

        this.state = {
            isConfigured: false,
            isMetaMaskInstalled: web3Service.hasMetaMaskProvider(),
            formData: DEFAULT_FORM_DATA,
            formErrors: {
                blockChain: '',
                address: ''
            }
        };
    }

    static mapStateToProps(state) {
        return {
            loading: state.Transactions.openTradePositions.loading || state.Transactions.availableAddresses.loading,
            openTradePositions: state.Transactions.openTradePositions.data,
            availableAddresses: state.Transactions.availableAddresses.data.addresses,
            error: state.Transactions.openTradePositions.error || state.Transactions.availableAddresses.error
        };
    }

    componentDidMount() {
        if (this.state.isMetaMaskInstalled) {
            performGetAvailableAddresses();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, error } = this.props;
        const { isConfigured, isMetaMaskInstalled, formData } = this.state;
        const configured = isConfigured && isConfigured !== prevState.isConfigured;

        if (isMetaMaskInstalled && configured) {
            performGetOpenTradePositions(formData.address);
        }

        if (!loading && error && error !== prevProps.error) {
            performPushNotification({ message: error.message, type: 'error' });
        }

        performSetupLoaderVisibility(loading);
    }

    prepareValidator() {
        const labels = this.prepareLabels(messages);
        const validationSchema = {
            blockChain: {
                type: 'string',
                required: true,
                message: labels.metaMaskErrorsBlockChain
            },
            address: {
                type: 'string',
                required: true,
                message: labels.metaMaskErrorsAddress
            }
        };

        return new Validator(validationSchema);
    }

    handleBackClick() {
        this.setState({ isConfigured: false, formData: DEFAULT_FORM_DATA });
    }

    handleSubmit(formData) {
        const validator = this.prepareValidator();

        validator.validate(formData, errors => {
            if (errors) {
                this.setState({
                    formErrors: errors.reduce(
                        (errorsState, { field, message }) => ({
                            ...errorsState,
                            [field]: message
                        }),
                        {}
                    )
                });
            } else {
                this.setState({
                    isConfigured: true,
                    formData,
                    formErrors: { blockChain: '', address: '' }
                });
            }
        });
    }

    renderMetaMaskAlert(labels) {
        return (
            <MetaMaskAlert
                active={!this.state.isMetaMaskInstalled}
                labels={{
                    messageStart: labels.metaMaskMessageStart,
                    messageTail: labels.metaMaskMessageTail,
                    linksLabel: labels.metaMaskLinksLabel
                }}
                links={{
                    metamask: META_MASK_LINK,
                    ...META_MASK_DOWNLOAD_LINKS
                }}
            />
        );
    }

    renderConfigurationForm(addresses = [], labels) {
        const { formErrors } = this.state;
        const addressesWithDefaultOption = [
            { value: null, label: labels.metaMaskConfigurationFormAddressPlaceholder, disabled: true }
        ].concat(addresses);

        return (
            <ConfigurationForm
                addressFieldOptions={addressesWithDefaultOption}
                onSubmit={formData => this.handleSubmit(formData)}
                errors={formErrors}
                labels={{
                    title: labels.metaMaskConfigurationFormTitle,
                    blockChainField: labels.metaMaskConfigurationFormBlockChainField,
                    addressField: labels.metaMaskConfigurationFormAddressField,
                    button: labels.metaMaskConfigurationFormButton,
                    helperText: labels.metaMaskConfigurationFormHelperText
                }}
            />
        );
    }

    renderOpenTradePositionsTable(tradePositions = [], labels) {
        return (
            <TradePositionsList
                onBackClick={() => this.handleBackClick()}
                tradePositions={tradePositions.slice(0, 25)}
                labels={{
                    title: labels.metaMaskTradePositionsTitle,
                    tradeVolumeField: labels.metaMaskTradePositionsTradeVolumeField,
                    filterByDateField: labels.metaMaskTradePositionsFilterByDateField,
                    sortToolbarTitle: labels.metaMaskTradePositionsSortToolbarTitle
                }}
            />
        );
    }

    render() {
        const { loading, openTradePositions, availableAddresses } = this.props;
        const labels = this.prepareLabels(messages);

        return (
            <section className="direct-trading-page" aria-busy={loading}>
                <h1>{labels.pageTitle}</h1>
                <h2>{labels.pageSubTitle}</h2>
                {this.renderMetaMaskAlert(labels)}
                {!this.state.isConfigured ? this.renderConfigurationForm(availableAddresses, labels) : null}
                {this.state.isConfigured ? this.renderOpenTradePositionsTable(openTradePositions, labels) : null}
            </section>
        );
    }
}

DirectTrading.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    }),
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};

DirectTrading.propTypes = {
    loading: PropTypes.bool,
    availableAddresses: PropTypes.array,
    openTradePositions: PropTypes.array,
    error: PropTypes.object
};

DirectTrading.defaultProps = {
    loading: false,
    availableAddresses: [],
    openTradePositions: [],
    error: null
};

export default connect(DirectTrading.mapStateToProps)(DirectTrading);
