import React from 'react';
import AboutContainer, { About } from '../About';
import { shallowWithIntl, mountWithIntl } from '../../../services/intlTestHelper';
import { Provider } from 'react-redux';
import * as notificationActions from '../../../action_performers/notifications';
import * as aboutActionPerformers from '../../../action_performers/aboutUs';
import configureMockStore from 'redux-mock-store';

const context = {
    intl: {
        formatMessage: jest.fn()
    }
};

const mockStore = configureMockStore();
const store = mockStore({
    App: {
        locale: 'en'
    },
    AboutUs: {
        data: ['test1', 'test2'],
        error: null,
        loading: false
    }
});

const props = {
    loading: false,
    paragraphs: ['p1', 'p2'],
    error: null,
    locale: 'en'
};

function renderContainer(mountFn = mountWithIntl) {
    return mountFn(
        <Provider store={store}>
            <AboutContainer context={context} />
        </Provider>
    );
}

function renderComponent(mountFn = shallowWithIntl) {
    return mountFn(<About {...props} context={context} />);
}

describe('<About /> Component', () => {
    beforeEach(() => {
        notificationActions.performPushNotification = jest.fn();
        aboutActionPerformers.performGetAboutUsInfo = jest.fn();
    });

    it(`should contains following controls:
        - <div> with class "about-page";
        - 1 <h1>;
        - 2 <p>`, () => {
        const component = renderContainer();

        expect(component.find('.about-page')).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
        expect(component.find('p')).toHaveLength(2);
    });

    it('should returns correct props map', () => {
        const stateDummy = {
            App: {
                locale: 'test_locale'
            },
            AboutUs: {
                data: 'test_data',
                error: 'test_error',
                loading: 'test_loading'
            }
        };
        const props = About.mapStateToProps(stateDummy);
        expect(props).toEqual({
            locale: 'test_locale',
            paragraphs: 'test_data',
            error: 'test_error',
            loading: 'test_loading'
        });
    });

    it('should perform related actions on did mount step', () => {
        renderContainer();
        expect(aboutActionPerformers.performGetAboutUsInfo).toHaveBeenCalledTimes(1);

        const component = renderComponent();
        expect(aboutActionPerformers.performGetAboutUsInfo).toHaveBeenCalledTimes(2);

        component.setProps({ locale: 'de' });
        expect(aboutActionPerformers.performGetAboutUsInfo).toHaveBeenCalledTimes(3);
        console.log(aboutActionPerformers.performGetAboutUsInfo);
        const [, , [locale]] = aboutActionPerformers.performGetAboutUsInfo.mock.calls;
        expect(locale).toEqual('de');

        component.setProps({ error: { message: 'Error Message' } });
        expect(notificationActions.performPushNotification).toHaveBeenCalledTimes(1);
        const [[error]] = notificationActions.performPushNotification.mock.calls;
        expect(error).toEqual({ message: 'Error Message', type: 'error' });
    });
});
