import React from 'react';
import { performResetBreadcrumbs } from '../../action_performers/app';

const withoutBreadCrumbs = Component => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            performResetBreadcrumbs();
        }

        render() {
            return <Component {...this.props} />;
        }
    };
};

export default withoutBreadCrumbs;
