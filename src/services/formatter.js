export function formatFloat(number, options) {
    // TODO uncomment in future, for current moment we use only DE format
    const locale = /*document.documentElement.getAttribute('lang') ||*/ 'de-DE';

    return Number(number || '0').toLocaleString(locale, options);
}

export function formatCurrency(value) {
    return formatFloat(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
