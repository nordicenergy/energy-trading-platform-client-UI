import { producersReducer, initialState } from '../producers';

const { ACTIONS } = fixtures();

describe('Producers reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_PRODUCER', () => {
            const result = producersReducer(initialState, ACTIONS.getProducer.pending);
            expect(result.producer.loading).toEqual(true);
            expect(result.producer.error).toEqual(null);
            expect(result.producer.data).toEqual({});
        });

        it('should handle GET_CURRENT_PRODUCER', () => {
            const result = producersReducer(initialState, ACTIONS.getCurrentProducer.pending);
            expect(result.currentProducer.loading).toBeTruthy();
            expect(result.currentProducer.error).toBeNull();
            expect(result.currentProducer.data).toEqual(initialState.currentProducer.data);
        });

        it('should handle GET_PRODUCERS', () => {
            const result = producersReducer(initialState, ACTIONS.getProducers.pending);
            expect(result.producers.loading).toBeTruthy();
            expect(result.producers.error).toBeNull();
            expect(result.producers.data).toEqual(initialState.producers.data);
        });

        it('should handle SELECT_PRODUCER', () => {
            const result = producersReducer(initialState, ACTIONS.selectProducer.pending);
            expect(result.selectedProducer.loading).toBeTruthy();
            expect(result.selectedProducer.error).toBeNull();
            expect(result.selectedProducer.data).toEqual(initialState.selectedProducer.data);
        });

        it('should handle GET_PRODUCER_HISTORY', () => {
            const result = producersReducer(initialState, ACTIONS.getProducerHistory.pending);
            expect(result.producerHistory.loading).toBeTruthy();
            expect(result.producerHistory.error).toBeNull();
            expect(result.producerHistory.data).toEqual(initialState.producerHistory.data);
        });

        it('should handle GET_OWNED_PRODUCER_OFFER', () => {
            const result = producersReducer(initialState, ACTIONS.getOwnedProducerOffer.pending);
            expect(result.ownedProducerOffer.loading).toBeTruthy();
            expect(result.ownedProducerOffer.error).toBeNull();
            expect(result.ownedProducerOffer.data).toEqual(initialState.ownedProducerOffer.data);
        });

        it('should handle ADD_OWNED_PRODUCER_OFFER', () => {
            const result = producersReducer(initialState, ACTIONS.addOwnedProducerOffer.pending);
            expect(result.ownedProducerOffer.loading).toBeTruthy();
            expect(result.ownedProducerOffer.error).toBeNull();
            expect(result.ownedProducerOffer.data).toEqual(initialState.ownedProducerOffer.data);
        });
    });

    describe('Error cases:', () => {
        it('should handle GET_PRODUCER', () => {
            const result = producersReducer(initialState, ACTIONS.getProducer.fail);
            expect(result.producer.loading).toEqual(false);
            expect(result.producer.error).toEqual(ACTIONS.getProducer.fail.error);
            expect(result.producer.data).toEqual({});
        });

        it('should handle GET_CURRENT_PRODUCER', () => {
            const result = producersReducer(initialState, ACTIONS.getCurrentProducer.fail);
            expect(result.currentProducer.loading).toBeFalsy();
            expect(result.currentProducer.error).toEqual(ACTIONS.getCurrentProducer.fail.error);
            expect(result.currentProducer.data).toEqual(initialState.currentProducer.data);
        });

        it('should handle GET_PRODUCERS', () => {
            const result = producersReducer(initialState, ACTIONS.getProducers.fail);
            expect(result.producers.loading).toBeFalsy();
            expect(result.producers.error).toEqual(ACTIONS.getProducers.fail.error);
            expect(result.producers.data).toEqual(initialState.producers.data);
        });

        it('should handle SELECT_PRODUCER', () => {
            const result = producersReducer(initialState, ACTIONS.selectProducer.fail);
            expect(result.selectedProducer.loading).toBeFalsy();
            expect(result.selectedProducer.error).toEqual(ACTIONS.selectProducer.fail.error);
            expect(result.selectedProducer.data).toEqual(initialState.selectedProducer.data);
        });

        it('should handle GET_PRODUCER_HISTORY', () => {
            const result = producersReducer(initialState, ACTIONS.getProducerHistory.fail);
            expect(result.producerHistory.loading).toBeFalsy();
            expect(result.producerHistory.error).toEqual(ACTIONS.getProducerHistory.fail.error);
            expect(result.producerHistory.data).toEqual(initialState.producerHistory.data);
        });

        it('should handle GET_OWNED_PRODUCER_OFFER', () => {
            const result = producersReducer(initialState, ACTIONS.getOwnedProducerOffer.fail);
            expect(result.ownedProducerOffer.loading).toBeFalsy();
            expect(result.ownedProducerOffer.error).toEqual(ACTIONS.getOwnedProducerOffer.fail.error);
            expect(result.ownedProducerOffer.data).toEqual(initialState.ownedProducerOffer.data);
        });

        it('should handle ADD_OWNED_PRODUCER_OFFER', () => {
            const result = producersReducer(initialState, ACTIONS.addOwnedProducerOffer.fail);
            expect(result.ownedProducerOffer.loading).toBeFalsy();
            expect(result.ownedProducerOffer.error).toEqual(ACTIONS.addOwnedProducerOffer.fail.error);
            expect(result.ownedProducerOffer.data).toEqual(initialState.ownedProducerOffer.data);
        });
    });

    describe('Success cases:', () => {
        it('should handle GET_PRODUCER', () => {
            const result = producersReducer(initialState, ACTIONS.getProducer.success);
            expect(result.producer.loading).toEqual(false);
            expect(result.producer.error).toEqual(null);
            expect(result.producer.data).toEqual(ACTIONS.getProducer.success.payload.producer);
        });

        it('should handle GET_CURRENT_PRODUCER', () => {
            const result = producersReducer(initialState, ACTIONS.getCurrentProducer.success);
            expect(result.currentProducer.loading).toBeFalsy();
            expect(result.currentProducer.error).toBeNull();
            expect(result.currentProducer.data).toEqual(ACTIONS.getCurrentProducer.success.payload.producer);
        });

        it('should handle GET_PRODUCERS', () => {
            const result = producersReducer(initialState, ACTIONS.getProducers.success);
            expect(result.producers.loading).toBeFalsy();
            expect(result.producers.error).toBeNull();
            expect(result.producers.data).toEqual({
                total: ACTIONS.getProducers.success.payload.numberOfProducers,
                entries: ACTIONS.getProducers.success.payload.producers
            });
        });

        it('should handle GET_PRODUCERS with defined page number', () => {
            const result = producersReducer(
                {
                    ...initialState,
                    producers: {
                        ...initialState.producers,
                        data: {
                            ...initialState.producers.data,
                            entries: [
                                {
                                    id: 22,
                                    name: 'GASAG',
                                    picture:
                                        'https://res.cloudinary.com/dqqhd7l11/image/upload/v1480972142/image001_png_ciwv5g.png',
                                    description: '',
                                    capacity: 3,
                                    price: 0,
                                    plantType: 'solar',
                                    tradingStrategy: 0,
                                    complete: 0
                                }
                            ]
                        }
                    }
                },
                ACTIONS.getProducers.successWithDefinedPage
            );
            expect(result.producers.loading).toBeFalsy();
            expect(result.producers.error).toBeNull();
            expect(result.producers.data).toEqual({
                total: ACTIONS.getProducers.successWithDefinedPage.payload.numberOfProducers,
                entries: [
                    {
                        id: 22,
                        name: 'GASAG',
                        picture:
                            'https://res.cloudinary.com/dqqhd7l11/image/upload/v1480972142/image001_png_ciwv5g.png',
                        description: '',
                        capacity: 3,
                        price: 0,
                        plantType: 'solar',
                        tradingStrategy: 0,
                        complete: 0
                    },
                    ...ACTIONS.getProducers.successWithDefinedPage.payload.producers
                ]
            });
        });

        it('should handle SELECT_PRODUCER', () => {
            const result = producersReducer(initialState, ACTIONS.selectProducer.success);
            expect(result.selectedProducer.loading).toBeFalsy();
            expect(result.selectedProducer.error).toBeNull();
            const [id] = ACTIONS.selectProducer.success.meta;
            expect(result.selectedProducer.data).toEqual({ ...ACTIONS.selectProducer.success.payload, id });
        });

        it('should handle GET_PRODUCER_HISTORY', () => {
            const result = producersReducer(initialState, ACTIONS.getProducerHistory.success);
            expect(result.producerHistory.loading).toBeFalsy();
            expect(result.producerHistory.error).toBeNull();
            expect(result.producerHistory.data).toEqual(ACTIONS.getProducerHistory.success.payload.strategies);
        });

        it('should handle GET_OWNED_PRODUCER_OFFER', () => {
            const result = producersReducer(initialState, ACTIONS.getOwnedProducerOffer.success);
            expect(result.ownedProducerOffer.loading).toBeFalsy();
            expect(result.ownedProducerOffer.error).toBeNull();
            expect(result.ownedProducerOffer.data).toEqual(ACTIONS.getOwnedProducerOffer.success.payload);
        });

        it('should handle ADD_OWNED_PRODUCER_OFFER', () => {
            const result = producersReducer(initialState, ACTIONS.addOwnedProducerOffer.success);
            expect(result.ownedProducerOffer.loading).toBeFalsy();
            expect(result.ownedProducerOffer.error).toBeNull();
            expect(result.ownedProducerOffer.data).toEqual(ACTIONS.addOwnedProducerOffer.success.payload);
        });
    });
});

