import React from 'react';
import { shallow } from 'enzyme';
import OfferForm from '../OfferForm';

function renderComponent({ ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<OfferForm {...otherProps} />);
}

describe('<OfferForm /> component', () => {
    it('should renders without errors', () => {
        renderComponent();
    });

    it('should renders with initial values', () => {
        const offerMock = {
            salePrice: 2.9,
            plantType: 'biomass',
            annualProduction: '47.8',
            capacity: '312',
            date: parseInt(Date.now() / 1000, 10),
            location: 'test location',
            description: 'Test description'
        };
        const offerForm = renderComponent({ formData: offerMock });

        expect(offerForm.state()).toEqual(offerMock);
    });

    it('should renders with delete button', () => {
        const offerForm = renderComponent({ onDelete: jest.fn() });

        expect(offerForm.find('.offer-form-delete-button')).toHaveLength(1);
    });

    it('should update state when fields values was changed', () => {
        const timestampMock = parseInt(Date.now() / 1000, 10);
        const offerForm = renderComponent({ marketPrice: 2.5 });

        offerForm
            .find('DeltaField')
            .props()
            .onChange({ value: 3.5, delta: 1 });
        offerForm
            .find('SelectField')
            .props()
            .onChange({ value: 'other', title: 'Other' });
        offerForm
            .find('TextField[name="annualProduction"]')
            .props()
            .onChange({
                currentTarget: { name: 'annualProduction', value: 'annualProduction test' }
            });
        offerForm
            .find('TextField[name="capacity"]')
            .props()
            .onChange({
                currentTarget: { name: 'capacity', value: 'capacity test' }
            });
        offerForm
            .find('DateField')
            .props()
            .onChange(timestampMock);
        offerForm
            .find('TextField[name="location"]')
            .props()
            .onChange({
                currentTarget: { name: 'location', value: 'location test' }
            });
        offerForm
            .find('TextField[name="description"]')
            .props()
            .onChange({
                currentTarget: { name: 'description', value: 'description test' }
            });

        expect(offerForm.state()).toEqual({
            salePrice: 3.5,
            plantType: 'other',
            annualProduction: 'annualProduction test',
            capacity: 'capacity test',
            date: timestampMock,
            location: 'location test',
            description: 'description test'
        });
    });

    it('should calls onSubmit callback', () => {
        const onSubmitMock = jest.fn();
        const offerForm = renderComponent({ onSubmit: onSubmitMock });

        offerForm.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(onSubmitMock).toHaveBeenCalledWith(offerForm.state());
    });

    it('should not calls onSubmit callback if onSubmit is not a function', () => {
        const offerForm = renderComponent();
        offerForm.find('form').simulate('submit', { preventDefault: jest.fn() });
    });

    it('should calls onDelete callback', () => {
        const onDeleteMock = jest.fn();
        const offerForm = renderComponent({ onDelete: onDeleteMock });

        offerForm.find('.offer-form-delete-button').simulate('click');
        expect(onDeleteMock).toHaveBeenCalled();
    });
});
