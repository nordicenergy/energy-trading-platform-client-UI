import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * @example ./Button.doc.md
 */
class Button extends React.Component {
    render() {
        const { children } = this.props;
        return <button className="button">{children}</button>;
    }
}

Button.propTypes = {
    children: PropTypes.any
};

export default Button;
