import React from 'react';
import { shallow } from 'enzyme';
import TextField from '../TextField';

function renderComponent(
    {
        label = 'Test field',
        helperText = 'Test helper text',
        ...otherProps
    } = {},
    mountFn = shallow
) {
    return mountFn(
        <TextField label={label} helperText={helperText} {...otherProps} />
    );
}

describe('<TextField /> component', () => {
    it(`should render:
        - label
        - input
        - helper text`, () => {
        const textField = renderComponent();

        expect(textField.find('.label')).toHaveLength(1);
        expect(textField.find('.input')).toHaveLength(1);
        expect(textField.find('.helper-text')).toHaveLength(1);
    });
});
