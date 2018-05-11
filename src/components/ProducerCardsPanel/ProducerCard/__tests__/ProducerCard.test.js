import React from 'react';
import { shallow } from 'enzyme';
import ProducerCard from '../ProducerCard';

const producerDummy = {
    id: 1,
    price: 2.9,
    name: 'John Doe',
    plantType: 'solar',
    picture: 'test.png'
};
const onClickStub = jest.fn();
function renderComponent({ producer = producerDummy, onClick = onClickStub, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<ProducerCard producer={producer} onClick={onClick} {...otherProps} />);
}

describe('<ProducerCard /> component', function() {
    it('should renders without errors', () => {
        renderComponent();
    });

    it('should renders with default image', () => {
        const producerCard = renderComponent();
        const producerCardWithDefaultImage = renderComponent({ producer: { ...producerDummy, picture: null } });

        expect(producerCard.find('.producer-card').props().style.backgroundImage).toBe('url(test.png)');
        expect(producerCardWithDefaultImage.find('.producer-card').props().style.backgroundImage).toBe(
            'url(defaultImage.png)'
        );
    });

    it('should renders with selected style', () => {
        const producerCard = renderComponent({ selected: true });

        expect(producerCard.hasClass('producer-card--selected')).toBeTruthy();
    });

    it('should calls onClick callback', () => {
        const producerCard = renderComponent();

        producerCard.simulate('click');
        expect(onClickStub).toHaveBeenCalledWith(producerDummy.id);

        onClickStub.mockClear();
    });

    it('should not calls onClick callback if onClick is not function', () => {
        const producerCard = renderComponent({ onClick: null });

        producerCard.simulate('click');
    });
});
