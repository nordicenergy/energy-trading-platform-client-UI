import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { LocalizationProvider } from '../LocalizationProvider';

function renderComponent(props, mountFn = shallow) {
    return mountFn(
        <LocalizationProvider {...props}>
            <div />
        </LocalizationProvider>
    );
}

describe('<LocalizationProvider /> provider', () => {
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
            locale: 'en'
        });
    });

    it('should update locale', () => {
        jest.spyOn(moment, 'locale');
        const localizationProvider = renderComponent();

        localizationProvider.setProps({ locale: 'test' });
        localizationProvider.update();

        expect(document.documentElement.getAttribute('lang')).toBe('test');
        expect(moment.locale).toHaveBeenCalledWith('test');
    });
});
