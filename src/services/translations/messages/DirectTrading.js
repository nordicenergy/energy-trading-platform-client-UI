import { defineMessages } from 'react-intl';

const messages = defineMessages({
    pageTitle: {
        id: 'app.directTrading.pageTitle',
        defaultMessage: 'Advanced Trading'
    },
    pageSubTitle: {
        id: 'app.directTrading.pageSubTitle',
        defaultMessage: 'Advanced trading energy trader access to blockchain'
    },
    metaMaskMessageStart: {
        id: 'app.directTrading.metaMask.messageStart',
        defaultMessage: 'Please use a'
    },
    metaMaskMessageTail: {
        id: 'app.directTrading.metaMask.messageTail',
        defaultMessage: 'browser plugin to allow direct energy trading from your client!'
    },
    metaMaskLinksLabel: {
        id: 'app.directTrading.metaMask.linksLabel',
        defaultMessage: 'MetaMask for '
    },
    metaMaskConfigurationFormTitle: {
        id: 'app.directTrading.metaMask.configurationForm.title',
        defaultMessage: 'Configuration'
    },
    metaMaskConfigurationFormBlockChainField: {
        id: 'app.directTrading.metaMask.configurationForm.blockChainField',
        defaultMessage: 'Blockchain'
    },
    metaMaskConfigurationFormAddressField: {
        id: 'app.directTrading.metaMask.configurationForm.addressField',
        defaultMessage: 'Contract Address'
    },
    metaMaskConfigurationFormAddressPlaceholder: {
        id: 'app.directTrading.metaMask.configurationForm.addressPlaceholder',
        defaultMessage: 'Select contract address'
    },
    metaMaskConfigurationFormButton: {
        id: 'app.directTrading.metaMask.configurationForm.button',
        defaultMessage: 'Add Contract Address'
    },
    metaMaskConfigurationFormHelperText: {
        id: 'app.directTrading.metaMask.configurationForm.helperText',
        defaultMessage: 'Assign contract address to your Lition account'
    },
    metaMaskTradePositionsTitle: {
        id: 'app.directTrading.metaMask.tradePositions.title',
        defaultMessage: 'Open Trade Positions'
    },
    metaMaskTradePositionsTradeVolumeField: {
        id: 'app.directTrading.metaMask.tradePositions.tradeVolumeField',
        defaultMessage: 'Trade Volume'
    },
    metaMaskTradePositionsFilterByDateField: {
        id: 'app.directTrading.metaMask.tradePositions.filterByDateField',
        defineMessage: 'Filter by Date'
    },
    metaMaskTradePositionsSortToolbarTitle: {
        id: 'app.directTrading.metaMask.tradePositions.sortToolbarTitle',
        defineMessage: 'Sort by'
    },
    metaMaskErrorsBlockChain: {
        id: 'app.directTrading.metaMask.errors.blockChain',
        defineMessage: 'Select blockchain network.'
    },
    metaMaskErrorsAddress: {
        id: 'app.directTrading.metaMask.errors.address',
        defineMessage: 'Select one of address.'
    },
    confirmationDialogMessage: {
        id: 'app.directTrading.confirmationDialog.successMessage',
        defineMessage: 'Transaction is pending. Transaction hash is'
    }
});

export default messages;
