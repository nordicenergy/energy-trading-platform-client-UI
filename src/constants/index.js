export const KEYBOARD_KEY_VALUES = {
    ENTER: 'Enter',
    BACKSPACE: 'Backspace',
    DELETE: 'Delete',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End'
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
    default: 'default',
    other: 'other'
};

export const PRODUCER_STATUSES = {
    standard: 'standard',
    soldOut: 'sold out',
    active: 'active'
};

export const LIMIT = 10;

export const TRANSACTION_STATUSES = {
    success: 'success',
    fail: 'failure',
    pending: 'pending',
    waitingForOffer: 'waitingForOffer'
};

export const DATE_FORMAT = 'MMM DD, YYYY';
export const MONTH_DAY_DATE_FORMAT = 'MMM DD';
export const DATETIME_FORMAT = 'MMM DD, YYYY hh:mm';

export const LOCALES = ['en', 'de'];
export const [, DEFAULT_LOCALE] = LOCALES;

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
    main: 'https://etherscan.io',
    ropsten: 'https://ropsten.etherscan.io'
};

export const TRADE_POSITIONS_LIMIT = 25;

export const PAYMENT_METHODS = {
    debit: 'debit',
    transfer: 'transfer'
};

export const GOOGLE_RECAPTCHA_API = 'https://www.google.com/recaptcha/api.js';

export const CONTRACT_STATUSES = {
    success: 5000,
    pending: 4000
};
