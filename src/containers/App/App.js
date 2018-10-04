import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { LOCALES, DEFAULT_LOCALE } from '../../constants';
import { PATHS } from '../../services/routes';
import { performSetupLocale, performSetupLoaderVisibility } from '../../action_performers/app';
import { performLogout } from '../../action_performers/users';
import { App as messages } from '../../services/translations/messages';
import { MenuSideBar, Header, Footer, Confirm } from '../../components';
import './App.css';

export class App extends React.PureComponent {
    static mapStateToProps({ Users, App }) {
        return {
            loggingOut: Users.logout.loading,
            breadCrumbs: App.breadCrumbs.data,
            loading: App.localization.loading.faq || App.localization.loading.aboutUs,
            locale: App.localization.data.locale
        };
    }

    constructor(props, context) {
        super(props, context);
        this.state = { isConfirmVisible: false, isMenuBarOpen: false };
    }

    componentDidUpdate(prevProps) {
        const { loggingOut, loading } = this.props;
        const loggedOut = prevProps.loggingOut !== loggingOut && !loggingOut;

        if (loggedOut) {
            this.navigateTo('/login');
        }

        if (prevProps.loading !== loading) {
            performSetupLoaderVisibility(loading);
        }
    }

    logout() {
        this.setState(() => ({
            isConfirmVisible: true
        }));
    }

    handleLogoutCancel() {
        this.setState(() => ({
            isConfirmVisible: false
        }));
    }

    handleDeEmphasizedContentClick(target) {
        if (this.state.isMenuBarOpen && target.classList && target.classList.contains('content--de-emphasized')) {
            this.setState({ isMenuBarOpen: false });
        }
    }

    navigateTo(route) {
        this.context.router.history.push(route);
    }

    render() {
        const { locale } = this.props;
        const { isConfirmVisible } = this.state;
        const { pathname } = window.location;
        const { formatMessage } = this.context.intl;
        const [, headRoute = ''] = pathname.split('/');

        const icons = {
            '': 'faHome',
            documents: 'faBook',
            submit_meter: 'faCalculator',
            trading: 'faChartBar',
            buyEnergy: 'faShoppingCart',
            directTrading: 'faSuitcase',
            profile: 'faUser'
        };

        const menuItems = [
            {
                id: PATHS.overview.id,
                icon: icons[''],
                label: formatMessage(messages.overview),
                active:
                    headRoute === PATHS.overview.id ||
                    headRoute === PATHS.sellEnergy.id ||
                    headRoute === PATHS.myProducer.id ||
                    headRoute === PATHS.producer.id ||
                    headRoute === PATHS.showTransactions.id,
                path: PATHS.overview.path,
                subItemActive:
                    headRoute === PATHS.buyEnergy.id ||
                    headRoute === PATHS.sellEnergy.id ||
                    headRoute === PATHS.myProducer.id ||
                    headRoute === PATHS.producer.id ||
                    headRoute === PATHS.showTransactions.id
            },
            {
                id: PATHS.documents.id,
                icon: icons.documents,
                label: formatMessage(messages.documents),
                active: headRoute === PATHS.documents.id,
                path: PATHS.documents.path
            },
            {
                id: PATHS.submit_meter.id,
                icon: icons.submit_meter,
                label: formatMessage(messages.submitMeter),
                active: headRoute === PATHS.submit_meter.id,
                path: PATHS.submit_meter.path
            },
            /* {
                id: PATHS.trading.id,
                icon: icons.trading,
                label: formatMessage(messages.trading),
                active: headRoute === PATHS.trading.id,
                path: PATHS.trading.path,
                disabled: true
            }, */
            {
                id: PATHS.buyEnergy.id,
                icon: icons.buyEnergy,
                label: formatMessage(messages.buyEnergy),
                active: headRoute === PATHS.buyEnergy.id,
                path: PATHS.buyEnergy.path
            },
            {
                id: PATHS.directTrading.id,
                icon: icons.directTrading,
                label: formatMessage(messages.directTrading),
                active: headRoute === PATHS.directTrading.id,
                path: PATHS.directTrading.path,
                disabled: true
            },
            {
                id: PATHS.profile.id,
                icon: icons.profile,
                label: formatMessage(messages.profile),
                active: headRoute === PATHS.profile.id,
                path: PATHS.profile.path
            }
        ];

        const footerItems = [
            {
                href: PATHS.about.path,
                label: formatMessage(messages.about),
                active: pathname === PATHS.about.path
            },
            {
                href: PATHS.termsAndConditions.path,
                label: formatMessage(messages.termsAndConditions),
                active: pathname === PATHS.termsAndConditions.path
            },
            {
                href: PATHS.faq.path,
                label: formatMessage(messages.faq),
                active: pathname === PATHS.faq.path
            }
        ];

        return (
            <div className="app">
                <Confirm
                    labels={{
                        message: formatMessage(messages.logoutConfirmMessage),
                        confirmButton: formatMessage(messages.logoutConfirmButton),
                        cancelButton: formatMessage(messages.logoutCancelButton)
                    }}
                    show={isConfirmVisible}
                    onConfirm={() => performLogout()}
                    onCancel={() => this.handleLogoutCancel()}
                />
                <Header
                    logoutLabel={formatMessage(messages.logoutLabel)}
                    onLogoutClick={() => this.logout(formatMessage(messages.logoutConfirm))}
                    menuBarIcon={this.state.isMenuBarOpen ? 'faArrowRight' : 'faBars'}
                    menuBarLabel={formatMessage(messages.menuBarLabel)}
                    onToggleMenuBar={() => this.setState(state => ({ isMenuBarOpen: !state.isMenuBarOpen }))}
                    breadCrumbs={this.props.breadCrumbs}
                    onBreadCrumbsClick={route => this.navigateTo(route)}
                    onLogoClick={() => this.navigateTo(PATHS.overview.path)}
                    locales={LOCALES}
                    locale={locale || DEFAULT_LOCALE}
                    onLocaleChange={locale => performSetupLocale(locale)}
                />
                <div
                    className={classNames({
                        content: true,
                        'content--de-emphasized': this.state.isMenuBarOpen
                    })}
                    onClick={event => this.handleDeEmphasizedContentClick(event.target)}
                >
                    <div
                        aria-live="polite"
                        className={classNames({
                            'menu-container': true,
                            'menu-container--opened': this.state.isMenuBarOpen
                        })}
                    >
                        <MenuSideBar
                            items={menuItems}
                            onSelect={id => {
                                this.setState({ isMenuBarOpen: false });
                                this.navigateTo(id);
                            }}
                        />
                    </div>
                    <div role="feed" id="main-container">
                        <main>{this.props.children}</main>
                        <Footer
                            addressLabel={formatMessage(messages.address)}
                            navItems={footerItems}
                            onSelect={href => this.navigateTo(href)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object,
    intl: PropTypes.object
};
App.propTypes = {
    loggingOut: PropTypes.bool,
    locale: PropTypes.string,
    loading: PropTypes.bool
};
App.defaultProps = {
    loading: false
};

export default connect(App.mapStateToProps)(App);
