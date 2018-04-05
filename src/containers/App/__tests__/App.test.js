import React from 'react';
import { App } from '../App';
import { Header, MenuSideBar, Footer } from '../../../components';
import * as usersActions from '../../../action_performers/users';
import { shallowWithIntl } from '../../../services/intlTestHelper';

const context = {
    intl: { formatMessage: jest.fn() },
    router: {
        history: { push: jest.fn() }
    }
};

function renderComponent() {
    return shallowWithIntl(<App />);
}

describe('Main <App /> Component', () => {
    beforeEach(() => {
        context.router.history.push = jest.fn();
        context.intl.formatMessage = jest.fn();
        context.intl.formatMessage.mockReturnValue('test');
        usersActions.performLogout = jest.fn();
        window.confirm = () => true;
    });

    it(`should contains following controls:
        - <div> with class "app";
        - <Header> component";
        - <Footer> component";
        - <MenuSideBar> component";`, () => {
        const component = renderComponent(context);
        const text = component.debug();

        expect(text.includes('div className="app"')).toEqual(true);
        expect(component.find(Header)).toHaveLength(1);
        expect(component.find(Footer)).toHaveLength(1);
        expect(component.find(MenuSideBar)).toHaveLength(1);
    });

    it('should setup correct translations', () => {
        const component = renderComponent(context);
        component.setContext(context);

        expect(context.intl.formatMessage.mock.calls.length).toEqual(9);
    });

    it('should returns correct props', () => {
        const stateMock = {
            Users: {
                login: {},
                logout: { loading: false }
            }
        };
        const props = App.mapStateToProps(stateMock);

        expect(props).toEqual({ loggingOut: false });
    });

    it('should setup correct callbacks and handle related events for Header', () => {
        const component = renderComponent(context);
        component.setContext(context);

        const header = component.find(Header).at(0);
        header.props().onLogoutButtonClickHandler();
        component.setProps({ loggingOut: true });
        component.setProps({ loggingOut: false });

        expect(context.router.history.push.mock.calls.length).toEqual(1);
        expect(usersActions.performLogout.mock.calls.length).toEqual(1);
        const [[route]] = context.router.history.push.mock.calls;
        expect(route).toEqual('/login');
    });

    it('should setup correct callbacks and handle related events for MenuSideBar', () => {
        const component = renderComponent(context);
        component.setContext(context);

        const menu = component.find(MenuSideBar).at(0);
        menu.props().onSelect('item1');

        expect(context.router.history.push.mock.calls.length).toEqual(1);
        const [[route]] = context.router.history.push.mock.calls;
        expect(route).toEqual('/item1');

        expect(menu.props().items).toEqual([
            {
                id: '',
                icon: 'faHome',
                label: 'test'
            },
            {
                id: 'documents',
                icon: 'faBook',
                label: 'test'
            },
            {
                id: 'submit_metric',
                icon: 'faCalculator',
                label: 'test'
            },
            {
                id: 'trading',
                icon: 'faChartBar',
                label: 'test'
            },
            {
                id: 'profile',
                icon: 'faUser',
                label: 'test'
            }
        ]);
    });

    it('should setup correct callbacks and handle related events for Footer anchors', () => {
        const component = renderComponent(context);
        component.setContext(context);

        const footer = component.find(Footer).at(0);
        footer.props().onSelect('item1');

        expect(context.router.history.push.mock.calls.length).toEqual(1);
        const [[route]] = context.router.history.push.mock.calls;
        expect(route).toEqual('/item1');

        expect(footer.props().navItems).toEqual([
            {
                active: false,
                href: 'about',
                label: 'test'
            },
            {
                active: false,
                href: 'team',
                label: 'test'
            },
            {
                active: false,
                href: 'service',
                label: 'test'
            }
        ]);
    });
});
