import React from 'react';
import { App } from '../App';
import { Header, MenuSideBar, Footer } from '../../../components';
import * as usersActions from '../../../action_performers/users';
import * as appActions from '../../../action_performers/app';
import { shallowWithIntl } from '../../../services/intlTestHelper';

const context = {
    intl: { formatMessage: jest.fn() },
    router: {
        history: { push: jest.fn() }
    }
};

function renderComponent(props = {}) {
    return shallowWithIntl(<App {...props} />);
}

describe('Main <App /> Component', () => {
    beforeEach(() => {
        context.router.history.push = jest.fn();
        context.intl.formatMessage = jest.fn();
        usersActions.performLogout = jest.fn();
        appActions.performSetupLocale = jest.fn();
        appActions.performSetupLoaderVisibility = jest.fn();
        window.confirm = () => true;
    });

    afterEach(() => {
        appActions.performSetupLocale.mockClear();
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

    it('should returns correct props', () => {
        const stateMock = {
            Users: {
                profile: {
                    data: {
                        user: { id: 1 }
                    }
                },
                login: {},
                logout: { loading: false }
            },
            App: {
                breadCrumbs: {
                    data: []
                },
                localization: {
                    data: {
                        locale: 'en',
                        aboutUs: [],
                        faq: []
                    },
                    loading: {
                        aboutUs: false,
                        faq: false
                    }
                }
            }
        };
        const props = App.mapStateToProps(stateMock);

        expect(props).toEqual({ user: { id: 1 }, loggingOut: false, breadCrumbs: [], locale: 'en', loading: false });
    });

    it('should setup correct callbacks and handle related events for Header', () => {
        const component = renderComponent(context);
        component.setContext(context);

        const header = component.find(Header).at(0);
        const confirm = component.find('Confirm');

        expect(component.state().isConfirmVisible).toEqual(false);
        header.props().onLogoutClick();
        expect(component.state().isConfirmVisible).toEqual(true);
        confirm.props().onConfirm();
        expect(component.state().isConfirmVisible).toEqual(false);

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
        menu.props().onSelect('/item1');

        expect(context.router.history.push.mock.calls.length).toEqual(1);
        const [[route]] = context.router.history.push.mock.calls;
        expect(route).toEqual('/item1');

        expect(menu.props().items).toEqual([
            { active: true, icon: 'faHome', id: '', label: 'Overview', path: '/', subItemActive: false },
            { active: false, icon: 'faBook', id: 'documents', label: 'My Documents', path: '/documents' },
            {
                active: false,
                icon: 'faCalculator',
                id: 'submit_meter',
                label: 'Submit Meter Readings',
                path: '/submit_meter'
            },
            {
                active: false,
                subItemActive: false,
                icon: 'faShoppingCart',
                id: 'buy_energy',
                label: 'Buy energy',
                path: '/buy_energy',
                disabled: true
            },
            {
                active: false,
                icon: 'faSuitcase',
                id: 'direct_trading',
                label: 'Direct Trading',
                path: '/direct_trading',
                disabled: true
            },
            { active: false, icon: 'faUser', id: 'profile', label: 'Profile', path: '/profile' }
        ]);
    });

    it('should setup correct callbacks and handle related events for Footer anchors', () => {
        const component = renderComponent(context);
        component.setContext(context);

        const footer = component.find(Footer).at(0);
        footer.props().onSelect('/item1');

        expect(context.router.history.push.mock.calls.length).toEqual(1);
        const [[route]] = context.router.history.push.mock.calls;
        expect(route).toEqual('/item1');

        expect(footer.props().navItems).toEqual([
            { active: false, href: '/about', label: 'About Us' },
            { active: false, href: '/termsandconditions', label: 'Terms & Conditions' },
            { active: false, href: '/faq', label: 'FAQ' }
        ]);
    });

    it('should not perform logout if user click cancel', () => {
        const component = renderComponent(context);
        component.setContext(context);

        const header = component.find(Header).at(0);
        const confirm = component.find('Confirm');

        expect(component.state().isConfirmVisible).toEqual(false);
        header.props().onLogoutClick();
        expect(component.state().isConfirmVisible).toEqual(true);
        confirm.props().onCancel();
        expect(component.state().isConfirmVisible).toEqual(false);

        expect(context.router.history.push).not.toHaveBeenCalled();
        expect(usersActions.performLogout).not.toHaveBeenCalled();
    });

    it('should navigate to necessary route', () => {
        const component = renderComponent(context);
        component.setContext(context);

        const header = component.find(Header).at(0);
        header.props().onBreadCrumbsClick('/test');

        expect(context.router.history.push).toHaveBeenCalledWith('/test');
    });

    it('should calls performSetupLocale when locale was changed', () => {
        const app = renderComponent();

        app
            .find('Header')
            .props()
            .onLocaleChange('de');
        expect(appActions.performSetupLocale).toHaveBeenCalledWith('de');
    });

    it('should provide possibility to de-emphasize content area and revert this option', () => {
        const component = renderComponent();
        expect(component.find('.content--de-emphasized')).toHaveLength(0);

        component
            .find(Header)
            .at(0)
            .props()
            .onToggleMenuBar();
        expect(component.update().find('.content--de-emphasized')).toHaveLength(1);

        component
            .find('.content')
            .at(0)
            .props()
            .onClick({
                target: {
                    classList: {
                        contains: className => 'content--de-emphasized' === className
                    }
                }
            });
        expect(component.update().find('.content--de-emphasized')).toHaveLength(0);
    });

    it('should calls performSetupLoaderVisibility when receive new loading property', () => {
        const app = renderComponent();

        app.setProps({ loading: true });
        app.setProps({ loading: false });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
        const [[firstCallArg], [secondCallArg]] = appActions.performSetupLoaderVisibility.mock.calls;
        expect(firstCallArg).toBeTruthy();
        expect(secondCallArg).toBeFalsy();
    });

    it('should navigate to overview page', () => {
        const app = renderComponent(context);
        app.setContext(context);
        app
            .find('Header')
            .props()
            .onLogoClick();
        expect(context.router.history.push).toHaveBeenCalledWith('/');
    });
});
