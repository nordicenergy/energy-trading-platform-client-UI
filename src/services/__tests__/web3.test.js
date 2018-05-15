import Web3 from 'web3';
import web3Service, { META_MASK_NETWORKS, TIMEOUT_ERROR, NETWORK_ERROR } from '../web3';

const ropstenAddresses = ['0xa705D64d383349F5c198afed7C3292d24EaBa48d'];
const liveAddresses = ['0x3f3c80ceA2d44419fBDA23Be3575fd403c5b4481'];

describe('Web3 Service', () => {
    beforeEach(() => {
        web3Service.web3.eth = {
            Contract: jest.fn(),
            net: { getId: jest.fn() },
            getAccounts: jest.fn()
        };
    });

    it('should create web3 instance with metamask provider by default', () => {
        expect(Web3).toHaveBeenCalledTimes(1);
        const [[provider]] = Web3.mock.calls;
        // eslint-disable-next-line
        expect(provider).toBe(web3.currentProvider);
        expect(web3Service.hasMetaMaskProvider()).toBe(true);
    });

    it(
        'should provide method for getting network identifier',
        async () => {
            web3Service.web3.eth.net.getId
                .mockReturnValueOnce(Promise.resolve(META_MASK_NETWORKS.ropsten))
                .mockReturnValueOnce(Promise.resolve(META_MASK_NETWORKS.live))
                .mockReturnValueOnce(Promise.resolve(78))
                .mockReturnValueOnce(Promise.reject('Error'))
                .mockReturnValueOnce(new Promise(() => {}));

            const ropstenResponse = await web3Service.getNetworkId();
            expect(ropstenResponse.data.id).toEqual(META_MASK_NETWORKS.ropsten);

            const liveResponse = await web3Service.getNetworkId();
            expect(liveResponse.data.id).toEqual(META_MASK_NETWORKS.live);

            await expect(web3Service.getNetworkId()).resolves.toEqual({ data: { id: 78 } });
            await expect(web3Service.getNetworkId()).rejects.toEqual({ response: { data: 'Error' } });
            await expect(web3Service.getNetworkId()).rejects.toEqual(TIMEOUT_ERROR);
        },
        10000
    );

    it(
        'should provide method for getting available addresses',
        async () => {
            web3Service.web3.eth.getAccounts
                .mockReturnValueOnce(Promise.resolve([]))
                .mockReturnValueOnce(Promise.resolve([]))
                .mockReturnValueOnce(Promise.reject('Error'))
                .mockReturnValueOnce(new Promise(() => {}))
                .mockReturnValueOnce(Promise.resolve([]));

            web3Service.web3.eth.net.getId
                .mockReturnValueOnce(Promise.resolve(META_MASK_NETWORKS.ropsten))
                .mockReturnValueOnce(Promise.resolve(META_MASK_NETWORKS.live))
                .mockReturnValueOnce(Promise.resolve(META_MASK_NETWORKS.live))
                .mockReturnValueOnce(Promise.resolve(META_MASK_NETWORKS.live))
                .mockReturnValueOnce(Promise.resolve(78))
                .mockReturnValue(Promise.resolve(META_MASK_NETWORKS.live));

            const ropstenResponse = await web3Service.getAddresses();
            expect(ropstenResponse.data).toEqual({ addresses: ropstenAddresses });

            const liveResponse = await web3Service.getAddresses();
            expect(liveResponse.data).toEqual({ addresses: liveAddresses });

            await expect(web3Service.getAddresses()).rejects.toEqual({ response: { data: 'Error' } });
            await expect(web3Service.getAddresses()).rejects.toEqual(TIMEOUT_ERROR);
            await expect(web3Service.getAddresses()).rejects.toEqual(NETWORK_ERROR);

            const expectedError = new Error('Error');
            web3Service.web3.eth.getAccounts = () => {
                throw expectedError;
            };
            await expect(web3Service.getAddresses()).rejects.toEqual({ response: { data: expectedError } });
        },
        10000
    );

    it(
        'should provide method for getting contract',
        async () => {
            web3Service.web3.utils = { isAddress: f => f };
            web3Service.web3.eth.net.getId
                .mockReturnValueOnce(Promise.resolve(META_MASK_NETWORKS.ropsten))
                .mockReturnValueOnce(Promise.resolve(META_MASK_NETWORKS.live))
                .mockReturnValueOnce(Promise.resolve(78))
                .mockReturnValue(Promise.resolve(META_MASK_NETWORKS.live));

            web3Service.web3.utils.isAddress = address => {
                const [expectedAddress] = ropstenAddresses;
                expect(address).toEqual(expectedAddress);
                return true;
            };
            await expect(web3Service.getContract()).resolves.toEqual({ data: {} });

            web3Service.web3.utils.isAddress = address => {
                const [expectedAddress] = liveAddresses;
                expect(address).toEqual(expectedAddress);
                return true;
            };
            await expect(web3Service.getContract()).resolves.toEqual({ data: {} });

            await expect(web3Service.getContract()).rejects.toEqual(NETWORK_ERROR);

            const expectedError = new Error('Error');
            web3Service.web3.utils.isAddress = () => {
                throw expectedError;
            };
            await expect(web3Service.getContract()).rejects.toEqual({ response: { data: expectedError } });

            web3Service.web3.utils.isAddress = () => false;
            await expect(web3Service.getContract()).rejects.toBeTruthy();
        },
        10000
    );

    it(
        'should provide method for getting current bids',
        async () => {
            const valueDummy = { test: 'test' };
            const contractMockup = {
                data: {
                    getPastEvents: (type, options) => {
                        expect(type).toEqual('BidMade');
                        expect(options).toEqual({ fromBlock: 0, toBlock: 'pending' });
                        return Promise.resolve([{ returnValues: valueDummy }]);
                    }
                }
            };

            web3Service.getContract = jest.fn();
            web3Service.getContract
                .mockReturnValueOnce(Promise.resolve(contractMockup))
                .mockReturnValueOnce(new Promise(() => {}))
                .mockReturnValueOnce(Promise.reject(new Error()));

            await expect(web3Service.getCurrentBids()).resolves.toEqual({ data: [{ ...valueDummy }] });

            await expect(web3Service.getCurrentBids()).rejects.toEqual(TIMEOUT_ERROR);
            await expect(web3Service.getCurrentBids()).rejects.toBeTruthy();

            contractMockup.data.getPastEvents = () => Promise.resolve(undefined);
            await expect(web3Service.getCurrentBids(contractMockup)).resolves.toEqual({ data: [] });
        },
        10000
    );
});
