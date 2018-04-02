import React from 'react';
import Footer from '../Footer';
import { mount } from 'enzyme';

function renderComponent(props) {
    return mount(<Footer {...props} />);
}

describe('<Footer /> Component', () => {
    it(`should contains following controls:
        - <footer> with class 'app-footer';
        - <a> elements with correct labels;
        - <address> with provided label;`, done => {
        const component = renderComponent({
            navItems: [
                {
                    label: 'item1',
                    href: '#item1'
                },
                {
                    label: 'item2',
                    href: '#item2'
                }
            ],
            addressLabel: 'Company Address'
        });
        const text = component.debug();

        expect(text.includes('footer className="app-footer"')).toEqual(true);
        expect(component.find('address').length).toEqual(1);
        expect(text.includes('Company Address')).toEqual(true);
        expect(component.find('a').length).toEqual(2);
        expect(text.includes('item1')).toEqual(true);
        expect(text.includes('item1')).toEqual(true);

        done();
    });
});
