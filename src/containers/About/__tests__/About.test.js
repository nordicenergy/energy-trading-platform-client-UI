import React from 'react';
import AboutContainer, { About } from '../About';
import { mountWithIntl } from '../../../services/intlTestHelper';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const context = {
    intl: {
        formatMessage: jest.fn()
    }
};

const mockStore = configureMockStore();
const store = mockStore({
    App: {
        localization: {
            data: {
                aboutUs: ['test1', 'test2']
            }
        }
    }
});

function renderContainer(mountFn = mountWithIntl) {
    return mountFn(
        <Provider store={store}>
            <AboutContainer context={context} />
        </Provider>
    );
}

describe('<About /> Component', () => {
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
                localization: {
                    data: {
                        aboutUs: 'test_data'
                    }
                }
            }
        };
        const props = About.mapStateToProps(stateDummy);
        expect(props).toEqual({
            paragraphs: 'test_data',
        });
    });
});
