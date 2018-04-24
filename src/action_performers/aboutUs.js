import { dispatcher } from '../store';
import { getAboutUsInfo } from '../services/api/app';

export function performGetAboutUsInfo(locale) {
    dispatcher.dispatchPromise(getAboutUsInfo, 'GET_ABOUT_US_INFO', state => state.AboutUs.loading, [locale]);
}
