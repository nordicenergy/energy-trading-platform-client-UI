import React from 'react';
import breadcrumbsMixin from './mixins/breadcrumbs';
import scrollBottomHandlingMixin from './mixins/scrollBottomHandling';
import labelsMixin from './mixins/labels';

const Base = labelsMixin(scrollBottomHandlingMixin(breadcrumbsMixin(React.PureComponent)));

class AbstractContainer extends Base {
    // eslint-disable-next-line
    constructor(props, context, breadcrumbs) {
        super(props, context, breadcrumbs);
    }

    componentWillUnmount() {
        this.scrollToTop();
    }
}

export default AbstractContainer;
