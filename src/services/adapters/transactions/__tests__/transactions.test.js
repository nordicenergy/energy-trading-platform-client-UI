import { convertToCurrency, adaptTransactionsData } from '../transactions';

const { TRANSACTION_DATA, ADAPTED_DATA } = fixtures();

describe('transactions adapter', () => {
    it('it should convert number to currency', () => {
        const decimalCurrencyValue = convertToCurrency(1.2);
        const integerCurrencyValue = convertToCurrency(12);
        expect(decimalCurrencyValue).toBe('1,2€');
        expect(integerCurrencyValue).toBe('12€');
    });

    it('should adapt transactions data', () => {
        expect(adaptTransactionsData(TRANSACTION_DATA)).toEqual(ADAPTED_DATA);
    });
});

function fixtures() {
    return {
        TRANSACTION_DATA: {
            numberOfTransactions: 42,
            currentBalance: {
                date: 1521911833,
                amount: 1.04
            },
            transactions: [
                {
                    id: 0,
                    date: 1521911833,
                    energyAmount: 10.81,
                    producerID: 25,
                    transactionAmount: 0.81
                }
            ]
        },
        ADAPTED_DATA: {
            data: {
                numberOfTransactions: 42,
                currentBalance: {
                    date: 'Jan 18, 1970',
                    amount: '1,04€'
                },
                transactions: [
                    {
                        id: 0,
                        date: 'Jan 18, 1970',
                        energyAmount: 10.81,
                        producerID: 25,
                        transactionAmount: 0.81,
                        name: 'Bought 10.81kWh',
                        amount: '0,81€'
                    }
                ]
            }
        }
    };
}
