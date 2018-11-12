import React from 'react';
import { mountWithIntl, shallowWithIntl } from '../../../services/intlTestHelper';
import { SellEnergy } from '../SellEnergy';
import * as notificationsActions from '../../../action_performers/notifications';
import * as producersActions from '../../../action_performers/producers';
import * as userActions from '../../../action_performers/users';
import * as appActions from '../../../action_performers/app';

const offersDummy = [
    {
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        price: 2.9
    },
    {
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        price: 3.2
    },
    {
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        price: 4
    },
    {
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        price: 2.9
    },
    {
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        price: 3.2
    },
    {
        startPeriod: 1502236800,
        endPeriod: 1505001600,
        price: 4
    }
];

const ownedProducerDummy = {
    id: 3,
    name: 'John Doe',
    description: 'Green plant close to Hamburg run by a farmer, John Doe',
    picture: '/plantImg/peter_producer.jpg',
    capacity: 600,
    price: 6.4,
    plantType: 'solar',
    tradingStrategy: false,
    complete: false,
    productionOfLastDay: 240,
    street: 'Sesame Street',
    postcode: '12345',
    city: 'Berlin',
    country: 'DE',
    energyPurchased: 2400
};

const currentMarketPrice = 2.5;

const routerStub = {
    history: {
        push: jest.fn()
    }
};

function renderComponent(
    { offers = offersDummy, ownedProducerInfo = ownedProducerDummy, ...otherProps } = {},
    mountFn = shallowWithIntl
) {
    return mountFn(
        <SellEnergy
            offers={offers}
            ownedProducerOfferInfo={ownedProducerInfo}
            currentMarketPrice={currentMarketPrice}
            {...otherProps}
        />,
        {
            context: { router: routerStub }
        }
    );
}

