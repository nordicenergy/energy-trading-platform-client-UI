import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import loader from './loader@1x.gif';
import loader2x from './loader@2x.gif';
import './Loader.css';

class Loader extends Component {
    render() {
        const { className, show } = this.props;
        const classes = classNames(
            'loader-backdrop',
            show && 'loader-backdrop--show',
            className
        );

        return (
            <div className={classes}>
                <div className="loader-icon-wrapper">
                    <img
                        src={loader}
                        srcSet={`${loader2x} 2x`}
                        alt="Loader icon"
                        draggable={false}
                    />
                </div>
            </div>
        );
    }
}

Loader.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool
};
Loader.defaultProps = {
    show: false
};

export default Loader;
