import React from 'react';
import PropTypes from 'prop-types';
import icons from '@fortawesome/fontawesome-free-solid/index';
import classNames from 'classnames';
import './DisclosureArrow.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const DisclosureArrow = ({ expanded, onClick }) => (
    <button className={classNames('disclosure-arrow', { expanded: expanded })} onClick={onClick}>
        <div>
            <FontAwesomeIcon icon={icons['faChevronRight']} />
        </div>
    </button>
);

DisclosureArrow.propTypes = {
    expanded: PropTypes.bool,
    onClick: PropTypes.func
};

export default DisclosureArrow;
