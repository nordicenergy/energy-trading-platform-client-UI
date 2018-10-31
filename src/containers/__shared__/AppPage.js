import React from 'react';
import breadcrumbsMixin from './mixins/breadcrumbs';
import scrollBottomHandlingMixin from './mixins/scroll';
import labelsMixin from './mixins/labels';

const Base = labelsMixin(scrollBottomHandlingMixin(breadcrumbsMixin(React.PureComponent)));

class AppPage extends Base {
    // eslint-disable-next-line
    constructor(props, context, breadcrumbs) {
        super(props, context, breadcrumbs);
        this.setupBreadcrumbs();
    }

    componentWillUnmount() {
        this.scrollToTop();
    }
}

export default AppPage;
