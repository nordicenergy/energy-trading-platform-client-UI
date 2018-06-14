import React from 'react';
import { mount } from 'enzyme';
import DocumentsList from '../DocumentsList';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Spinner from '../../Loader/Spinner';

const DOCUMENTS_MOCKS = [
    { id: '1', date: 1523707200, description: 'Invoice', url: 'https://test_url1' },
    { id: '2', date: 1523807200, description: 'Monthly Installment', url: 'https://test_url2' },
    { id: '3', date: 1523907200, description: 'Annual bill', url: 'https://test_url3' },
    { id: '4', date: 1523207200, description: 'Monthly Installment', url: 'https://test_url4' },
    { id: '5', date: 1523307200, description: 'Monthly Installment', url: 'https://test_url5' },
    { id: '6', date: 1523407200, description: 'Monthly Installment', url: 'https://test_url6' },
    { id: '7', date: 1523507200, description: 'Monthly Installment', url: 'https://test_url7' },
    { id: '8', date: undefined, description: undefined, url: undefined }
];

function renderComponent({ loading = false, pagination = false, documents = [] } = {}, renderer = mount) {
    return renderer(<DocumentsList documents={documents} loading={loading} pagination={pagination} />);
}

describe('<DocumentsList /> Component', () => {
    it(`should contains following elements: 
        - <table /> element;
        - <tbody /> element;
        - <FontAwesomeIcon /> elements;
    `, () => {
        const component = renderComponent({
            documents: DOCUMENTS_MOCKS
        });
        expect(component.find('table')).toHaveLength(1);
        expect(component.find('tbody')).toHaveLength(1);
        expect(component.find('tr')).toHaveLength(8);
        expect(component.find('td')).toHaveLength(24);
        expect(component.find(FontAwesomeIcon)).toHaveLength(8);
    });

    it('should show spinner when loading and pagination are enabled', () => {
        const component = renderComponent();
        expect(component.find(Spinner)).toHaveLength(0);

        component.setProps({ pagination: true, loading: true });

        expect(component.find(Spinner)).toHaveLength(1);
    });

    it('should display correct data in table', () => {
        const component = renderComponent({
            documents: DOCUMENTS_MOCKS
        });
        const rowData = component.find('td');
        let count = 0;

        expect(rowData.at(count++).text()).toEqual('Apr 14, 2018');
        expect(rowData.at(count++).text()).toEqual('Invoice');

        const iconTd = rowData.at(count++);
        const link = iconTd.find('a').at(0);
        expect(
            link
                .find('a')
                .at(0)
                .prop('href')
        ).toEqual('https://test_url1');
    });
});
