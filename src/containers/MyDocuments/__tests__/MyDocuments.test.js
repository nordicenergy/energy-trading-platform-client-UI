import React from 'react';
import { MyDocuments } from '../MyDocuments';

import { shallowWithIntl } from '../../../services/intlTestHelper';
import { DocumentsList } from '../../../components';

import * as notificationsActionPerformers from '../../../action_performers/notifications';
import * as appActions from '../../../action_performers/app';
import * as documentsActions from '../../../action_performers/documents';
import * as userActions from '../../../action_performers/users';

const DOCUMENTS_MOCKS = [
    { id: 1, dateOfCreation: '2017-01-31', Name: 'Invoice', link: '/test1.pdf' },
    { id: 2, dateOfCreation: '2017-02-31', Name: 'Monthly Installment', link: '/test2.pdf' },
    { id: 3, dateOfCreation: '2017-03-31', Name: 'Annual bill', link: '/test3.pdf' },
    { id: 4, dateOfCreation: '2017-04-31', Name: 'Monthly Installment', link: '/test4.pdf' },
    { id: 5, dateOfCreation: '2017-05-31', Name: 'Monthly Installment', link: '/test5.pdf' },
    { id: 6, dateOfCreation: '2017-06-31', Name: 'Monthly Installment', link: '/test6.pdf' },
    { id: 7, dateOfCreation: '2017-07-31', Name: 'Monthly Installment', link: '/test7.pdf' },
    { id: 8, dateOfCreation: undefined, Name: undefined, link: undefined }
];

function renderComponent(props = {}, mountFn = shallowWithIntl) {
    return mountFn(<MyDocuments {...props} />);
}

describe('<MyDocuments /> Component', () => {
    beforeEach(() => {
        documentsActions.performGetDocuments = jest.fn();
        appActions.performSetupLoaderVisibility = jest.fn();
        userActions.performGetUserData = jest.fn();
    });

    it('should DocumentsList component with correct props', () => {
        const component = renderComponent({
            documents: DOCUMENTS_MOCKS
        });

        expect(documentsActions.performGetDocuments).toHaveBeenCalledTimes(0);
        expect(userActions.performGetUserData).toHaveBeenCalledTimes(1);

        expect(component.find(DocumentsList)).toHaveLength(1);
        expect(component.find(DocumentsList).props().documents).toEqual(DOCUMENTS_MOCKS);
    });

    it('should map state properties', () => {
        const stateMock = {
            Documents: {
                documents: {
                    loading: true,
                    data: { foo: 'bar' },
                    error: 'Error message'
                }
            },
            Users: {
                profile: {
                    loading: false,
                    data: { id: 2 },
                    error: 'Error message 2'
                }
            }
        };
        const props = MyDocuments.mapStateToProps(stateMock);

        expect(props.loading).toEqual(stateMock.Documents.documents.loading);
        expect(props.documents).toEqual(stateMock.Documents.documents.data);
        expect(props.profile).toEqual(stateMock.Users.profile.data);
        expect(props.error).toEqual(stateMock.Documents.documents.error);
    });

    it('should shows server error if smth is failed', () => {
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        const component = renderComponent();

        component.setProps({
            loading: false,
            error: { message: 'Error message' }
        });

        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'error',
            message: 'Error message'
        });

        notificationsActionPerformers.performPushNotification.mockRestore();
    });

    it('should calls performSetupLoaderVisibility when receive new loading property', () => {
        const component = renderComponent();

        component.setProps({ loading: true });
        component.setProps({ loading: false });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
        const [[firstCallArg], [secondCallArg]] = appActions.performSetupLoaderVisibility.mock.calls;
        expect(firstCallArg).toBeTruthy();
        expect(secondCallArg).toBeFalsy();
    });

    it('should calls performGetDocuments when we have user id', () => {
        renderComponent({ profile: { user: { id: 1 } } });

        expect(documentsActions.performGetDocuments).toHaveBeenCalledWith(1);
    });

    it('should calls performGetDocuments when receive new user data', () => {
        const component = renderComponent();

        component.setProps({ profile: { user: { id: 2 } } });

        expect(documentsActions.performGetDocuments).toHaveBeenCalledWith(2);
    });
});
