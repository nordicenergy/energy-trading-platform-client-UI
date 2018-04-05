import React from 'react';
import withoutBreadCrumbs from '../withoutBreadCrumbs';
import { mount } from 'enzyme';
import * as actionPerformers from '../../../action_performers/app';

actionPerformers.performResetBreadcrumbs = jest.fn();

const WrappedComponent = () => <div>test</div>;

function renderComponent() {
    const Wrapper = withoutBreadCrumbs(WrappedComponent);
    return mount(<Wrapper />);
}

describe('withoutBreadCrumbs Higher order Component', () => {
    it('should render component', () => {
        const component = renderComponent();
        expect(component.find('div')).toHaveLength(1);
    });

    it('should call performResetBreadcrumbs', () => {
        const component = renderComponent();
        expect(actionPerformers.performResetBreadcrumbs).toHaveBeenCalled();
    });
});
