import React from 'react';
import App from '../App';
import { shallowWithIntl } from '../../../services/intlTestHelper';

function renderComponent(context = {}) {
    return shallowWithIntl(<App context={context} />);
}

describe('Main <App /> Component', () => {
    it(`should contains following controls:
        - <div> with class "app";
        - <img> with class "app-logo"
        - <h1> with class "app-title"
        - <p> with class "app-intro"`, done => {
        const component = renderComponent();
        const text = component.debug();

        expect(text.includes('div className="app"')).toEqual(true);
        expect(
            text.includes('img') && text.includes(' className="app-title"')
        ).toEqual(true);
        expect(text.includes('h1 className="app-title"')).toEqual(true);
        expect(text.includes('p className="app-intro"')).toEqual(true);
        // expect(
        //     text.includes('button') && text.includes('Open Test Page')
        // ).toEqual(true);

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
