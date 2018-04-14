import moment from 'moment/moment';
import { DATE_FORMAT } from '../../../constants';

export function adaptTransactionsData(data) {
    const { transactions = [], currentBalance = {} } = data;
    const formattedTransactions = transactions.map(transaction => ({
        ...transaction,
        date: moment(transaction.date).format(DATE_FORMAT),
        name: `Bought ${transaction.energyAmount}kWh`,
        amount: convertToCurrency(transaction.transactionAmount)
    }));
    const formattedCurrentBalance = {
        date: moment(currentBalance.date).format(DATE_FORMAT),
        amount: convertToCurrency(currentBalance.amount)
    };
    return {
        data: {
            ...data,
            currentBalance: formattedCurrentBalance,
            transactions: formattedTransactions
        }
    };
}

export function convertToCurrency(value) {
    const formattedAmountNumber = value.toString().replace('.', ',');
    return `${formattedAmountNumber}€`;
}
