import Web3 from 'web3';

const TIMEOUT = 5000;
const TIMEOUT_ERROR = wrapError(new Error('MetaMask timeout error'));

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
        return new Promise((resolve, reject) => {
            const handler = setTimeout(() => reject(TIMEOUT_ERROR), TIMEOUT);

            try {
                this.web3.eth
                    .getAccounts()
                    .then(addresses => {
                        clearTimeout(handler);
                        resolve(wrapResult({ addresses }));
                    })
                    .catch(error => {
                        clearTimeout(handler);
                        reject(wrapError(error));
                    });
            } catch (error) {
                clearTimeout(handler);
                reject(wrapError(error));
            }
        });
    }

    // TODO TBD
    // getNetworkId(timeout) {
    //     const timeoutError = {
    //         response: { data: new Error('Web3 Timeout Error') }
    //     };
    //
    //     return new Promise((resolve, reject) => {
    //         const handler = timeout ? setTimeout(() => reject(timeoutError), timeout) : 0;
    //
    //         this.web3.eth.net
    //             .getId()
    //             .then(id => {
    //                 timeout && clearTimeout(handler);
    //                 resolve({
    //                     data: { id }
    //                 });
    //             })
    //             .catch(error =>
    //                 reject({
    //                     response: { data: error }
    //                 })
    //             );
    //     });
    // }
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
