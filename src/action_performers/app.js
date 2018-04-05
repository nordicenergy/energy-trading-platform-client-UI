import { dispatcher } from '../store';

export function performSetupBreadcrumbs(breadcrumbs) {
    dispatcher.dispatchAction('SETUP_BREADCRUMBS', breadcrumbs);
}

export function performSetupRootBreadcrumb(breadcrumb) {
    dispatcher.dispatchAction('SETUP_ROOT_BREADCRUMB', breadcrumb);
}

export function performResetBreadcrumbs() {
    dispatcher.dispatchAction('RESET_BREADCRUMBS');
}