describe('<SellEnergy /> container', () => {
    beforeEach(() => {
        appActions.performSetupLoaderVisibility = jest.fn();
        appActions.performSetupBreadcrumbs = jest.fn();
    });

    afterEach(() => {
        routerStub.history.push.mockClear();
    });

    it('should renders without errors', () => {
        const sellEnergy = renderComponent();
        expect(sellEnergy.find('OffersSlider')).toHaveLength(1);
    });

    it('should return correct props', () => {
        const stateMock = {
            Producers: {
                ownedProducerOffer: {
                    data: {
                        producer: ownedProducerDummy
                    },
                    loading: false,
                    error: null
                },
                ownedProducerOffersHistory: {
                    data: offersDummy,
                    error: null,
                    loading: false
                },
                currentMarketPrice: {
                    data: currentMarketPrice,
                    error: null,
                    loading: false
                }
            },
            Users: {
                profile: {
                    data: {
                        user: {
                            id: 'testUserId'
                        }
                    },
                    loading: false,
                    error: null
                }
            },
            App: {
                localization: {
                    data: {
                        locale: 'en'
                    }
                }
            }
        };
        const props = SellEnergy.mapStateToProps(stateMock);

        expect(props).toEqual({
            locale: 'en',
            offers: offersDummy,
            user: { id: 'testUserId' },
            ownedProducerOfferInfo: ownedProducerDummy,
            currentMarketPrice: 2.5,
            error: null,
            loading: false
        });
    });

    it('should not render offers slider if offers are not given', () => {
        const sellEnergy = renderComponent({ offers: [] });
        expect(sellEnergy.find('OffersSlider')).toHaveLength(0);
    });

    it('should go to the trading page when back link was clicked', () => {
        const sellEnergy = renderComponent();
        sellEnergy.find('BackLink').simulate('click', { preventDefault: jest.fn() });
        expect(routerStub.history.push).toHaveBeenCalledWith('/');
    });

    it('should call performGetUserData when component is mounted', () => {
        userActions.performGetUserData = jest.fn();
        producersActions.performGetCurrentMarketPrice = jest.fn();
        renderComponent(undefined, mountWithIntl);
        expect(userActions.performGetUserData).toHaveBeenCalled();
        expect(producersActions.performGetCurrentMarketPrice).toHaveBeenCalled();
    });

    it('should call performGetOwnedProducerOffer when the user was updated', () => {
        producersActions.performGetOwnedProducerOffer = jest.fn();
        const component = renderComponent(undefined, mountWithIntl);
        component.setProps({ user: { id: 'test' } });
        expect(producersActions.performGetOwnedProducerOffer).toHaveBeenCalledWith('test');
    });

    it('should not call performGetOwnedProducerOffer when the user was updated but it is empty', () => {
        producersActions.performGetOwnedProducerOffer = jest.fn();
        const component = renderComponent(undefined, mountWithIntl);
        component.setProps({ user: {} });
        expect(producersActions.performGetOwnedProducerOffer).toHaveBeenCalledTimes(0);
    });

    it('should call performGetOwnedProducerOffersHistory when the owned producer was updated', () => {
        producersActions.performGetOwnedProducerOffersHistory = jest.fn();
        const component = renderComponent(undefined, mountWithIntl);
        component.setProps({ ownedProducerOfferInfo: { id: 'test' } });
        expect(producersActions.performGetOwnedProducerOffersHistory).toHaveBeenCalledWith('test');
    });

    it('should not call performGetOwnedProducerOffersHistory when the owned producer was updated but it is empty', () => {
        producersActions.performGetOwnedProducerOffersHistory = jest.fn();
        const component = renderComponent(undefined, mountWithIntl);
        component.setProps({ ownedProducerOfferInfo: {} });
        expect(producersActions.performGetOwnedProducerOffersHistory).toHaveBeenCalledTimes(0);
    });

    it('should call performPushNotification with error message', () => {
        notificationsActions.performPushNotification = jest.fn();
        const component = renderComponent(undefined, mountWithIntl);
        component.setProps({ error: { message: 'test' } });
        expect(notificationsActions.performPushNotification).toHaveBeenCalledWith({
            type: 'error',
            message: 'test'
        });
    });

    it('should call performPushNotification with success message', () => {
        notificationsActions.performPushNotification = jest.fn();
        const component = renderComponent(undefined, mountWithIntl);
        component.setState({
            updated: true
        });
        component.setProps({ loading: false, ownedProducerOfferInfo: { id: 'testId' } });
        expect(notificationsActions.performPushNotification).toHaveBeenCalledWith({
            type: 'success',
            message: 'Offer successfully added.'
        });
    });

    it('should call performAddOwnedProducerOffer with success message', () => {
        producersActions.performAddOwnedProducerOffer = jest.fn();
        const offerDummy = {
            price: 0,
            plantType: 'solar',
            annualProduction: '',
            capacity: '11',
            date: 0,
            city: 'test city',
            street: 'test street',
            postcode: '111',
            description: 'test description',
            name: 'test name'
        };
        const component = renderComponent({}, mountWithIntl);
        component
            .find('OfferForm')
            .props()
            .onSubmit(offerDummy);
        expect(producersActions.performAddOwnedProducerOffer).toHaveBeenCalledWith(3, offerDummy);
        expect(component.state('updated')).toBe(true);
    });

    it('should validate fields', () => {
        producersActions.performAddOwnedProducerOffer = jest.fn();
        const offerDummy = {
            price: 0,
            plantType: '',
            annualProduction: '',
            capacity: '',
            date: 0,
            city: '',
            street: '',
            postcode: '',
            description: '',
            name: ''
        };
        // Disable console warning for the test.
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        const component = renderComponent({}, mountWithIntl);
        component
            .find('OfferForm')
            .props()
            .onSubmit(offerDummy);
        expect(producersActions.performAddOwnedProducerOffer).not.toHaveBeenCalled();
        expect(component.state().errors).toHaveProperty('capacity');
        expect(component.state().errors).toHaveProperty('city');
        expect(component.state().errors).toHaveProperty('street');
        expect(component.state().errors).toHaveProperty('postcode');
        expect(component.state().errors).toHaveProperty('description');
        expect(component.state().errors).toHaveProperty('name');
    });

    it('should validate capacity field and check whether it a number', () => {
        producersActions.performAddOwnedProducerOffer = jest.fn();
        const offerDummy = {
            price: 0,
            plantType: 'solar',
            annualProduction: '',
            capacity: '11aaa',
            date: 0,
            city: 'test city',
            street: 'test street',
            postcode: '111',
            description: 'test description',
            name: 'test name'
        };
        // Disable console warning for the test.
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        const component = renderComponent({}, mountWithIntl);
        component
            .find('OfferForm')
            .props()
            .onSubmit(offerDummy);
        expect(producersActions.performAddOwnedProducerOffer).not.toHaveBeenCalled();
        expect(component.state().errors).toHaveProperty('capacity');
    });

    it('should calls performSetupLoaderVisibility when receive new loading property', () => {
        const sellEnergy = renderComponent();

        sellEnergy.setProps({ loading: true });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), true);
        sellEnergy.setProps({ loading: false });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), false);
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
    });

    it('should setup translated breadcrumbs when locale changed', () => {
        const sellEnergy = renderComponent();

        expect(appActions.performSetupBreadcrumbs).toHaveBeenCalledTimes(2);

        sellEnergy.setProps({
            locale: 'de'
        });

        expect(appActions.performSetupBreadcrumbs).toHaveBeenCalledTimes(3);
    });
});
