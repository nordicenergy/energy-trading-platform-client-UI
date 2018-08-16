import Axios from 'axios';
import { SESSION_API_URL } from '../../constants';

export function getAboutUsContent(locale) {
    return Axios.get(`${SESSION_API_URL}/content/aboutUs`, {
        params: { lang: locale }
    }).then(response => {
        const { data } = response;
        return {
            data: data.introductionText.split('\n')
        };
    });
}

export function getFAQContent(locale) {
    return Axios.get(`${SESSION_API_URL}/content/FAQ`, {
        params: { lang: locale }
    }).then(response => {
        const faqData = response.data && response.data.faq;
        return {
            data: faqData
        };
    });
}

export function getTermsAndConditions(/* locale */) {
    // TODO
    // return Axios.get(`${SESSION_API_URL}/content/termsAndConditions`, {
    //     params: { lang: locale }
    // }).then(response => {
    //     const data = response.data && response.data.termsAndConditions;
    //     return { data };
    // });

    return Promise.resolve({
        data: [
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            'Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. '
        ]
    });
}
