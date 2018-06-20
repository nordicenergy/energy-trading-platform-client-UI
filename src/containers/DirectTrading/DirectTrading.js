import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Validator from 'async-validator';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { MetaMaskAlert, ConfigurationForm, TradePositionsList } from '../../components';
import web3Service from '../../services/web3';
import { DirectTrading as messages } from '../../services/translations/messages';
import {
    performGetAvailableAddresses,
    performGetOpenTradePositions,
    // TODO cover by unit tests
    performPerformTransaction,
    performGetLedgerNetworks
} from '../../action_performers/transactions';
import { performSetupLoaderVisibility } from '../../action_performers/app';
import { performPushNotification } from '../../action_performers/notifications';
import { performGetUserData } from '../../action_performers/users';
import { META_MASK_DOWNLOAD_LINKS, META_MASK_LINK, BLOCKCHAIN_NETWORKS, TRADE_POSITIONS_LIMIT } from '../../constants';
import './DirectTrading.css';

const [ethereumNetwork, ledgerNetwork] = BLOCKCHAIN_NETWORKS;
const DAY_SECONDS = 86400;
const DEFAULT_FORM_DATA = {
    blockChain: ethereumNetwork,
    address: ''
};
const DEFAULT_FILTER = {
    energyAvailable: '',
    offerIssued: ''
};
const BLOCKCHAIN_NETWORKS_OPTIONS = [
    { value: ethereumNetwork, label: 'Ethereum' },
    { value: ledgerNetwork, label: 'Ledger', disabled: true }
];

// TODO: refactor this, choose more informative names

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
            },
            filter: DEFAULT_FILTER
        };
    }

    static mapStateToProps(state) {
        return {
            loading:
                state.Transactions.openTradePositions.loading ||
                state.Transactions.availableAddresses.loading ||
                state.Transactions.performedTransaction.loading ||
                state.Transactions.ledgerNetworks.loading ||
                state.Users.profile.loading,
            openTradePositions: state.Transactions.openTradePositions.data,
            availableAddresses: state.Transactions.availableAddresses.data.addresses,
            performedTransaction: state.Transactions.performedTransaction.data,
            error:
                state.Transactions.openTradePositions.error ||
                state.Transactions.availableAddresses.error ||
                state.Transactions.performedTransaction.error ||
                state.Transactions.ledgerNetworks.error,
            user: state.Users.profile.data.user,
            ledgerNetworks: state.Transactions.ledgerNetworks.data
        };
    }

    componentDidMount() {
        if (this.state.isMetaMaskInstalled) {
            performGetAvailableAddresses();
            performGetLedgerNetworks();
            performGetUserData();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { performedTransaction, loading, error, user } = this.props;
        const { isConfigured, isMetaMaskInstalled } = this.state;
        const configured = isConfigured && isConfigured !== prevState.isConfigured;

        if (isMetaMaskInstalled && configured && user) {
            performGetOpenTradePositions(user.id);
        }

        if (!loading && error && error !== prevProps.error) {
            performPushNotification({ message: error.message, type: 'error' });
        }

        if (performedTransaction !== prevProps.performedTransaction) {
            // TODO show popup - https://projects.invisionapp.com/share/2JGCP87HMKP#/screens/303084172_Advanced_Transactions_List_Popup
            // TODO and add `txHash` and `txHashUrl` for specific trade position
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
        this.setState({
            isConfigured: false,
            formData: DEFAULT_FORM_DATA,
            filter: DEFAULT_FILTER,
            sortParams: {}
        });
    }

    handleDateFilterChange({ value: timestamp }) {
        const { filter } = this.state;

        this.setState({
            filter: {
                ...filter,
                offerIssued: timestamp - timestamp % DAY_SECONDS
            }
        });
    }

    handleTradeVolumeChange(event) {
        const { filter } = this.state;
        const { value } = event.target;

        if (/^\d*(\.|,)?\d*$/.test(value)) {
            this.setState({
                filter: {
                    ...filter,
                    energyAvailable: value
                }
            });
        }
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
        const { formData, formErrors } = this.state;
        const addressesWithDefaultOption = [
            { value: null, label: labels.metaMaskConfigurationFormAddressPlaceholder, disabled: true }
        ].concat(addresses);

        return (
            <ConfigurationForm
                blockChainFieldOptions={BLOCKCHAIN_NETWORKS_OPTIONS}
                addressFieldOptions={addressesWithDefaultOption}
                labels={{
                    title: labels.metaMaskConfigurationFormTitle,
                    blockChainField: labels.metaMaskConfigurationFormBlockChainField,
                    addressField: labels.metaMaskConfigurationFormAddressField,
                    button: labels.metaMaskConfigurationFormButton,
                    helperText: labels.metaMaskConfigurationFormHelperText
                }}
                onSubmit={formData => this.handleSubmit(formData)}
                formData={formData}
                errors={formErrors}
            />
        );
    }

    renderOpenTradePositionsTable(tradePositions = [], labels) {
        const { filter, formData } = this.state;
        const { ledger } = this.props.user;
        const filteredTradePositions = tradePositions
            .filter(tradePosition => {
                let isPass = true;

                if (filter.offerIssued) {
                    isPass =
                        isPass &&
                        (tradePosition.offerIssuedTimestamp > filter.offerIssued &&
                            tradePosition.offerIssuedTimestamp <= filter.offerIssued + DAY_SECONDS);
                }

                if (filter.energyAvailable) {
                    isPass =
                        isPass &&
                        tradePosition.energyAvailableFloat >= parseFloat(filter.energyAvailable.replace(',', '.'));
                }

                return isPass;
            })
            .slice(0, TRADE_POSITIONS_LIMIT);
        const address = (this.props.ledgerNetworks[ledger] && this.props.ledgerNetworks[ledger].addresses[0]) || [];

        return (
            <TradePositionsList
                onBackClick={() => this.handleBackClick()}
                onTradeVolumeChange={event => this.handleTradeVolumeChange(event)}
                onDateFilterChange={payload => this.handleDateFilterChange(payload)}
                onPerformTransaction={position =>
                    performPerformTransaction(position, address, ledger, formData.address)
                }
                tradeVolume={filter.energyAvailable}
                dateFilter={filter.offerIssued}
                tradePositions={filteredTradePositions}
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
