import React from 'react';
import { shallow } from 'enzyme';
import DisclosureArrow from '../DisclosureArrow';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<DisclosureArrow {...props} />);
}

describe('<DisclosureArrow /> Component', () => {
    it('should renders without errors', () => {
        const component = renderComponent();

        expect(component.hasClass('disclosure-arrow')).toBeTruthy();
    });

    it('should renders with success styles', () => {
        const component = renderComponent({ expanded: true });

        expect(component.hasClass('disclosure-arrow')).toBeTruthy();
        expect(component.hasClass('disclosure-arrow--expanded')).toBeTruthy();
    });

    it('should handle click event', () => {
        const onClickMock = jest.fn();
        const component = renderComponent({ onClick: onClickMock });

        component
            .find('button')
            .at(0)
            .simulate('click');
        expect(onClickMock).toHaveBeenCalled();
    });
});
