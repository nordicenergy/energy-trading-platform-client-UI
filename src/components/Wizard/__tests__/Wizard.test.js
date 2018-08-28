import React from 'react';
import { mount } from 'enzyme';
import Wizard from '../Wizard';

const dummySteps = [{ number: 1, title: 'Step 1' }, { number: 2, title: 'Step 2' }, { number: 3, title: 'Step 3' }];

function renderComponent({ steps = dummySteps, ...otherProps } = {}, mountFn = mount) {
    return mountFn(<Wizard steps={steps} {...otherProps} />);
}

describe('<Wizard /> component', () => {
    it('should render with necessary elements', () => {
        const wizard = renderComponent();

        expect(wizard.find('.wizard-progress')).toHaveLength(1);
        expect(wizard.find('Step')).toHaveLength(3);
        expect(wizard.instance().wizardRef).toBeInstanceOf(HTMLDivElement);
        expect(Object.keys(wizard.instance().stepRefs)).toHaveLength(3);
        expect(Object.values(wizard.instance().stepRefs).every(ref => ref instanceof Wizard.Step)).toBeTruthy();
    });

    it('should add event listener on `resize` event', () => {
        jest.spyOn(window, 'addEventListener');
        const wizard = renderComponent();

        expect(window.addEventListener).toHaveBeenCalledWith('resize', wizard.instance().handleWindowResize);
    });

    it('should add remove listener on `resize` event', () => {
        jest.spyOn(window, 'removeEventListener');
        const wizard = renderComponent();
        const eventListener = wizard.instance().handleWindowResize;

        wizard.unmount();
        expect(window.removeEventListener).toHaveBeenCalledWith('resize', eventListener);
    });

    it('should calculate correct progress bar length when set new active step', () => {
        const wizard = renderComponent();

        Object.defineProperty(wizard.instance().wizardRef, 'offsetWidth', { value: 1000 });
        jest.spyOn(wizard.instance().stepRefs[2], 'getOffsetX').mockReturnValue(500);

        wizard.setProps({ activeStep: 2 });
        wizard.update();

        expect(wizard.state().scaleX).toBe(500 / 1000);
        expect(wizard.find('.wizard-progress').props().style.transform).toBe(`scaleX(${500 / 1000})`);
    });

    it('should cancel current animation frame', () => {
        jest.spyOn(window, 'requestAnimationFrame').mockReturnValue(1);
        jest.spyOn(window, 'cancelAnimationFrame');
        renderComponent();

        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('resize'));
        expect(window.cancelAnimationFrame).toHaveBeenCalledWith(1);
    });

    it('should calculate correct progress bar length when change window size', () => {
        const wizard = renderComponent();

        Object.defineProperty(wizard.instance().wizardRef, 'offsetWidth', { value: 1000 });
        jest.spyOn(wizard.instance().stepRefs[1], 'getOffsetX').mockReturnValue(500);
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());

        window.dispatchEvent(new Event('resize'));
        wizard.update();

        expect(wizard.state().scaleX).toBe(500 / 1000);
        expect(wizard.find('.wizard-progress').props().style.transform).toBe(`scaleX(${500 / 1000})`);
    });
});
