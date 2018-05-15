export const SESSION_API_URL = '/api';

export const PLANT_TYPES = {
    wind: 'wind',
    solar: 'solar',
    biomass: 'biomass',
    other: 'default'
};

export const TRANSACTION_STATUSES = {
    success: 'success',
    fail: 'failure',
    pending: 'pending',
    waitingForOffer: 'waitingForOffer'
};

export const LIMIT = 10;

export const DATE_FORMAT = 'MMM DD, YYYY';
export const DATETIME_FORMAT = 'MMM DD, YYYY hh:mm';

export const LOCALES = ['en', 'de'];
export const [DEFAULT_LOCALE] = LOCALES;

export const LITION_STANDARD_PLANT_ID = 1;

export const META_MASK_LINK = 'https://metamask.io';

export const META_MASK_DOWNLOAD_LINKS = {
    chrome: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
    firefox: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask',
    opera: 'https://addons.opera.com/en/extensions/details/metamask',
    brave: 'https://brave.com'
};

export const BLOCKCHAIN_NETWORK_LINKS = {
    ethereum: 'https://etherscan.io',
    ropsten: 'https://ropsten.etherscan.io'
};
