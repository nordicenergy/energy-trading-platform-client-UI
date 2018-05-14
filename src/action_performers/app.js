import { dispatcher } from '../store';
import { getLocalizationContent } from '../services/api/app';

export function performSetupBreadcrumbs(breadcrumbs) {
    dispatcher.dispatchAction('SETUP_BREADCRUMBS', breadcrumbs);
}

export function performSetupLoaderVisibility(isVisible) {
    dispatcher.dispatchAction('SETUP_LOADER_VISIBILITY', isVisible);
}

export function performSetupLocale(locale) {
    dispatcher.dispatchPromise(getLocalizationContent, 'SETUP_LOCALE', state => state.App.localization.loading, [
        locale
    ]);
}
