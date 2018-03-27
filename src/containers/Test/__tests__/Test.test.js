import React from 'react';
import { shallow } from 'enzyme';
import { Test } from '../Test';

function renderComponent() {
    return shallow(<Test />);
}

describe('<Test /> Component', () => {
    const component = renderComponent();

    it('should contains <div> with class "Test"', done => {
        expect(component.debug().includes('div className="test"')).toEqual(
            true
        );
        done();
    });
});
