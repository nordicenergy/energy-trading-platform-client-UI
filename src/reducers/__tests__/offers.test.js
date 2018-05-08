import { offersReducer, initialState } from '../offers';

const { ACTIONS } = fixtures();

describe('Offers reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_OWNED_PRODUCER_OFFER', () => {
            const result = offersReducer(initialState, ACTIONS.getOwnedProducerOffer.pending);
            expect(result.ownedProducerOffer.loading).toBeTruthy();
            expect(result.ownedProducerOffer.error).toBeNull();
            expect(result.ownedProducerOffer.data).toEqual(initialState.ownedProducerOffer.data);
        });

        it('should handle ADD_OWNED_PRODUCER_OFFER', () => {
            const result = offersReducer(initialState, ACTIONS.addOwnedProducerOffer.pending);
            expect(result.ownedProducerOffer.loading).toBeTruthy();
            expect(result.ownedProducerOffer.error).toBeNull();
            expect(result.ownedProducerOffer.data).toEqual(initialState.ownedProducerOffer.data);
        });
    });

    describe('Error cases:', () => {
        it('should handle GET_OWNED_PRODUCER_OFFER', () => {
            const result = offersReducer(initialState, ACTIONS.getOwnedProducerOffer.fail);
            expect(result.ownedProducerOffer.loading).toBeFalsy();
            expect(result.ownedProducerOffer.error).toEqual(ACTIONS.getOwnedProducerOffer.fail.error);
            expect(result.ownedProducerOffer.data).toEqual(initialState.ownedProducerOffer.data);
        });

        it('should handle ADD_OWNED_PRODUCER_OFFER', () => {
            const result = offersReducer(initialState, ACTIONS.addOwnedProducerOffer.fail);
            expect(result.ownedProducerOffer.loading).toBeFalsy();
            expect(result.ownedProducerOffer.error).toEqual(ACTIONS.addOwnedProducerOffer.fail.error);
            expect(result.ownedProducerOffer.data).toEqual(initialState.ownedProducerOffer.data);
        });
    });

    describe('Success cases:', () => {
        it('should handle GET_OWNED_PRODUCER_OFFER', () => {
            const result = offersReducer(initialState, ACTIONS.getOwnedProducerOffer.success);
            expect(result.ownedProducerOffer.loading).toBeFalsy();
            expect(result.ownedProducerOffer.error).toBeNull();
            expect(result.ownedProducerOffer.data).toEqual(ACTIONS.getOwnedProducerOffer.success.payload);
        });

        it('should handle ADD_OWNED_PRODUCER_OFFER', () => {
            const result = offersReducer(initialState, ACTIONS.addOwnedProducerOffer.success);
            expect(result.ownedProducerOffer.loading).toBeFalsy();
            expect(result.ownedProducerOffer.error).toBeNull();
            expect(result.ownedProducerOffer.data).toEqual(ACTIONS.addOwnedProducerOffer.success.payload);
        });
    });
});

function fixtures() {
    const ACTIONS = {
        getOwnedProducerOffer: {
            success: {
                type: 'GET_OWNED_PRODUCER_OFFER',
                payload: {
                    id: 3,
                    name: 'John Doe',
                    picture: '/plantImg/peter_producer.jpg',
                    price: 3.5,
                    plantType: 'other',
                    annualProduction: 'annualProduction test',
                    capacity: 'capacity test',
                    date: 0,
                    city: 'city test',
                    street: 'street test',
                    postcode: 'postcode test',
                    description: 'description test',
                    tradingStrategy: false,
                    complete: false,
                    productionOfLastDay: 240,
                    energyPurchased: 2400,
                    dlAddress: '0xAB12CD334FFBC'
                },
                error: null,
                loading: false,
                meta: ['testId']
            },
            fail: {
                type: 'GET_OWNED_PRODUCER_OFFER',
                payload: null,
                error: { message: 'Response error' },
                loading: false,
                meta: ['testId']
            },
            pending: {
                type: 'GET_OWNED_PRODUCER_OFFER',
                payload: null,
                error: null,
                loading: true,
                meta: ['testId']
            }
        },
        addOwnedProducerOffer: {
            success: {
                type: 'ADD_OWNED_PRODUCER_OFFER',
                payload: {
                    id: 3,
                    name: 'John Doe',
                    picture: '/plantImg/peter_producer.jpg',
                    price: 3.5,
                    plantType: 'other',
                    annualProduction: 'annualProduction test',
                    capacity: 'capacity test',
                    date: 0,
                    city: 'city test',
                    street: 'street test',
                    postcode: 'postcode test',
                    description: 'description test',
                    tradingStrategy: false,
                    complete: false,
                    productionOfLastDay: 240,
                    energyPurchased: 2400,
                    dlAddress: '0xAB12CD334FFBC'
                },
                error: null,
                loading: false,
                meta: [
                    'testId',
                    {
                        price: 3.5,
                        plantType: 'other',
                        annualProduction: 'annualProduction test',
                        capacity: 'capacity test',
                        date: 0,
                        city: 'city test',
                        street: 'street test',
                        postcode: 'postcode test',
                        description: 'description test'
                    }
                ]
            },
            fail: {
                type: 'ADD_OWNED_PRODUCER_OFFER',
                payload: null,
                error: { message: 'Response error' },
                loading: false,
                meta: [
                    'testId',
                    {
                        price: 3.5,
                        plantType: 'other',
                        annualProduction: 'annualProduction test',
                        capacity: 'capacity test',
                        date: 0,
                        city: 'city test',
                        street: 'street test',
                        postcode: 'postcode test',
                        description: 'description test'
                    }
                ]
            },
            pending: {
                type: 'ADD_OWNED_PRODUCER_OFFER',
                payload: null,
                error: null,
                loading: true,
                meta: [
                    'testId',
                    {
                        price: 3.5,
                        plantType: 'other',
                        annualProduction: 'annualProduction test',
                        capacity: 'capacity test',
                        date: 0,
                        city: 'city test',
                        street: 'street test',
                        postcode: 'postcode test',
                        description: 'description test'
                    }
                ]
            }
        }
    };
    return { ACTIONS };
}
