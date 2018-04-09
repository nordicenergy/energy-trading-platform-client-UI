import { dispatcher } from '../store';

export function performSetupBreadcrumbs(breadcrumbs) {
    dispatcher.dispatchAction('SETUP_BREADCRUMBS', breadcrumbs);
}
