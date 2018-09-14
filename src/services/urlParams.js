export function getQueryParameter(queryString = '', paramName = '') {
    const params = queryString.substr(1).split('&');

    for (let i = 0; i < params.length; i++) {
        const [parameterName, value] = params[i].split('=');

        if (parameterName === paramName && value) {
            return decodeURIComponent(value);
        }
    }

    return '';
}
