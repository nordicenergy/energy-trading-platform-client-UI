import React from 'react';
import { shallow } from 'enzyme';
import ProducerCard from '../ProducerCard';

const producerMock = {
    id: 1,
    price: 2.9,
    name: 'John Doe',
    plantType: 'solar'
};
const onClickMock = jest.fn();

function renderComponent({ producer = producerMock, onClick = onClickMock, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<ProducerCard producer={producer} onClick={onClick} {...otherProps} />);
}

describe('<ProducerCard /> component', function() {
    it('should renders without errors', () => {
        renderComponent();
    });

    it('should renders with correct image', () => {
        let producerCard = renderComponent();
        expect(producerCard.html().includes('solarImage')).toBeTruthy();

        producerCard = renderComponent({
            producer: { ...producerMock, plantType: 'wind' }
        });
        expect(producerCard.html().includes('windImage')).toBeTruthy();

        producerCard = renderComponent({
            producer: { ...producerMock, plantType: 'biomass' }
        });
        expect(producerCard.html().includes('biomassImage')).toBeTruthy();

        producerCard = renderComponent({
            producer: { ...producerMock, plantType: 'default' }
        });
        expect(producerCard.html().includes('defaultImage')).toBeTruthy();
    });

    it('should renders with selected style', () => {
        const producerCard = renderComponent({ selected: true });

        expect(producerCard.hasClass('producer-card--selected')).toBeTruthy();
    });

    it('should calls onClick callback', () => {
        const producerCard = renderComponent();

        producerCard.simulate('click');
        expect(onClickMock).toHaveBeenCalledWith(producerMock.id);

        onClickMock.mockClear();
    });

    it('should not calls onClick callback if onClick is not function', () => {
        const producerCard = renderComponent({ onClick: null });

        producerCard.simulate('click');
        expect(onClickMock).not.toHaveBeenCalled();
    });
});
