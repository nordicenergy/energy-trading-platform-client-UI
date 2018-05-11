import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Swiper from 'swiper/dist/js/swiper'; // full import for fix build error
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/fontawesome-free-solid';
import OfferCard, { OfferPropType } from '../OfferCard';
import './OffersSlider.css';

class OffersSlider extends Component {
    componentDidMount() {
        this.slider = new Swiper(this.sliderContainerRef, {
            autoHeight: true,
            grabCursor: true,
            watchOverflow: true,
            containerModifierClass: 'offers-slider-container-',
            slideClass: 'offers-slider-slide',
            wrapperClass: 'offers-slider-wrapper',
            navigation: {
                nextEl: this.sliderNextRef,
                prevEl: this.sliderPrevRef,
                disabledClass: 'offers-slider-control--disabled',
                hiddenClass: 'offers-slider-control--hidden'
            },
            pagination: {
                el: this.sliderPaginationRef,
                clickable: true,
                bulletClass: 'offers-slider-bullet',
                bulletActiveClass: 'offers-slider-bullet--active',
                modifierClass: 'offers-slider-pagination-',
                clickableClass: 'offers-slider-pagination--clickable'
            },
            slidesPerView: 5,
            breakpoints: {
                1920: {
                    slidesPerView: 4
                },
                1600: {
                    slidesPerView: 3
                },
                1280: {
                    slidesPerView: 2
                },
                640: {
                    slidesPerView: 1
                }
            }
        });
    }

    componentWillUnmount() {
        this.slider.destroy();
    }

    render() {
        const { className, offers, onOfferClick } = this.props;
        const classes = classNames('offers-slider', className);

        return (
            <div className={classes}>
                <div className="offers-slider-layout">
                    <button
                        ref={ref => (this.sliderPrevRef = ref)}
                        className="offers-slider-control offers-slider-control--prev"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className="offers-slider-container" ref={ref => (this.sliderContainerRef = ref)}>
                        <div className="offers-slider-wrapper">
                            {offers.map((offer, index) => (
                                <div key={`${index}-${offer.price}`} className="offers-slider-slide">
                                    <OfferCard offer={offer} onClick={() => onOfferClick(offer.id)} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        ref={ref => (this.sliderNextRef = ref)}
                        className="offers-slider-control offers-slider-control--next"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
                <div ref={ref => (this.sliderPaginationRef = ref)} className="offers-slider-pagination" />
            </div>
        );
    }
}

OffersSlider.propTypes = {
    className: PropTypes.string,
    offers: PropTypes.arrayOf(OfferPropType),
    onOfferClick: PropTypes.func
};
OffersSlider.defaultProps = {
    offers: [],
    onOfferClick: f => f
};

export default OffersSlider;
