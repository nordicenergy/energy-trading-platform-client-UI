import React from 'react';
import {
    performSetupRootBreadcrumb,
    performSetupBreadcrumbs
} from '../../action_performers/app';
import PropTypes from 'prop-types';

const withBreadCrumbs = (
    WrappedComponent,
    { id, label, path, isRoot = false }
) => {
    const settingUpAction = isRoot
        ? performSetupRootBreadcrumb
        : performSetupBreadcrumbs;

    class Wrapper extends React.Component {
        constructor(props, context) {
            super(props, context);
            const { formatMessage } = context.intl;
            settingUpAction({
                id: id,
                label: formatMessage(label),
                path: path
            });
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    Wrapper.contextTypes = {
        intl: PropTypes.object
    };

    return Wrapper;
};

export default withBreadCrumbs;
