import React from 'react';
import { connect } from 'react-redux';

import './MyProducer.css';
import AbstractContainer from '../AbstractContainer/AbstractContainer';
import { PATHS } from '../../services/routes';
import PropTypes from 'prop-types';

export class MyProducer extends AbstractContainer {
    constructor(props, context) {
        const { formatMessage } = context.intl;
        const breadcrumbs = [
            {
                ...PATHS.trading,
                label: formatMessage(PATHS.trading.label)
            },
            {
                ...PATHS.myProducer,
                label: formatMessage(PATHS.myProducer.label)
            }
        ];
        super(props, context, breadcrumbs);
    }

    static mapStateToProps(/* state */) {
        return {};
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
