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

    prepareLabels(messages) {
        const { formatMessage } = this.context.intl;
        const entries = Object.keys(messages).map(key => [key, messages[key]]);

        return entries.reduce((labels, [labelName, messageDescriptor]) => {
            return {
                ...labels,
                [labelName]: formatMessage(messageDescriptor)
            };
        }, {});
    }
}

export default AbstractContainer;
