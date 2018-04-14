import React from 'react';
import { shallow } from 'enzyme';
import Confirm from '../Confirm';

const labelsMock = {
    message: 'Test',
    confirmButton: 'Yes',
    cancelButton: 'No'
};

function renderComponent({ labels = labelsMock, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<Confirm labels={labels} {...otherProps} />);
}

describe('<Confrim /> component', () => {
    it('should renders without errors', () => {
        const confirm = renderComponent();

        expect(confirm.find('.confirm-dialog-message').text()).toBe(labelsMock.message);
        expect(
            confirm
                .find('button')
                .at(0)
                .text()
        ).toBe(labelsMock.confirmButton);
        expect(
            confirm
                .find('button')
                .at(1)
                .text()
        ).toBe(labelsMock.cancelButton);

        confirm.setProps({ show: true });
        expect(confirm.hasClass('confirm--show')).toBeTruthy();
    });

    it('should calls onConfirm callback', () => {
        const onConfirmMock = jest.fn();
        const confirm = renderComponent({ onConfirm: onConfirmMock });

        confirm
            .find('button')
            .at(0)
            .simulate('click');
        expect(onConfirmMock).toHaveBeenCalled();
    });

    it('should calls onCancel callback', () => {
        const onCancelMock = jest.fn();
        const confirm = renderComponent({ onCancel: onCancelMock });

        confirm
            .find('button')
            .at(1)
            .simulate('click');
        expect(onCancelMock).toHaveBeenCalled();
    });
});
