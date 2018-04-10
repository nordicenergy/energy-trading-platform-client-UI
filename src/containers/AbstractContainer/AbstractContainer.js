import React from 'react';
import { performSetupBreadcrumbs } from '../../action_performers/app';

class AbstractContainer extends React.Component {
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
}

export default AbstractContainer;
