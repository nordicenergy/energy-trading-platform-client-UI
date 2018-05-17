import React from 'react';
import AbstractContainer from '../AbstractContainer';
import { mount } from 'enzyme';

describe('<AbstractContainer />', () => {
    it('should call scrollToTop method on componentWillUnmount lifecycle method', () => {
        AbstractContainer.prototype.scrollToTop = jest.fn();
        AbstractContainer.prototype.render = jest.fn();
        const component = mount(<AbstractContainer />);
        component.unmount();
        expect(AbstractContainer.prototype.scrollToTop).toHaveBeenCalled();
    });

    it('should set default scrollhandler and should not throw an error', () => {
        const component = mount(<AbstractContainer />);
        component.instance().scrollHandler();
        expect(component.exists()).toBeTruthy();
    });
});
