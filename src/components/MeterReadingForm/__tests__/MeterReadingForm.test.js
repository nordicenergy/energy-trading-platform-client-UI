import React from 'react';
import { shallow, mount } from 'enzyme';
import MeterReadingForm from '../MeterReadingForm';
import { TextField, DateField, Button } from '../../index';

const DEFAULT_LABELS = {
    meterReadingsField: 'Meter readings',
    dateField: 'Date of reading',
    commentField: 'Comment',
    submitButton: 'Submit'
};

const MOCK_FORM_DATA = {
    meterReadings: 'new meterReadings',
    date: 'new date',
    comment: 'new comment'
};

function renderComponent({ errors = {}, onSubmit = () => {}, labels = DEFAULT_LABELS } = {}, renderer = shallow) {
    return renderer(<MeterReadingForm errors={errors} labels={labels} onSubmit={onSubmit} />);
}

describe('<MeterReadingForm /> Component', () => {
    it(`should contains following elements: 
        - <TextField /> elements;
        - <DateField /> element;
        - <Button /> elements;
        with specific properties
    `, () => {
        const component = renderComponent();

        expect(component.find(TextField)).toHaveLength(2);
        expect(component.find(DateField)).toHaveLength(1);
        expect(component.find(Button)).toHaveLength(1);
    });

    it('should contains elements with specific properties', () => {
        const component = renderComponent({
            labels: {
                meterReadingsField: 'Meter readings test',
                dateField: 'Date of reading test',
                commentField: 'Comment test',
                submitButton: 'Submit test'
            },
            errors: {
                meterReadings: 'meterReadings error',
                comment: 'comment error'
            }
        });
        component.setState(MOCK_FORM_DATA);

        const textFields = component.find(TextField);
        const dateFields = component.find(DateField);
        const buttons = component.find(Button);

        const meterReadingTextField = textFields.at(0);
        expect(meterReadingTextField.props().name).toEqual('meterReadings');
        expect(meterReadingTextField.props().label).toEqual('Meter readings test');
        expect(meterReadingTextField.props().value).toEqual('new meterReadings');
        expect(meterReadingTextField.props().addon).toEqual('kWh');
        expect(typeof meterReadingTextField.props().onChange).toBe('function');
        expect(meterReadingTextField.props().error).toEqual('meterReadings error');
        expect(
            meterReadingTextField
                .html()
                .includes(
                    '<span>Number of meter: <span class="meter-reading-form-field-helper-text">1225678936</span></span>'
                )
        ).toEqual(true);

        const commentTextField = textFields.at(1);
        expect(commentTextField.props().name).toEqual('comment');
        expect(commentTextField.props().label).toEqual('Comment test');
        expect(commentTextField.props().value).toEqual('new comment');
        expect(commentTextField.props().error).toEqual('comment error');
        expect(typeof commentTextField.props().onChange).toBe('function');

        const dateField = dateFields.at(0);
        expect(dateField.props().name).toEqual('date');
        expect(dateField.props().label).toEqual('Date of reading test');
        expect(dateField.props().value).toEqual('new date');
        expect(typeof dateField.props().onChange).toBe('function');

        const submitButton = buttons.at(0);
        expect(submitButton.props().type).toEqual('primary');
        expect(submitButton.html().includes('Submit')).toEqual(true);
    });

    it('should update state if data field value change', () => {
        const component = renderComponent();

        component
            .find('DateField[name="date"]')
            .props()
            .onChange({
                name: 'date',
                value: 'test date'
            });
        component
            .find('TextField[name="meterReadings"]')
            .props()
            .onChange({
                target: {
                    name: 'meterReadings',
                    value: 'test meterReadings'
                }
            });
        component
            .find('TextField[name="comment"]')
            .props()
            .onChange({
                target: {
                    name: 'comment',
                    value: 'test comment'
                }
            });
        expect(component.state().meterReadings).toBe('test meterReadings');
        expect(component.state().date).toBe('test date');
        expect(component.state().comment).toBe('test comment');
    });

    it('should call onSubmit data when form was submitted', () => {
        const onSubmitStub = jest.fn();

        const component = renderComponent({ onSubmit: onSubmitStub });
        component.setState(MOCK_FORM_DATA);

        component.find('form').simulate('submit', { preventDefault: () => null });
        expect(onSubmitStub).toHaveBeenCalledWith({
            meterReadings: 'new meterReadings',
            date: 'new date',
            comment: 'new comment'
        });
    });
});
