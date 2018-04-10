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
        }
    };
    return { ACTIONS };
}
