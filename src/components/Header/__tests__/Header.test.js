import React from 'react';
import Header from '../Header';
import HeaderButton from '../HeaderButton';
import { mount } from 'enzyme';

function renderComponent({
    notifications = [],
    onLogoutButtonClickHandler = () => {}
}) {
    return mount(
        <Header
            notifications={notifications}
            onLogoutButtonClickHandler={onLogoutButtonClickHandler}
        />
    );
}

describe('<Header /> Component', () => {
    it(`should contains following controls:
        - <header> with class "header-desktop";
        - 2 <HeaderButton> components`, () => {
        const component = renderComponent({});

        expect(component.find('HeaderButton').length).toBe(2);
        expect(component.find('header.header-desktop').length).toBe(1);
    });

    it('should call onLogoutButtonClickHandler after clicking on logout button', () => {
        const onLogoutButtonClickHandler = jest.fn();
        const component = renderComponent({
            onLogoutButtonClickHandler
        });
        component
            .find('HeaderButton')
            .at(1)
            .find('button')
            .simulate('click');
        expect(onLogoutButtonClickHandler).toHaveBeenCalled();
    });

    it('should call logout method after clicking on logout button', () => {
        const component = renderComponent({});
        Header.prototype.logout = jest.fn();
        component
            .find('HeaderButton')
            .at(1)
            .find('button')
            .simulate('click');
        expect(Header.prototype.logout).toHaveBeenCalled();
    });
});
