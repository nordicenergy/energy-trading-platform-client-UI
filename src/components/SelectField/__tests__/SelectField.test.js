import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectField from '../SelectField';

const optionsMock = [
    { value: 'wind', title: 'Wind' },
    { value: 'biomass (peat)', title: 'Biomass (peat)' },
    { value: 'biomass (corn)', title: 'Biomass (corn)' },
    { value: 'solar', title: 'Solar' },
    { value: 'renewable', title: 'Renewable' }
];
function renderComponent({ id = 'test', options = optionsMock, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<SelectField id={id} options={optionsMock} {...otherProps} />);
}

describe('<SelectField /> component', () => {
    it('should renders without errors', () => {
        const selectField = renderComponent({}, mount);

        expect(selectField.instance().layoutRef.classList.contains('select-field-layout')).toBeTruthy();
    });

    it('should display options when field in focus', () => {
        const selectField = renderComponent({}, mount);
        const eventMock = new Event('click');
        Object.defineProperty(eventMock, 'target', {
            writable: false,
            value: selectField.instance().layoutRef.firstElementChild
        });

        document.body.dispatchEvent(eventMock);
        selectField.update();
        expect(selectField.find('.options-list-item')).toHaveLength(5);
        expect(selectField.find('.options-list-item--selected')).toHaveLength(1);

        document.body.dispatchEvent(eventMock);
        selectField.update();
        expect(selectField.find('.options-list-item')).toHaveLength(0);
    });

    it('should update state after some option was clicked', () => {
        const selectField = renderComponent();

        selectField.setState({ isFocused: true });
        selectField.update();
        selectField
            .find('.options-list-item')
            .at(2)
            .simulate('mouseDown');
        expect(selectField.state().selectedOption).toEqual(optionsMock[2]);
    });

    it('should call onChange callback after some option was clicked', () => {
        const onChangeMock = jest.fn();
        const selectField = renderComponent({ value: optionsMock[1], onChange: onChangeMock });

        selectField.setState({ isFocused: true });
        selectField.update();
        selectField
            .find('.options-list-item')
            .at(2)
            .simulate('mouseDown');
        expect(onChangeMock).toHaveBeenCalledWith(optionsMock[2]);
    });

    it('should remove event listener before component unmount', () => {
        jest.spyOn(document.body, 'removeEventListener');

        const selectField = renderComponent();
        const handleBodyClick = selectField.instance().handleBodyClick;

        selectField.unmount();
        expect(document.body.removeEventListener).toHaveBeenCalledWith('click', handleBodyClick);

        document.body.removeEventListener.mockRestore();
    });
});
