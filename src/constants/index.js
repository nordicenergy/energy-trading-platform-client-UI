export const KEYBOARD_KEY_VALUES = {
    ENTER: 'Enter',
    BACKSPACE: 'Backspace',
    DELETE: 'Delete'
};

export const MOUSE_BUTTONS_VALUES = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};

export const SESSION_API_URL = '/api';

export const PLANT_TYPES = {
    wind: 'wind',
    solar: 'solar',
    biomass: 'biomass',
    other: 'default'
};

export const LIMIT = 10;

export const TRANSACTION_STATUSES = {
    success: 'success',
    fail: 'failure',
    pending: 'pending',
    waitingForOffer: 'waitingForOffer'
};

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

export const BLOCKCHAIN_NETWORKS = ['ethereum', 'ledger'];

export const BLOCKCHAIN_SCANNER_URLS = {
    live: 'https://etherscan.io',
    ropsten: 'https://ropsten.etherscan.io'
};

export const TRADE_POSITIONS_LIMIT = 25;

export const DOCUMENT_TYPES = {
    INVOICE: 'invoice',
    ARCHIVED: 'archivedDocument'
};
