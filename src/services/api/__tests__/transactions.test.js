import Axios from 'axios';
import { getRecentTransactions, getOpenTradePositions } from '../transactions';
import web3Service, { META_MASK_NETWORKS } from '../../web3';
import { BLOCKCHAIN_SCANNER_URLS } from '../../../constants';
import { formatDateTime } from '../../../services/formatter';

describe('Transactions API Service', () => {
    beforeEach(() => {
        Axios.get = jest.fn();
        web3Service.getCurrentBids = jest.fn();
        web3Service.getNetworkId = jest.fn();
    });
    it('should provide method for getting recent transactions', async () => {
        Axios.get
            .mockReturnValueOnce(Promise.resolve({ data: { balance: 20, lastUpdatedAt: 12345678 } }))
            .mockReturnValue(
                Promise.resolve({
                    data: {
                        transactions: [
                            {
                                date: 1524873600,
                                blockchainStatus: 'success',
                                description:
                                    'Bought 7.13 kWh from "Bio-Erdgas-Anlage in der ehemaligen Schultheiss-Brauerei"',
                                detailsLink:
                                    'https://ropsten.etherscan.io/tx/0x4c6c11de80fa544341fc97fd4fb6755adbe6006a424f5a1029b632b7ce81ed25',
                                energyAmount: 7.13,
                                from: '0x0101f8cdf2c5ed1d775120a99a701bab5418add8',
                                id: 99,
                                price: 2.7,
                                producerID: 9,
                                producerName: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss-Brauerei',
                                transactionAmount: 0.19,
                                transactionHash: '0x4c6c11de80fa544341fc97fd4fb6755adbe6006a424f5a1029b632b7ce81ed25'
                            }
                        ]
                    }
                })
            );

        const response = await getRecentTransactions('testId', 1);
        const [[balanceUrl], [historyUrl, historyParams]] = Axios.get.mock.calls;

        expect(balanceUrl).toEqual('/api/user/testId/transactions/getBalance');
        expect(historyUrl).toEqual('/api/user/testId/transactions/getHistory');
        expect(historyParams).toEqual({ params: { limit: 10, offset: 10 } });
        expect(response.data).toEqual({
            currentBalance: { balance: 20, date: 12345678 },
            transactions: [
                {
                    date: 1524873600,
                    description: 'Bought 7.13 kWh from "Bio-Erdgas-Anlage in der ehemaligen Schultheiss-Brauerei"',
                    details: {
                        amount: 7.13,
                        from: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss-Brauerei',
                        fromUrl: '/buy_energy/producer/9',
                        hash: '0x4c6c11de80fa544341fc97fd4fb6755adbe6006a424f5a1029b632b7ce81ed25',
                        price: 2.7,
                        status: 'success',
                        url:
                            'https://ropsten.etherscan.io/tx/0x4c6c11de80fa544341fc97fd4fb6755adbe6006a424f5a1029b632b7ce81ed25'
                    },
                    detailsLink:
                        'https://ropsten.etherscan.io/tx/0x4c6c11de80fa544341fc97fd4fb6755adbe6006a424f5a1029b632b7ce81ed25',
                    energyAmount: 7.13,
                    producerName: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss-Brauerei',
                    from: '0x0101f8cdf2c5ed1d775120a99a701bab5418add8',
                    id: 99,
                    price: 2.7,
                    producerID: 9,
                    blockchainStatus: 'success',
                    transactionAmount: 0.19,
                    transactionHash: '0x4c6c11de80fa544341fc97fd4fb6755adbe6006a424f5a1029b632b7ce81ed25'
                }
            ]
        });
    });

    it('should provide method for getting recent transactions', async () => {
        const bidsDummy = { data: [{ producer: '0x1', day: 1526398769827, energy: 200000, price: 250 }] };
        const producersDummy = { data: { producers: [{ id: '123', dlAddress: '0x1', name: 'test name' }] } };
        const expectedTestData = {
            energyAvailable: '2',
            energyOffered: '--',
            offerAddress: '0x1',
            offerIssued: formatDateTime(1526398769827),
            price: '0.25',
            producerName: 'test name',
            producerUrl: '/buy_energy/producer/123',
            validOn: '--'
        };

        Axios.get
            .mockReturnValueOnce(Promise.resolve(producersDummy))
            .mockReturnValueOnce(Promise.resolve({ data: { producers: undefined } }))
            .mockReturnValueOnce(Promise.resolve({ data: { producers: [] } }))
            .mockReturnValueOnce(Promise.resolve(producersDummy));

        web3Service.getNetworkId
            .mockReturnValueOnce(Promise.resolve({ data: { id: META_MASK_NETWORKS.ropsten } }))
            .mockReturnValue(Promise.resolve({ data: { id: META_MASK_NETWORKS.live } }));

        web3Service.getCurrentBids
            .mockReturnValueOnce(Promise.resolve(bidsDummy))
            .mockReturnValueOnce(Promise.resolve(undefined))
            .mockReturnValueOnce(Promise.resolve(bidsDummy));

        await expect(getOpenTradePositions()).resolves.toEqual({
            data: [{ ...expectedTestData, offerAddressUrl: `${BLOCKCHAIN_SCANNER_URLS.ropsten}/address/0x1` }]
        });
        await expect(getOpenTradePositions()).resolves.toEqual({ data: [] });
        await expect(getOpenTradePositions()).resolves.toEqual({ data: [] });

        await expect(getOpenTradePositions()).resolves.toEqual({
            data: [{ ...expectedTestData, offerAddressUrl: `${BLOCKCHAIN_SCANNER_URLS.live}/address/0x1` }]
        });
    });
});
