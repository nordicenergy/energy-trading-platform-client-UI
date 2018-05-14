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
            price: 2.9,
            plantType: 'biomass',
            annualProduction: '47.8',
            capacity: 312,
            date: parseInt(Date.now() / 1000, 10),
            city: 'test city',
            street: 'test street',
            postcode: 'test postcode',
            description: 'Test description',
            name: 'Test name'
        };
        const offerForm = renderComponent({ offer: offerMock });

        expect(offerForm.state()).toEqual({ ...offerMock, isEdited: false });
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
            .onChange({ name: 'price', value: 3.5, delta: 1 });
        offerForm
            .find('TextField[name="name"]')
            .props()
            .onChange({
                target: { name: 'name', value: 'name test' }
            });
        offerForm
            .find('SelectField[name="plantType"]')
            .props()
            .onChange({ value: 'other', name: 'plantType' });
        offerForm
            .find('TextField[name="annualProduction"]')
            .props()
            .onChange({
                target: { name: 'annualProduction', value: 'annualProduction test' }
            });
        offerForm
            .find('TextField[name="capacity"]')
            .props()
            .onChange({
                target: { name: 'capacity', value: 'capacity test' }
            });
        offerForm
            .find('DateField[name="date"]')
            .props()
            .onChange({ name: 'date', value: timestampMock });
        offerForm
            .find('TextField[name="city"]')
            .props()
            .onChange({
                target: { name: 'city', value: 'city test' }
            });
        offerForm
            .find('TextField[name="street"]')
            .props()
            .onChange({
                target: { name: 'street', value: 'street test' }
            });
        offerForm
            .find('TextField[name="postcode"]')
            .props()
            .onChange({
                target: { name: 'postcode', value: 'postcode test' }
            });
        offerForm
            .find('TextField[name="description"]')
            .props()
            .onChange({
                target: { name: 'description', value: 'description test' }
            });

        expect(offerForm.state()).toEqual({
            isEdited: true,
            price: 3.5,
            plantType: 'other',
            name: 'name test',
            annualProduction: 'annualProduction test',
            capacity: 'capacity test',
            date: timestampMock,
            city: 'city test',
            street: 'street test',
            postcode: 'postcode test',
            description: 'description test'
        });
    });

    it('should calls onSubmit callback', () => {
        const onSubmitMock = jest.fn();
        const offerForm = renderComponent({ onSubmit: onSubmitMock });

        offerForm.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(onSubmitMock).toHaveBeenCalledWith({
            price: 0,
            plantType: 'solar',
            annualProduction: '',
            capacity: 0,
            date: 0,
            city: '',
            street: '',
            postcode: '',
            description: '',
            name: ''
        });
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
