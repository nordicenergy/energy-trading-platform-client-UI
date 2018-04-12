import { producersReducer, initialState } from '../producers';

const { ACTIONS } = fixtures();

describe('Producers reducer:', () => {
    describe('Pending cases:', () => {
        it('should handle GET_PRODUCER', done => {
            const result = producersReducer(
                initialState,
                ACTIONS.getProducer.pending
            );
            expect(result.producer.loading).toEqual(true);
            expect(result.producer.error).toEqual(null);
            expect(result.producer.data).toEqual({});

            done();
        });

        it('should handle GET_PRODUCERS', () => {
            const result = producersReducer(
                initialState,
                ACTIONS.getProducers.pending
            );
            expect(result.producers.loading).toBeTruthy();
            expect(result.producers.error).toBeNull();
            expect(result.producers.data).toEqual([]);
        });
    });

    describe('Error cases:', () => {
        it('should handle GET_PRODUCER', done => {
            const result = producersReducer(
                initialState,
                ACTIONS.getProducer.fail
            );
            expect(result.producer.loading).toEqual(false);
            expect(result.producer.error).toEqual('Producer Error Message');
            expect(result.producer.data).toEqual({});

            done();
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
            expect(result.producers.data).toEqual([]);
        });
    });

    describe('Success cases:', () => {
        it('should handle GET_PRODUCER', done => {
            const result = producersReducer(
                initialState,
                ACTIONS.getProducer.success
            );
            expect(result.producer.loading).toEqual(false);
            expect(result.producer.error).toEqual(null);
            expect(result.producer.data).toEqual(
                ACTIONS.getProducer.success.payload.producer
            );

            done();
        });

        it('should handle GET_PRODUCERS', () => {
            const result = producersReducer(
                initialState,
                ACTIONS.getProducers.success
            );
            expect(result.producers.loading).toBeFalsy();
            expect(result.producers.error).toBeNull();
            expect(result.producers.data).toEqual(
                ACTIONS.getProducers.success.payload.producers
            );
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
        getProducers: {
            success: {
                type: 'GET_PRODUCERS',
                payload: {
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
