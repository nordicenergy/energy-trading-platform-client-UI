import React from 'react';
import { connect } from 'react-redux';

import './MyProducer.css';
import { defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import { performSetupBreadcrumbs } from '../../action_performers/app';
import { PATHS } from '../../services/routes';

function defineLabels() {
    return defineMessages({
        myProducer: {
            id: 'app.breadCrumbs.myProducer',
            defaultMessage: 'My Producer'
        }
    });
}

export class MyProducer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.labels = defineLabels();
        const { formatMessage } = context.intl;
        performSetupBreadcrumbs({
            id: PATHS.myProducer.id,
            label: formatMessage(this.labels.myProducer),
            path: props.match.path
        });
    }

    static mapStateToProps(state) {
        return {
            breadCrumbs: state.App.breadCrumbs.data
        };
    }

    render() {
        return (
            <div className="my-producer-page">
                <h1>My Producer</h1>
            </div>
        );
    }
}

MyProducer.contextTypes = {
    intl: PropTypes.object
};

export default connect(MyProducer.mapStateToProps)(MyProducer);
