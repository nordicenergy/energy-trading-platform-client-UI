import React from 'react';
import { shallow } from 'enzyme';
import LanguageSelect from '../LanguageSelect';

const localesMock = ['en', 'de'];
const localeMock = 'en';
const onChangeMock = jest.fn();

function renderComponent(
    { locales = localesMock, locale = localeMock, onChange = onChangeMock, ...otherProps } = {},
    mountFn = shallow
) {
    return mountFn(<LanguageSelect locales={locales} value={locale} onChange={onChange} {...otherProps} />);
}

describe('<LanguageSelect /> component', () => {
    afterEach(() => {
        onChangeMock.mockClear();
    });

    it('should renders without errors', () => {
        renderComponent();
    });

    it('should calls onChange callback', () => {
        const languageSelect = renderComponent();

        languageSelect
            .find('SelectField')
            .props()
            .onChange({ value: 'de', title: 'DE' });
        expect(onChangeMock).toHaveBeenCalledWith('de');
    });

    it('should not calls onChange callback if onChange is not a function', () => {
        const languageSelect = renderComponent({ onChange: null });

        languageSelect
            .find('SelectField')
            .props()
            .onChange({ value: 'de', title: 'DE' });
        expect(onChangeMock).not.toHaveBeenCalled();
    });
});
