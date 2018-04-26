import Axios from 'axios';
import { SESSION_API_URL } from '../../constants';

export function getAboutUsContent(locale) {
    return Axios.get(`${SESSION_API_URL}/content/aboutUs`, {
        params: { lang: locale }
    }).then(response => {
        const { data } = response;
        return data.introductionText.split('\n');
    });
}

export function getFAQContent(locale) {
    return Axios.get(`${SESSION_API_URL}/content/FAQ`, {
        params: { lang: locale }
    }).then(response => response.data && response.data.faq);
}

export function getLocalizationContent(locale) {
    return Promise.all([getAboutUsContent(locale), getFAQContent(locale)]).then(([aboutUs, faq]) => ({
        data: { aboutUs, faq }
    }));
}
