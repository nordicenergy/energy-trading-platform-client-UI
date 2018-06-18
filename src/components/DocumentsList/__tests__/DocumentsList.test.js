import React from 'react';
import { mount } from 'enzyme';
import DocumentsList from '../DocumentsList';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Spinner from '../../Loader/Spinner';

const DOCUMENTS_MOCKS = [
    { id: 1, dateOfCreation: '2017-01-31', Name: 'Invoice', link: '/test1.pdf' },
    { id: 2, dateOfCreation: '2017-02-31', Name: 'Monthly Installment', link: '/test2.pdf' },
    { id: 3, dateOfCreation: '2017-03-31', Name: 'Annual bill', link: '/test3.pdf' },
    { id: 4, dateOfCreation: '2017-04-31', Name: 'Monthly Installment', link: '/test4.pdf' },
    { id: 5, dateOfCreation: '2017-05-31', Name: 'Monthly Installment', link: '/test5.pdf' },
    { id: 6, dateOfCreation: '2017-06-31', Name: 'Monthly Installment', link: '/test6.pdf' },
    { id: 7, dateOfCreation: '2017-07-31', Name: 'Monthly Installment', link: '/test7.pdf' },
    { id: 8, dateOfCreation: undefined, Name: undefined, link: undefined }
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

        expect(rowData.at(count++).text()).toEqual('2017-01-31');
        expect(rowData.at(count++).text()).toEqual('Invoice');

        const iconTd = rowData.at(count++);
        const link = iconTd.find('a').at(0);
        expect(
            link
                .find('a')
                .at(0)
                .prop('href')
                .includes('/test1.pdf')
        ).toBeTruthy();
    });

    it('should display correct data in table when some properties are undefined', () => {
        const component = renderComponent({
            documents: DOCUMENTS_MOCKS
        });
        const row = component.find('tr').at(7);
        const rowData = row.find('td');
        let count = 0;

        expect(rowData.at(count++).text()).toEqual('-');
        expect(rowData.at(count++).text()).toEqual('-');

        const iconTd = rowData.at(count++);
        const link = iconTd.find('a').at(0);
        expect(
            link
                .find('a')
                .at(0)
                .prop('href')
        ).toEqual(null);
    });
});
