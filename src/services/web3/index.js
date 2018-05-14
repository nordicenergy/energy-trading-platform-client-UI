import Web3 from 'web3';

import ropstenContract from './ropsten';
import liveContract from './live';

export const META_MASK_NETWORKS = {
    ropsten: 3,
    live: 1
};
const TIMEOUT = 5000;
const TIMEOUT_ERROR = wrapError(new Error('MetaMask timeout error'));

// FIXME cover by unit tests
class Web3Service {
    constructor() {
        this.isMetaMaskPluginInstalled = false;

        // MetaMask automatically create web3 namespace with their provider if it was installed
        // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#partly_sunny-web3---ethereum-browser-environment-check

        // eslint-disable-next-line
        if (typeof web3 !== 'undefined') {
            // eslint-disable-next-line
            this.web3 = new Web3(web3.currentProvider);
            this.isMetaMaskPluginInstalled = true;
        } else {
            // TODO TBD: implement logic for custom provider
            // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
    }

    hasMetaMaskProvider() {
        return this.isMetaMaskPluginInstalled;
    }

    getAddresses() {
        return new Promise(async (resolve, reject) => {
            const handler = setTimeout(() => reject(TIMEOUT_ERROR), TIMEOUT);
            const addresses = [];

            try {
                const { data } = (await this.getNetworkId()) || {};

                switch (data.id) {
                    case META_MASK_NETWORKS.live:
                        addresses.push(liveContract.address);
                        break;

                    case META_MASK_NETWORKS.ropsten:
                        addresses.push(ropstenContract.address);
                        break;

                    default:
                        return reject(wrapError(new Error('Network with no Lition smart contracts')));
                }

                await this.web3.eth.getAccounts();
                clearTimeout(handler);
                resolve(wrapResult({ addresses }));
            } catch (error) {
                clearTimeout(handler);
                reject(wrapError(error));
            }

            // TODO in future we will use real meta mask addresses
            // const handler = setTimeout(() => reject(TIMEOUT_ERROR), TIMEOUT);
            //
            // try {
            //     const addresses = await this.web3.eth.getAccounts();
            //     clearTimeout(handler);
            //     resolve(wrapResult({ addresses }));
            // } catch (error) {
            //     clearTimeout(handler);
            //     reject(wrapError(error));
            // }
        });
    }

    getCurrentBids(contract) {
        return new Promise(async (resolve, reject) => {
            const handler = setTimeout(() => reject(TIMEOUT_ERROR), TIMEOUT);

            try {
                const { data } = contract ? { data: contract } : await this.getContract();
                const events =
                    data && data.getPastEvents
                        ? await data.getPastEvents('BidMade', {
                              fromBlock: 0,
                              toBlock: 'pending'
                          })
                        : [];

                clearTimeout(handler);
                resolve(wrapResult(events.map(({ returnValues = {} }) => ({ ...returnValues }))));
            } catch (error) {
                clearTimeout(handler);
                reject(wrapError(error));
            }
        });
    }

    getContract(address, abi) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = (await this.getNetworkId()) || {};

                if (!address) {
                    switch (data.id) {
                        case META_MASK_NETWORKS.live:
                            address = liveContract.address;
                            abi = liveContract.abi;
                            break;

                        case META_MASK_NETWORKS.ropsten:
                            address = ropstenContract.address;
                            abi = ropstenContract.abi;
                            break;

                        default:
                            return reject(wrapError(new Error('Network with no Lition smart contracts')));
                    }
                }

                if (!this.web3.utils.isAddress(address)) {
                    return reject(wrapError(new Error(`Invalid address: ${address}`)));
                }

                resolve(wrapResult(new this.web3.eth.Contract(abi, address)));
            } catch (error) {
                reject(wrapError(error));
            }
        });
    }

    getNetworkId() {
        return new Promise(async (resolve, reject) => {
            const handler = setTimeout(() => reject(TIMEOUT_ERROR), TIMEOUT);

            try {
                const id = await this.web3.eth.net.getId();
                clearTimeout(handler);
                resolve({
                    data: { id }
                });
            } catch (error) {
                clearTimeout(handler);
                reject(wrapError(error));
            }
        });
    }
}

function wrapError(error) {
    return {
        response: { data: error }
    };
}

function wrapResult(data) {
    return { data };
}

const web3Service = new Web3Service();

export default web3Service;
