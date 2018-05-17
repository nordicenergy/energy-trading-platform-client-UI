import React from 'react';
import { shallow } from 'enzyme';
import LongPressButton from '../LongPressButton';

const onPressMock = jest.fn();
function renderComponent({ onPress = onPressMock, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<LongPressButton {...otherProps} onPress={onPress} />);
}

describe('<LongPressButton /> component', () => {
    jest.useFakeTimers();

    afterEach(() => {
        onPressMock.mockClear();
    });

    it('should renders without errors', () => {
        renderComponent();
    });

    it('should updates state and calls onPress if button was pressed', () => {
        const longPressButton = renderComponent();

        longPressButton.find('button').simulate('mousedown');
        expect(longPressButton.state().isPressed).toBeTruthy();
        expect(onPressMock).toHaveBeenCalled();

        longPressButton.find('button').simulate('mouseup');
        expect(longPressButton.state().isPressed).toBeFalsy();
    });

    it('should updates state and calls onPress if button was pressed by enter key', () => {
        const longPressButton = renderComponent();

        longPressButton.find('button').simulate('keydown', { key: 'Enter' });
        expect(longPressButton.state().isPressed).toBeTruthy();
        expect(onPressMock).toHaveBeenCalled();

        longPressButton.find('button').simulate('keyup', { key: 'Enter' });
        expect(longPressButton.state().isPressed).toBeFalsy();

        longPressButton.find('button').simulate('keydown', { key: 'Enter' });
        longPressButton.find('button').simulate('keyup', { key: 'Backspace' });
        expect(longPressButton.state().isPressed).toBeTruthy();

        longPressButton.find('button').simulate('keyup', { key: 'Enter' });
        longPressButton.find('button').simulate('keydown', { key: 'Backspace' });
    });

    it('should not calls onPress if onPress is not a function', () => {
        const longPressButton = renderComponent({ onPress: null });

        longPressButton.find('button').simulate('mousedown');
        expect(onPressMock).not.toHaveBeenCalled();
    });

    it('should calls onPress during button was pressing', () => {
        jest.spyOn(window, 'clearTimeout').mockImplementation(jest.fn());
        jest.spyOn(window, 'setInterval').mockReturnValue('test id');
        const longPressButton = renderComponent();

        longPressButton.setState({ isPressed: true });
        longPressButton.update();
        expect(window.clearTimeout).toHaveBeenCalled();

        jest.runAllTimers();
        expect(window.setInterval).toHaveBeenCalled();
        const [[callback, delay]] = window.setInterval.mock.calls;
        expect(delay).toBe(50);
        callback();
        expect(onPressMock).toHaveBeenCalled();

        onPressMock.mockClear();
        window.clearTimeout.mockClear();
        longPressButton.setState({ isPressed: false });
        expect(window.clearTimeout).toHaveBeenCalledWith('test id');

        window.clearTimeout.mockRestore();
        window.setInterval.mockRestore();
    });
});
