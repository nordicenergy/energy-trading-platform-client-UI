import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import icons from '@fortawesome/fontawesome-free-solid';

import './MenuItem.css';

const MenuItem = props => {
    const { label, icon, active, onClick = f => f } = props;
    const itemClass = ['menu-item'];

    if (active) {
        itemClass.push('menu-item--active');
    }

    return (
        <div
            role="menuitem"
            className={itemClass.join(' ')}
            onClick={() => onClick()}
        >
            <div className="menu-item-icon">
                <FontAwesomeIcon icon={icons[icon]} />
            </div>
            <div className="menu-item-label">
                <span>{label}</span>
            </div>
        </div>
    );
};

MenuItem.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func
};

export default MenuItem;
