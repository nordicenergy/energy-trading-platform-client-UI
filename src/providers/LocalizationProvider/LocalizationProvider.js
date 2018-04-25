import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import localeDataEN from 'react-intl/locale-data/en';
import localeDataDE from 'react-intl/locale-data/de';
import moment from 'moment';
import 'moment/locale/de';
import 'moment/locale/en-gb';
import { DEFAULT_LOCALE } from '../../constants';
import translations from '../../services/translations';

export class LocalizationProvider extends Component {
    static mapStateToProps({ App }) {
        return { locale: App.localization.data.locale || DEFAULT_LOCALE };
    }

    constructor(props) {
        super(props);

        addLocaleData(localeDataEN);
        addLocaleData(localeDataDE);
        moment.locale(props.locale);
    }

    componentDidUpdate(prevProps) {
        const { locale } = this.props;

        if (locale !== prevProps.locale) {
            document.documentElement.setAttribute('lang', locale);
            moment.locale(locale);
        }
    }

    render() {
        const { children, locale } = this.props;

        return (
            <IntlProvider locale={locale} messages={translations[locale]}>
                {Children.only(children)}
            </IntlProvider>
        );
    }
}

LocalizationProvider.propTypes = {
    locale: PropTypes.string,
    children: PropTypes.node
};

export default connect(LocalizationProvider.mapStateToProps)(LocalizationProvider);
