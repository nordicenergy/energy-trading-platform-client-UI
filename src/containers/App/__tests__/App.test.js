import React from 'react';
import App from '../App';
import Header from '../../../components/Header';
import { shallowWithIntl } from '../../../services/intlTestHelper';

function renderComponent(context = {}) {
    return shallowWithIntl(<App context={context} />);
}

describe('Main <App /> Component', () => {
    it(`should contains following controls:
        - <div> with class "app";
        - <Header> component"`, done => {
        const component = renderComponent();
        const text = component.debug();

        expect(text.includes('div className="app"')).toEqual(true);
        expect(component.find('Header')).toHaveLength(1);

        done();
    });

    // it('should provide possibility navigate to test page', done => {
    //     App.prototype.openTestPage = jest.fn();
    //     const component = renderComponent();
    //
    //     component
    //         .find('button')
    //         .at(0)
    //         .simulate('click');
    //     expect(App.prototype.openTestPage.mock.calls.length).toEqual(1);
    //
    //     done();
    // });
});
