import React from 'react';
import { mountWithIntl, shallowWithIntl } from '../../../services/intlTestHelper';
import { SellEnergy } from '../SellEnergy';
import * as notificationsActions from '../../../action_performers/notifications';
import * as offersActions from '../../../action_performers/offers';
import * as userActions from '../../../action_performers/users';

const offersDummy = [
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

const routerStub = {
    history: {
        push: jest.fn()
    }
};

function renderComponent(
    { offers = offersDummy, ownedProducerInfo = ownedProducerDummy, ...otherProps } = {},
    mountFn = shallowWithIntl
) {
    return mountFn(<SellEnergy offers={offers} ownedProducerOfferInfo={ownedProducerInfo} {...otherProps} />, {
        context: { router: routerStub }
    });
}

describe('<SellEnergy /> container', () => {
    afterEach(() => {
        routerStub.history.push.mockClear();
    });

    it('should renders without errors', () => {
        const sellEnergy = renderComponent();
        expect(sellEnergy.find('OffersSlider')).toHaveLength(1);
    });

    it('should not render offers slider if offers are not given', () => {
        const sellEnergy = renderComponent({ offers: null });
        expect(sellEnergy.find('OffersSlider')).toHaveLength(0);
    });

    it('should go to the trading page when back link was clicked', () => {
        const sellEnergy = renderComponent();
        sellEnergy.find('BackLink').simulate('click', { preventDefault: jest.fn() });
        expect(routerStub.history.push).toHaveBeenCalledWith('/');
    });

    it('should call performGetUserData when component is mounted', () => {
        userActions.performGetUserData = jest.fn();
        renderComponent(undefined, mountWithIntl);
        expect(userActions.performGetUserData).toHaveBeenCalled();
    });

    it('should call performGetOwnedProducer when the user was updated', () => {
        offersActions.performGetOwnedProducerOffer = jest.fn();
        const component = renderComponent(undefined, mountWithIntl);
        component.setProps({ user: { id: 'test' } });
        expect(offersActions.performGetOwnedProducerOffer).toHaveBeenCalledWith('test');
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
        offersActions.performAddOwnedProducerOffer = jest.fn();
        const offerDummy = {
            price: 0,
            plantType: 'solar',
            annualProduction: '',
            capacity: 0,
            date: 0,
            city: '',
            street: '',
            postcode: '',
            description: ''
        };
        const component = renderComponent({}, mountWithIntl);
        component.find('OfferForm').props().onSubmit(offerDummy);
        expect(offersActions.performAddOwnedProducerOffer).toHaveBeenCalledWith(3, offerDummy);
        expect(component.state('updated')).toBe(true);
    });
});
