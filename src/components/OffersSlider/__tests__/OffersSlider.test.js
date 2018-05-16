import React from 'react';
import { shallow, mount } from 'enzyme';
import Swiper from 'swiper/dist/js/swiper';
import OffersSlider from '../OffersSlider';

jest.mock('swiper/dist/js/swiper');

const offersMock = [
    {
        id: '01',
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        energyType: 'wind',
        price: 2.9
    },
    {
        id: '02',
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        energyType: 'biomass',
        price: 3.2
    },
    {
        id: '03',
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        energyType: 'solar',
        price: 4
    },
    {
        id: '04',
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        energyType: 'wind',
        price: 2.9
    },
    {
        id: '05',
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        energyType: 'biomass',
        price: 3.2
    },
    {
        id: '06',
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        energyType: 'solar',
        price: 4
    }
];
function renderComponent({ offers = offersMock, ...otherProps } = {}, mountFn = shallow) {
    return mountFn(<OffersSlider offers={offers} {...otherProps} />);
}

describe('<OffersSlider /> component', () => {
    it('should renders without errors', () => {
        const offersSlider = renderComponent();

        expect(Swiper).toHaveBeenCalledTimes(1);
        expect(offersSlider.find('OfferCard')).toHaveLength(6);
    });

    it('should destroy swiper when component was unmount', () => {
        const offersSlider = renderComponent();
        const destroyMock = jest.spyOn(offersSlider.instance().slider, 'destroy');

        offersSlider.unmount();
        expect(destroyMock).toHaveBeenCalled();
    });

    it('should sets correct refs', () => {
        const offersSlider = renderComponent({}, mount);
        const { sliderContainerRef, sliderPrevRef, sliderNextRef, sliderPaginationRef } = offersSlider.instance();

        expect(sliderContainerRef.classList.contains('offers-slider-container')).toBeTruthy();
        expect(sliderPrevRef.classList.contains('offers-slider-control--prev')).toBeTruthy();
        expect(sliderNextRef.classList.contains('offers-slider-control--next')).toBeTruthy();
        expect(sliderPaginationRef.classList.contains('offers-slider-pagination')).toBeTruthy();
    });

    it('should calls onOfferClick callback', () => {
        const onOfferClickMock = jest.fn();
        const offersSlider = renderComponent({ onOfferClick: onOfferClickMock });

        offersSlider
            .find('OfferCard')
            .at(1)
            .props()
            .onClick();
        expect(onOfferClickMock).toHaveBeenCalledWith('02');
    });

    it('should set default values at missing props and should not throw an error', () => {
        const offersSlider = renderComponent();

        offersSlider
            .find('OfferCard')
            .at(1)
            .props()
            .onClick();
        expect(offersSlider.exists()).toBeTruthy();
    });
});
