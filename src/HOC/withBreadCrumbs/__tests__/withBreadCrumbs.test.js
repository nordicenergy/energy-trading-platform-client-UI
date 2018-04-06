import React from 'react';
import withBreadCrumbs from '../withBreadCrumbs';
import { mount } from 'enzyme';
import { mountWithIntl } from '../../../services/intlTestHelper';
import * as actionPerformers from '../../../action_performers/app';

actionPerformers.performSetupBreadcrumbs = jest.fn();
actionPerformers.performSetupRootBreadcrumb = jest.fn();

const WrappedComponent = () => <div>test</div>;

function renderComponent({
    id = 'test',
    label = {
        id: 'app.breadCrumbs.myProducer',
        defaultMessage: 'My Producer'
    },
    path = '/test',
    isRoot
}) {
    const Wrapper = withBreadCrumbs(WrappedComponent, {
        id,
        label,
        path,
        isRoot
    });
    return mountWithIntl(<Wrapper />);
}

describe('withBreadCrumbs Higher order Component', () => {
    it('should render component', () => {
        const component = renderComponent({});
        expect(component.find('div')).toHaveLength(1);
    });

    it('should call performSetupBreadcrumbs', () => {
        renderComponent({});
        expect(actionPerformers.performSetupBreadcrumbs).toHaveBeenCalled();
    });

    it('should call performSetupRootBreadcrumb', () => {
        renderComponent({ isRoot: true });
        expect(actionPerformers.performSetupRootBreadcrumb).toHaveBeenCalled();
    });
});
