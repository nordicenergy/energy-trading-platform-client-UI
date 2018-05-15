import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from '../../components';
import './PageLoader.css';

export class PageLoader extends Component {
    static mapStateToProps({ App }) {
        return {
            shouldShowLoader: App.loader.data
        };
    }

    render() {
        const { shouldShowLoader } = this.props;
        return (
            <div className="page-loader">
                <Loader show={shouldShowLoader} />
            </div>
        );
    }
}

PageLoader.propTypes = {
    shouldShowLoader: PropTypes.bool
};
PageLoader.defaultProps = {
    shouldShowLoader: false
};

export default connect(PageLoader.mapStateToProps)(PageLoader);
