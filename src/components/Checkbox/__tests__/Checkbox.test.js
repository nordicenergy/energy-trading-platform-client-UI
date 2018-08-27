import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from '../Checkbox';

function renderComponent({ id = 'test', name = 'test', ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<Checkbox id={id} name={name} {...otherProps} />);
}

describe('<Checkbox /> component', () => {
    it('should render with necessary elements', () => {
        const checkbox = renderComponent({ label: 'Test' });

        expect(checkbox.find('.checkbox')).toHaveLength(1);
        expect(checkbox.find('input[type="checkbox"].checkbox-native-control')).toHaveLength(1);
        expect(checkbox.find('.checkbox-control')).toHaveLength(1);
        expect(checkbox.contains(<span className="checkbox-label">Test</span>)).toBeTruthy();
    });

    it('should not throw an error if `onChange` property is not given', () => {
        const checkbox = renderComponent();

        expect(() => {
            checkbox.instance().props.onChange(new Event('change'));
        }).not.toThrow();
    });

    it("should update component's state and call `onChange` callback", () => {
        const onChangeStub = jest.fn();
        const eventStub = { target: { name: 'test', checked: true } };
        const checkbox = renderComponent({ onChange: onChangeStub });

        checkbox.find('.checkbox-native-control').simulate('change', eventStub);
        checkbox.update();

        expect(checkbox.instance().state.checked).toBeTruthy();
        expect(onChangeStub).toHaveBeenCalledWith(eventStub);
    });
});
