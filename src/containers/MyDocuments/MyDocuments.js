import React from 'react';
import { connect } from 'react-redux';

import AbstractContainer from '../AbstractContainer/AbstractContainer';
import './MyDocuments.css';
import PropTypes from 'prop-types';

import { performSetupLoaderVisibility } from '../../action_performers/app';
import { performPushNotification } from '../../action_performers/notifications';
import { performGetDocuments } from '../../action_performers/documents';
import { Documents as messages } from '../../services/translations/messages';
import { DocumentsList } from '../../components';
import { performGetUserData } from '../../action_performers/users';

export class MyDocuments extends AbstractContainer {
    static mapStateToProps(state) {
        return {
            loading: state.Documents.documents.loading || state.Users.profile.loading,
            error: state.Documents.documents.error || state.Users.profile.error,
            documents: state.Documents.documents.data,
            profile: state.Users.profile.data
        };
    }

    componentDidMount() {
        performGetUserData();
        this.fetchDocuments();
    }

    componentDidUpdate(prevProps) {
        const { loading, error } = this.props;
        const { profile: { user: prevUser = {} } = {}, error: oldError } = prevProps;
        const { profile: { user = {} } = {} } = this.props;

        if (!loading && error && error !== oldError) {
            performPushNotification({ message: error.message, type: 'error' });
        }

        if (user.id !== prevUser.id) {
            this.fetchDocuments();
        }

        performSetupLoaderVisibility(loading);
    }

    fetchDocuments() {
        const { profile: { user } = {} } = this.props;
        if (user && user.id) {
            performGetDocuments(user.id);
        }
    }

    render() {
        const { formatMessage } = this.context.intl;
        const { documents } = this.props;
        const hasDocuments = documents.length > 0;

        return (
            <section className="my-documents-page">
                <h1>{formatMessage(messages.header)}</h1>
                {hasDocuments ? <DocumentsList documents={documents} /> : null}
            </section>
        );
    }
}

MyDocuments.contextTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired
    }).isRequired
};
MyDocuments.propTypes = {
    loading: PropTypes.bool,
    documents: PropTypes.array,
    profile: PropTypes.object,
    error: PropTypes.object
};
MyDocuments.defaultProps = {
    loading: false,
    documents: [],
    profile: {},
    error: null
};

export default connect(MyDocuments.mapStateToProps)(MyDocuments);