function fixtures() {
    const ACTIONS = {
        getProducer: {
            success: {
                type: 'GET_PRODUCER',
                payload: {
                    producer: {
                        price: 6,
                        name: 'John Doe',
                        description: 'Green plant close to Hamburg run by a farmer, John Doe',
                        tradingStrategy: false,
                        id: 'testId',
                        complete: false,
                        plantType: 'solar',
                        picture: '/plantImg/peter_producer.jpg',
                        capacity: '600 MWh'
                    }
                },
                error: null,
                loading: false
            },
            fail: {
                type: 'GET_PRODUCER',
                payload: null,
                error: { message: 'Producer Error Message' },
                loading: false
            },
            pending: {
                type: 'GET_PRODUCER',
                payload: null,
                error: null,
                loading: true
            }
        },
        getCurrentProducer: {
            success: {
                type: 'GET_CURRENT_PRODUCER',
                payload: {
                    producer: {
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
                    }
                },
                error: null,
                loading: false
            },
            fail: {
                type: 'GET_CURRENT_PRODUCER',
                payload: null,
                error: { message: 'Response error' },
                loading: false
            },
            pending: {
                type: 'GET_CURRENT_PRODUCER',
                payload: null,
                error: null,
                loading: true
            }
        },
        getProducers: {
            success: {
                type: 'GET_PRODUCERS',
                payload: {
                    numberOfProducers: 10,
                    producers: [
                        {
                            id: 1,
                            name: 'GASAG',
                            picture:
                                'https://res.cloudinary.com/dqqhd7l11/image/upload/v1480972142/image001_png_ciwv5g.png',
                            description: '',
                            capacity: 6,
                            price: 0,
                            plantType: 'solar',
                            tradingStrategy: 0,
                            complete: 0
                        },
                        {
                            id: 2,
                            name: 'GASAG',
                            picture:
                                'https://res.cloudinary.com/dqqhd7l11/image/upload/v1480972142/image001_png_ciwv5g.png',
                            description: '',
                            capacity: 3,
                            price: 0,
                            plantType: 'solar',
                            tradingStrategy: 0,
                            complete: 0
                        },
                        {
                            id: 3,
                            name: 'GASAG',
                            picture:
                                'https://res.cloudinary.com/dqqhd7l11/image/upload/v1480972142/image001_png_ciwv5g.png',
                            description: '',
                            capacity: 2,
                            price: 0,
                            plantType: 'solar',
                            tradingStrategy: 0,
                            complete: 0
                        }
                    ]
                },
                error: null,
                loading: false
            },
            successWithDefinedPage: {
                type: 'GET_PRODUCERS',
                payload: {
                    numberOfProducers: 10,
                    producers: [
                        {
                            id: 1,
                            name: 'GASAG',
                            picture:
                                'https://res.cloudinary.com/dqqhd7l11/image/upload/v1480972142/image001_png_ciwv5g.png',
                            description: '',
                            capacity: 6,
                            price: 0,
                            plantType: 'solar',
                            tradingStrategy: 0,
                            complete: 0
                        },
                        {
                            id: 2,
                            name: 'GASAG',
                            picture:
                                'https://res.cloudinary.com/dqqhd7l11/image/upload/v1480972142/image001_png_ciwv5g.png',
                            description: '',
                            capacity: 3,
                            price: 0,
                            plantType: 'solar',
                            tradingStrategy: 0,
                            complete: 0
                        },
                        {
                            id: 3,
                            name: 'GASAG',
                            picture:
                                'https://res.cloudinary.com/dqqhd7l11/image/upload/v1480972142/image001_png_ciwv5g.png',
                            description: '',
                            capacity: 2,
                            price: 0,
                            plantType: 'solar',
                            tradingStrategy: 0,
                            complete: 0
                        }
                    ]
                },
                error: null,
                loading: false,
                meta: [
                    {
                        page: 1
                    }
                ]
            },
            fail: {
                type: 'GET_PRODUCERS',
                payload: null,
                error: { message: 'Response error' },
                loading: false
            },
            pending: {
                type: 'GET_PRODUCERS',
                payload: null,
                error: null,
                loading: true
            }
        },
        getProducerHistory: {
            success: {
                type: 'GET_PRODUCER_HISTORY',
                payload: {
                    strategies: [
                        {
                            date: 1523468260,
                            offerEventDescription: 'Price change 2.4 ct/kWh'
                        },
                        {
                            date: 1523465260,
                            offerEventDescription: 'Price change 2.3 ct/kWh'
                        }
                    ]
                },
                error: null,
                loading: false
            },
            fail: {
                type: 'GET_PRODUCER_HISTORY',
                payload: null,
                error: { message: 'Response error' },
                loading: false
            },
            pending: {
                type: 'GET_PRODUCER_HISTORY',
                payload: null,
                error: null,
                loading: true
            }
        },
        selectProducer: {
            success: {
                type: 'SELECT_PRODUCER',
                payload: {},
                error: null,
                loading: false,
                meta: ['testId']
            },
            fail: {
                type: 'SELECT_PRODUCER',
                payload: null,
                error: { message: 'Response error' },
                loading: false,
                meta: ['testId']
            },
            pending: {
                type: 'SELECT_PRODUCER',
                payload: null,
                error: null,
                loading: true,
                meta: ['testId']
            }
        },
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
