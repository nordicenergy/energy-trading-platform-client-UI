import React from 'react';
import Button from '../Button';
import { mount } from 'enzyme';

function renderComponent() {
    return mount(<Button>Test</Button>);
}

describe('<Button /> Component', () => {
    it(`should contains following controls:
        - <button> with class "button";
        - text "Test";`, done => {
        const component = renderComponent();
        const text = component.debug();

        expect(text.includes('button className="button"')).toEqual(true);
        expect(text.includes('Test')).toEqual(true);

        done();
    });
});
