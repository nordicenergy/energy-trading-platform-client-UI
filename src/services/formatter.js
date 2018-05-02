export function formatFloat(number, options) {
    // TODO uncomment in future, for current moment we use only DE format
    const locale = /*document.documentElement.getAttribute('lang') ||*/ 'de-DE';
    const defaultOptions = { maximumFractionDigits: 2 };
    return Number(number || '0').toLocaleString(locale, { ...defaultOptions, ...options });
}

export function formatCurrency(value) {
    return formatFloat(value, { minimumFractionDigits: 2 });
}
