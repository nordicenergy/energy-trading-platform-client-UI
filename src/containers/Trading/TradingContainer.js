import React from 'react';
import { connect } from 'react-redux';

import './Trading.css';
import { performSetupRootBreadcrumb } from '../../action_performers/app';
import { defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import { MyProducer, Trading } from '../index';
import { Route } from 'react-router-dom';
import { PATHS } from '../../services/routes';

function defineLabels() {
    return defineMessages({
        trading: {
            id: 'app.menuBar.trading',
            defaultMessage: 'Trading'
        }
    });
}

export class TradingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.labels = defineLabels();
        const { formatMessage } = context.intl;
        performSetupRootBreadcrumb({
            id: PATHS.trading.id,
            label: formatMessage(this.labels.trading),
            path: props.match.path
        });
    }

    static mapStateToProps(state) {
        return {
            breadCrumbs: state.App.breadCrumbs.data
        };
    }

    render() {
        const { match } = this.props;
        return (
            <React.Fragment>
                <Route exact path={`${match.path}`} component={Trading} />
                <Route
                    path={`${match.path}${PATHS.myProducer.path}`}
                    component={MyProducer}
                />
            </React.Fragment>
        );
    }
}

TradingContainer.contextTypes = {
    intl: PropTypes.object
};

export default connect(TradingContainer.mapStateToProps)(TradingContainer);
