import { performSetupBreadcrumbs } from '../../../action_performers/app';

const breadcrumbsMixin = Base =>
    class extends Base {
        constructor(props, context, breadcrumbs) {
            super(props, context);
            this.setupBreadcrumbs(breadcrumbs);
        }

        setupBreadcrumbs(breadcrumbs) {
            if (breadcrumbs) {
                return performSetupBreadcrumbs(breadcrumbs);
            }
            performSetupBreadcrumbs();
        }
    };

export default breadcrumbsMixin;
