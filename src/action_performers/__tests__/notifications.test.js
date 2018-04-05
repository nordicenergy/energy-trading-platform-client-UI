import { dispatcher } from '../../store';
import { performPushNotification } from '../notifications';

describe('Notifications action performers', () => {
    const notificationMock = {
        type: 'error',
        message: 'Error message'
    };
    const timestampMock = 999;
    let dispatchActionSpy;
    let dateNowSpy;

    beforeAll(() => {
        dispatchActionSpy = jest
            .spyOn(dispatcher, 'dispatchAction')
            .mockImplementation(jest.fn());
        dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(timestampMock);
    });

    afterAll(() => {
        dispatchActionSpy.mockRestore();
        dateNowSpy.mockRestore();
    });

    afterEach(() => {
        dispatchActionSpy.mockClear();
    });

    it('should calls dispatch method for push notification', () => {
        performPushNotification(notificationMock);

        expect(dispatchActionSpy).toHaveBeenCalledWith(
            'PUSH_NOTIFICATION',
            expect.objectContaining({
                timestamp: timestampMock,
                type: notificationMock.type,
                message: notificationMock.message
            }),
            null,
            false,
            []
        );
    });
});
