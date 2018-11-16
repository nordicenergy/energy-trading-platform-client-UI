import React from 'react';
import { shallow, mount } from 'enzyme';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import Step from '../Step';

function renderComponent({ number = 1, title = 'Step 1', ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<Step number={number} title={title} {...otherProps} />);
}

describe('<Wizard.Step /> component', () => {
    it('should render with necessary components', () => {
        const step = renderComponent();

        expect(step.find('.wizard-step-icon')).toHaveLength(1);
        expect(step.contains(<strong className="wizard-step-title">Step 1</strong>)).toBeTruthy();
    });

    it('should render active step', () => {
        const step = renderComponent({ isActive: true });

        expect(step.hasClass('wizard-step--active')).toBeTruthy();
    });

    it('should render succeed step', () => {
        const step = renderComponent({ isSucceed: true });

        expect(step.hasClass('wizard-step--succeed')).toBeTruthy();
        expect(step.contains(<FontAwesomeIcon icon={faCheck} />)).toBeTruthy();
    });

    it('should return X offset', () => {
        const step = renderComponent({}, mount);
        jest.spyOn(step.instance().buttonRef, 'getBoundingClientRect').mockReturnValue({ left: 50, right: 100 });

        expect(step.instance().getOffsetX()).toBe(75);
    });
});
