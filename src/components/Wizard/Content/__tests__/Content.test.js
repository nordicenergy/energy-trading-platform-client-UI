import React from 'react';
import { shallow, mount } from 'enzyme';
import Content from '../Content';

const childrenStub = (
    <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, atque cum, debitis doloremque error illum ipsa
        minus nihil, nisi obcaecati quae temporibus veritatis voluptate? Dignissimos eius modi perspiciatis repellat
        temporibus.
    </div>
);

function renderComponent(
    {
        children = childrenStub,
        title = 'Step title',
        subTitle = 'Step subtitle',
        labels = { previousButton: 'Previous', nextButton: 'Next' },
        ...otherProps
    } = {},
    mountFn = shallow
) {
    return mountFn(
        <Content title={title} subTitle={subTitle} labels={labels} {...otherProps}>
            {children}
        </Content>
    );
}

describe('<Wizard.Content /> component', () => {
    it('should render with necessary components and children', () => {
        const content = renderComponent({}, mount);

        expect(content.contains(<h2 className="wizard-content-title">Step title</h2>)).toBeTruthy();
        expect(content.contains(<h3 className="wizard-content-subtitle">Step subtitle</h3>)).toBeTruthy();
        expect(content.contains(childrenStub)).toBeTruthy();
        expect(content.find('Button[type="primary"]')).toHaveLength(1);
        expect(content.find('Button[type="primary"]').text()).toBe('Next');
        expect(content.find('button.wizard-content-back-button')).toHaveLength(1);
        expect(
            content
                .find('button.wizard-content-back-button')
                .text()
                .trim()
        ).toBe('Previous');
    });

    it('should render without title', () => {
        const content = renderComponent({ title: '' });

        expect(content.find('.wizard-content-title')).toHaveLength(0);
    });

    it('should render without subtitle', () => {
        const content = renderComponent({ subTitle: '' });

        expect(content.find('.wizard-content-subtitle')).toHaveLength(0);
    });

    it('should render without previous button', () => {
        const content = renderComponent({ allowPreviousStep: false });

        expect(content.find('button.wizard-content-back-button')).toHaveLength(0);
    });

    it('should render without next button', () => {
        const content = renderComponent({ allowNextStep: false });

        expect(content.find('Button[type="primary"]')).toHaveLength(0);
    });

    it('should not throw error if `onPreviousButtonClick` is not given', () => {
        const content = renderComponent();

        expect(() => {
            content
                .find('button.wizard-content-back-button')
                .props()
                .onClick();
        }).not.toThrow();
    });

    it('should call `onPreviousButtonClick` callback', () => {
        const onPreviousButtonClick = jest.fn();
        const content = renderComponent({ onPreviousButtonClick });

        content
            .find('button.wizard-content-back-button')
            .props()
            .onClick();
        expect(onPreviousButtonClick).toHaveBeenCalled();
    });

    it('should not throw error if `onNextButtonClick` is not given', () => {
        const content = renderComponent();

        expect(() => {
            content
                .find('Button[type="primary"]')
                .props()
                .onClick();
        }).not.toThrow();
    });

    it('should call `onNextButtonClick` callback', () => {
        const onNextButtonClick = jest.fn();
        const content = renderComponent({ onNextButtonClick });

        content
            .find('Button[type="primary"]')
            .props()
            .onClick();
        expect(onNextButtonClick).toHaveBeenCalled();
    });
});
