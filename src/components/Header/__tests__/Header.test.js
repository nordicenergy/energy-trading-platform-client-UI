import React from 'react';
import Header from '../Header';
import HeaderButton from '../HeaderButton';
import Logo from '../../Logo';
import { mount } from 'enzyme';

const localesMock = ['en', 'de'];
const localeMock = 'en';
const navigateToMock = jest.fn();
const onLogoutButtonClickHandlerMock = jest.fn();
const onLocaleChangeMock = jest.fn();
function renderComponent(
    {
        notifications = [],
        locales = localesMock,
        navigateTo = navigateToMock,
        onLogoutButtonClickHandler = onLogoutButtonClickHandlerMock,
        locale = localeMock,
        onLocaleChange = onLocaleChangeMock,
        ...otherProps
    } = {},
    mountFn = mount
) {
    return mountFn(
        <Header
            notifications={notifications}
            navigateTo={navigateTo}
            onLogoutButtonClickHandler={onLogoutButtonClickHandler}
            locales={locales}
            locale={locale}
            onLocaleChange={onLocaleChange}
            {...otherProps}
        />
    );
}

describe('<Header /> Component', () => {
    afterEach(() => {
        navigateToMock.mockClear();
        onLogoutButtonClickHandlerMock.mockClear();
        onLocaleChangeMock.mockClear();
    });

    it(`should contains following controls:
        - header with class "header-desktop";
        - Logo;
        - LanguageSelect;
        - HeaderButton`, () => {
        const header = renderComponent({});

        expect(header.find('LanguageSelect')).toHaveLength(1);
        expect(header.find('HeaderButton')).toHaveLength(1);
        expect(header.find('Logo')).toHaveLength(1);
        expect(header.find('header.header-desktop')).toHaveLength(1);
    });

    it('should calls navigateTo callback', () => {
        const header = renderComponent();
        header
            .find('Breadcrumbs')
            .props()
            .onClick('/test');
        expect(navigateToMock).toHaveBeenCalledWith('/test');
    });

    it('should calls onLocaleChange callback', () => {
        const header = renderComponent();
        header
            .find('LanguageSelect')
            .props()
            .onChange('de');
        expect(onLocaleChangeMock).toHaveBeenCalledWith('de');
    });

    it('should call onLogoutButtonClickHandler after clicking on logout button', () => {
        const header = renderComponent();
        header
            .find('HeaderButton')
            .find('button')
            .simulate('click');
        expect(onLogoutButtonClickHandlerMock).toHaveBeenCalled();
    });

    it('should not calls onLogoutButtonClickHandler callback if onLogoutButtonClickHandler is not a function', () => {
        const header = renderComponent({ onLogoutButtonClickHandler: null });
        header
            .find('HeaderButton')
            .find('button')
            .simulate('click');
        expect(onLogoutButtonClickHandlerMock).not.toHaveBeenCalled();
    });
});
