import Web3 from 'web3';
import web3Service, { META_MASK_NETWORKS } from '../web3';

const ropstenAddresses = ['0xa705D64d383349F5c198afed7C3292d24EaBa48d'];
const liveAddresses = ['0x3f3c80ceA2d44419fBDA23Be3575fd403c5b4481'];

describe('Web3 Service', () => {
    beforeEach(() => {
        web3Service.web3.eth = {
            net: { getId: jest.fn() },
            getAccounts: jest.fn()
        };
        web3Service.web3.eth.getAccounts
            .mockReturnValueOnce(Promise.resolve([]))
            .mockReturnValueOnce(Promise.resolve([]))
            .mockReturnValueOnce(Promise.reject('Error'))
            .mockReturnValueOnce(new Promise(() => {}));

        web3Service.web3.eth.net.getId
            .mockReturnValueOnce(Promise.resolve(META_MASK_NETWORKS.ropsten))
            .mockReturnValue(Promise.resolve(META_MASK_NETWORKS.live));
    });

    it('should create web3 instance with metamask provider by default', () => {
        expect(Web3).toHaveBeenCalledTimes(1);
        const [[provider]] = Web3.mock.calls;
        // eslint-disable-next-line
        expect(provider).toBe(web3.currentProvider);
        expect(web3Service.hasMetaMaskProvider()).toBe(true);
    });

    it(
        'should provide method for getting available addresses',
        async () => {
            const ropstenResponse = await web3Service.getAddresses();
            expect(ropstenResponse.data).toEqual({ addresses: ropstenAddresses });

            const liveResponse = await web3Service.getAddresses();
            expect(liveResponse.data).toEqual({ addresses: liveAddresses });

            try {
                await web3Service.getAddresses();
            } catch (error) {
                expect(error.response.data).toEqual('Error');

                try {
                    await web3Service.getAddresses();
                } catch (e) {
                    expect(e.response.data.message).toEqual('MetaMask timeout error');

                    try {
                        web3Service.web3.eth.getAccounts = () => {
                            throw new Error('Error');
                        };
                        await web3Service.getAddresses();
                    } catch (e) {
                        expect(e.response.data.message).toEqual('Error');
                    }
                }
            }
        },
        10000
    );
});
