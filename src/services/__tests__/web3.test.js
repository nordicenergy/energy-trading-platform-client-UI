import Web3 from 'web3';
import web3Service from '../web3';

const addresses = ['0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', '0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf'];

describe('Web3 Service', () => {
    beforeEach(() => {
        web3Service.web3.eth = {
            getAccounts: jest.fn()
        };
        web3Service.web3.eth.getAccounts
            .mockReturnValueOnce(Promise.resolve([...addresses]))
            .mockReturnValueOnce(Promise.reject('Error'))
            .mockReturnValueOnce(new Promise(() => {}));
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
            const response = await web3Service.getAddresses();
            expect(response.data).toEqual({ addresses });

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
