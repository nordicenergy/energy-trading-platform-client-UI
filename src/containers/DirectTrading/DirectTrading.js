import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MetaMaskAlert, Loader } from '../../components';
import web3Service from '../../services/web3';
import { DirectTrading as messages } from '../../services/translations/messages';
import { performGetAvailableAddresses, performGetOpenTradePositions } from '../../action_performers/transactions';
import { performPushNotification } from '../../action_performers/notifications';
import { META_MASK_DOWNLOAD_LINKS, META_MASK_LINK } from '../../constants';

import AbstractContainer from '../AbstractContainer/AbstractContainer';

import './DirectTrading.css';

export class DirectTrading extends AbstractContainer {
    constructor(props, context, breadcrumbs) {
        super(props, context, breadcrumbs);

        this.state = {
            isConfigured: false,
            isMetaMaskInstalled: web3Service.hasMetaMaskProvider()
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
        const { isConfigured, isMetaMaskInstalled } = this.state;
        const configured = isConfigured && isConfigured !== prevState.isConfigured;

        if (isMetaMaskInstalled && configured) {
            performGetOpenTradePositions();
        }

        if (!loading && error && error !== prevProps.error) {
            performPushNotification({ message: error.message, type: 'error' });
        }
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

    renderConfigurationForm(addresses = []) {
        // TODO TBD - place correct component here
        return (
            <div style={{ width: '60%', height: '300px', background: 'white', padding: '4em' }}>
                <p>Configuration Placeholder</p>
                <div>{addresses.join(',')}</div>
                <button onClick={() => this.setState({ isConfigured: true })}>OK</button>
            </div>
        );
    }

    renderOpenTradePositionsTable(positions = []) {
        // TODO TBD - place correct component here
        return (
            <div style={{ width: '60%', height: '300px', background: 'white', padding: '4em' }}>
                <p>Open Trade Positions</p>
                <div>{positions.map(p => JSON.stringify(p))}</div>
            </div>
        );
    }

    render() {
        const { loading, openTradePositions, availableAddresses } = this.props;
        const labels = this.prepareLabels(messages);

        return (
            <section className="direct-trading-page" aria-busy={loading}>
                <Loader show={loading} />
                <h1>{labels.pageTitle}</h1>
                <h2>{labels.pageSubTitle}</h2>
                {this.renderMetaMaskAlert(labels)}
                {!this.state.isConfigured ? this.renderConfigurationForm(availableAddresses) : null}
                {this.state.isConfigured ? this.renderOpenTradePositionsTable(openTradePositions) : null}
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
