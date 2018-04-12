import { producersReducer, initialState } from '../producers';

const { ACTIONS } = fixtures();

describe('Producers reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_PRODUCER', () => {
            const result = producersReducer(
                initialState,
                ACTIONS.getProducer.pending
            );
            expect(result.producer.loading).toEqual(true);
            expect(result.producer.error).toEqual(null);
            expect(result.producer.data).toEqual({});
        });

        it('should handle GET_CURRENT_PRODUCER', () => {
            const result = producersReducer(
                initialState,
                ACTIONS.getCurrentProducer.pending
            );
            expect(result.currentProducer.loading).toBeTruthy();
            expect(result.currentProducer.error).toBeNull();
            expect(result.currentProducer.data).toEqual(
                initialState.currentProducer.data
            );
        });

        it('should handle GET_PRODUCERS', () => {
            const result = producersReducer(
                initialState,
                ACTIONS.getProducers.pending
            );
            expect(result.producers.loading).toBeTruthy();
            expect(result.producers.error).toBeNull();
            expect(result.producers.data).toEqual(initialState.producers.data);
        });
    });

    describe('Error cases:', () => {
        it('should handle GET_PRODUCER', () => {
            const result = producersReducer(
                initialState,
                ACTIONS.getProducer.fail
            );
            expect(result.producer.loading).toEqual(false);
            expect(result.producer.error).toEqual('Producer Error Message');
            expect(result.producer.data).toEqual({});
        });

        it('should handle GET_CURRENT_PRODUCER', () => {
            const result = producersReducer(
                initialState,
                ACTIONS.getCurrentProducer.fail
            );
            expect(result.currentProducer.loading).toBeFalsy();
            expect(result.currentProducer.error).toEqual(
                ACTIONS.getCurrentProducer.fail.error.data
            );
            expect(result.currentProducer.data).toEqual(
                initialState.currentProducer.data
            );
        });

        it('should handle GET_PRODUCERS', () => {
            const result = producersReducer(
                initialState,
                ACTIONS.getProducers.fail
            );
            expect(result.producers.loading).toBeFalsy();
            expect(result.producers.error).toEqual(
                ACTIONS.getProducers.fail.error.data
            );
            expect(result.producers.data).toEqual(initialState.producers.data);
        });
    });

    describe('Success cases:', () => {
        it('should handle GET_PRODUCER', () => {
            const result = producersReducer(
                initialState,
                ACTIONS.getProducer.success
            );
            expect(result.producer.loading).toEqual(false);
            expect(result.producer.error).toEqual(null);
            expect(result.producer.data).toEqual(
                ACTIONS.getProducer.success.payload.producer
            );
        });

        it('should handle GET_CURRENT_PRODUCER', () => {
            const result = producersReducer(
                initialState,
                ACTIONS.getCurrentProducer.success
            );
            expect(result.currentProducer.loading).toBeFalsy();
            expect(result.currentProducer.error).toBeNull();
            expect(result.currentProducer.data).toEqual(
                ACTIONS.getCurrentProducer.success.payload.producer
            );
        });

        it('should handle GET_PRODUCERS', () => {
            const result = producersReducer(
                initialState,
                ACTIONS.getProducers.success
            );
            expect(result.producers.loading).toBeFalsy();
            expect(result.producers.error).toBeNull();
            expect(result.producers.data).toEqual({
                total: ACTIONS.getProducers.success.payload.numberOfProducers,
                entries: ACTIONS.getProducers.success.payload.producers
            });
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
                        description:
                            'Green plant close to Hamburg run by a farmer, John Doe',
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
                error: { data: 'Producer Error Message' },
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
                        description:
                            'Green plant close to Hamburg run by a farmer, John Doe',
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
                error: { data: 'Response error' },
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
            fail: {
                type: 'GET_PRODUCERS',
                payload: null,
                error: { data: 'Response error' },
                loading: false
            },
            pending: {
                type: 'GET_PRODUCERS',
                payload: null,
                error: null,
                loading: true
            }
        }
    };
    return { ACTIONS };
}
