import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { LocalizationProvider } from '../LocalizationProvider';
import * as appActions from '../../../action_performers/app';

function renderComponent(props, mountFn = shallow) {
    return mountFn(
        <LocalizationProvider {...props}>
            <div />
        </LocalizationProvider>
    );
}

describe('<LocalizationProvider /> provider', () => {
    beforeEach(() => {
        appActions.performSetupLocale = jest.fn();
    });

    it('should renders without errors', () => {
        renderComponent();
    });

    it('should returns correct props', () => {
        expect(
            LocalizationProvider.mapStateToProps({
                App: {
                    localization: {
                        data: {
                            locale: 'test'
                        }
                    }
                }
            })
        ).toEqual({
            locale: 'test'
        });
        expect(
            LocalizationProvider.mapStateToProps({
                App: {
                    localization: {
                        data: {
                            locale: null
                        }
                    }
                }
            })
        ).toEqual({
            locale: null
        });
    });

    it('should update locale', () => {
        jest.spyOn(moment, 'locale');
        const localizationProvider = renderComponent();
        expect(appActions.performSetupLocale).toHaveBeenCalledWith('en');

        localizationProvider.setProps({ locale: 'de' });
        localizationProvider.update();

        expect(document.documentElement.getAttribute('lang')).toBe('de');
        expect(moment.locale).toHaveBeenCalledWith('de');
    });
});
