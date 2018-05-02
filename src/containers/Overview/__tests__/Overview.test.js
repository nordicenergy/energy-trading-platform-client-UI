import React from 'react';
import { Provider } from 'react-redux';
import OverviewContainer, { Overview } from '../Overview';
import { NavigationCardsPanel, Loader, RecentTransactions } from '../../../components';
import { mountWithIntl, shallowWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';

import * as usersActions from '../../../action_performers/users';
import * as notificationActions from '../../../action_performers/notifications';
import * as txActions from '../../../action_performers/transactions';

const context = {
    intl: {
        formatMessage: jest.fn()
    },
    router: {
        history: { push: jest.fn() }
    }
};

const mockStore = configureMockStore();
const store = mockStore({
    Users: {
        profile: {
            data: {
                user: {
                    id: 1
                }
            }
        }
    },
    Transactions: {
        recentTransactions: {
            data: {
                currentBalance: {
                    date: 1523707200,
                    balance: 40.4
                },
                transactions: [
                    {
                        id: '1',
                        date: 1523707200,
                        description: 'Bought 23 kWh Alice',
                        transactionAmount: 0.81,
                        details: {
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    },
                    {
                        id: '2',
                        date: 1523707200,
                        description: 'Monthly invoice',
                        transactionAmount: 0.081,
                        details: {
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    },
                    {
                        id: '3',
                        date: 1523707200,
                        description: 'Bought 23 kWh from Peter',
                        transactionAmount: 0.8,
                        details: {
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    },
                    {
                        id: '4',
                        date: 1523707200,
                        description: 'Bought 23 kWh from Peter',
                        transactionAmount: 0.8,
                        details: {
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    },
                    {
                        id: '5',
                        date: 1523707200,
                        description: 'Bought 23 kWh from Peter',
                        transactionAmount: 0.8,
                        details: {
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    },
                    {
                        id: '6',
                        date: 1523707200,
                        description: 'Bought 23 kWh from Peter',
                        transactionAmount: 0.8,
                        details: {
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    },
                    {
                        id: '7',
                        date: 1523707200,
                        description: 'Bought 23 kWh from Peter',
                        transactionAmount: 0.8,
                        details: {
                            hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                            price: 2.5,
                            amount: 7.74,
                            from: '254839457345934957394593459',
                            url:
                                'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                        }
                    }
                ]
            },
            loading: false,
            error: null
        }
    }
});

const props = {
    recentTransactions: {
        currentBalance: {
            date: 1523707200,
            balance: 40.4
        },
        transactions: [
            {
                id: '1',
                date: 1523707200,
                description: 'Bought 23 kWh Alice',
                transactionAmount: 0.81,
                details: {
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            },
            {
                id: '2',
                date: 1523707200,
                description: 'Monthly invoice',
                transactionAmount: 0.081,
                details: {
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            },
            {
                id: '3',
                date: 1523707200,
                description: 'Bought 23 kWh from Peter',
                transactionAmount: 0.8,
                details: {
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            },
            {
                id: '4',
                date: 1523707200,
                description: 'Bought 23 kWh from Peter',
                transactionAmount: 0.8,
                details: {
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            },
            {
                id: '5',
                date: 1523707200,
                description: 'Bought 23 kWh from Peter',
                transactionAmount: 0.8,
                details: {
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            },
            {
                id: '6',
                date: 1523707200,
                description: 'Bought 23 kWh from Peter',
                transactionAmount: 0.8,
                details: {
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            },
            {
                id: '7',
                date: 1523707200,
                description: 'Bought 23 kWh from Peter',
                transactionAmount: 0.8,
                details: {
                    hash: '9d98edfe27bb7f489fb1ced93d2b6e4093e5e40e5103356a602fecfc8d154743',
                    price: 2.5,
                    amount: 7.74,
                    from: '254839457345934957394593459',
                    url:
                        'https://ropsten.etherscan.io/tx/0x25a23d106b2c4299a98e553d96570941556e53fe8808476ee0fceb5d72859540'
                }
            }
        ]
    },
    user: { id: 'testId' },
    loading: false,
    error: null
};

function renderContainer() {
    return mountWithIntl(
        <Provider store={store}>
            <OverviewContainer context={context} />
        </Provider>
    );
}

function renderComponent() {
    return shallowWithIntl(<Overview {...props} context={context} />);
}

describe('<Overview /> Component', () => {
    beforeEach(() => {
        context.router.history.push = jest.fn();
        context.intl.formatMessage = jest.fn();
        usersActions.performGetUserData = jest.fn();
        txActions.performGetRecentTransactions = jest.fn();
        notificationActions.performPushNotification = jest.fn();
    });

    it(`should contains following controls:
        - 1 <NavigationCardsPanel /> component;
        - 1 <RecentTransactions /> component;
        - 1 <Loader /> component;
        - <div> element with class "overview-page";
        - <h1> element`, () => {
        const component = renderContainer();

        expect(component.find('section.overview-page')).toHaveLength(1);
        expect(component.find(NavigationCardsPanel)).toHaveLength(1);
        expect(component.find(RecentTransactions)).toHaveLength(1);
        expect(component.find(Loader)).toHaveLength(1);
    });

    it('should call prepare common function', () => {
        const component = renderContainer();
        const table = component.find(RecentTransactions).at(0);
        const tableProps = table.props();
        delete tableProps.onButtonClick;
        expect(tableProps).toEqual({
            currentBalance: { ...props.recentTransactions.currentBalance },
            labels: {
                buyEnergy: 'Buy Energy',
                myProducer: 'My Producer',
                recentTransactionsDetailsAmount: 'Amount',
                recentTransactionsDetailsFrom: 'From',
                recentTransactionsDetailsHash: 'Blockchain-Transaction',
                recentTransactionsDetailsPrice: 'Price per kWh',
                recentTransactionsHeaderAmount: 'Amount',
                recentTransactionsHeaderDate: 'Date',
                recentTransactionsHeaderTransaction: 'Transaction',
                recentTransactionsMonthlyBalance: 'Monthly Balance',
                recentTransactionsMore: 'More',
                recentTransactionsTitle: 'Most Recent Transactions',
                sellEnergy: 'Sell Energy'
            },
            transactions: [...props.recentTransactions.transactions]
        });

        const cards = component.find(NavigationCardsPanel).at(0);
        const cardsProps = cards.props();
        delete cardsProps.onCardClick;
        expect(cards.props()).toEqual({
            labels: {
                buyEnergy: 'Buy Energy',
                myProducer: 'My Producer',
                recentTransactionsDetailsAmount: 'Amount',
                recentTransactionsDetailsFrom: 'From',
                recentTransactionsDetailsHash: 'Blockchain-Transaction',
                recentTransactionsDetailsPrice: 'Price per kWh',
                recentTransactionsHeaderAmount: 'Amount',
                recentTransactionsHeaderDate: 'Date',
                recentTransactionsHeaderTransaction: 'Transaction',
                recentTransactionsMonthlyBalance: 'Monthly Balance',
                recentTransactionsMore: 'More',
                recentTransactionsTitle: 'Most Recent Transactions',
                sellEnergy: 'Sell Energy'
            },
            navigationCards: [
                { path: '/my_producer', title: 'My Producer', type: 'my_producer' },
                { path: '/buy_energy', title: 'Buy Energy', type: 'buy_energy' },
                { path: '/sell_energy', title: 'Sell Energy', type: 'sell_energy' }
            ]
        });
    });

    it('should returns correct props map', () => {
        const stateDummy = {
            Transactions: {
                recentTransactions: {
                    data: 'tx_data',
                    error: null,
                    loading: false
                }
            },
            Users: {
                profile: {
                    data: { user: 'user_data' },
                    error: 'test_error',
                    loading: 'test_loading'
                }
            }
        };
        const props = Overview.mapStateToProps(stateDummy);
        expect(props).toEqual({
            recentTransactions: 'tx_data',
            user: 'user_data',
            error: 'test_error',
            loading: 'test_loading'
        });
    });

    it('should provide possibility navigate to wattcoin page', () => {
        const component = renderComponent();
        component.setContext(context);

        const table = component.find(RecentTransactions).at(0);
        table.props().onButtonClick();

        expect(context.router.history.push.mock.calls.length).toEqual(1);
        const [[route]] = context.router.history.push.mock.calls;
        expect(route).toEqual('/show_transactions');
    });

    it('should provide possibility navigate to different routes through cards', () => {
        const component = renderComponent();
        component.setContext(context);

        const cards = component.find(NavigationCardsPanel).at(0);
        cards.props().onCardClick('/testRoute');

        expect(context.router.history.push.mock.calls.length).toEqual(1);
        const [[route]] = context.router.history.push.mock.calls;
        expect(route).toEqual('/testRoute');
    });

    it('should perform related actions on did mount step', () => {
        renderContainer();
        expect(usersActions.performGetUserData.mock.calls.length).toEqual(1);

        const component = renderComponent();
        expect(usersActions.performGetUserData.mock.calls.length).toEqual(2);
        expect(txActions.performGetRecentTransactions.mock.calls.length).toEqual(0);

        component.setProps({ user: { id: 10 } });
        expect(txActions.performGetRecentTransactions.mock.calls.length).toEqual(1);
        const [[userId]] = txActions.performGetRecentTransactions.mock.calls;
        expect(userId).toEqual(10);

        component.setProps({ error: { message: 'Error Message' } });
        expect(notificationActions.performPushNotification.mock.calls.length).toEqual(1);
        const [[error]] = notificationActions.performPushNotification.mock.calls;
        expect(error).toEqual({ message: 'Error Message', type: 'error' });
    });
});
