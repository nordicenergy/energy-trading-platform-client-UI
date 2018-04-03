import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import icons from '@fortawesome/fontawesome-free-solid';
import classNames from 'classnames';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items, iconsTypes, navigateTo }) => {
    function renderBreadcrumbsItems() {
        const [iconBreadCrumb = {}, ...breadCrumbs] = items;
        const iconName = iconsTypes[iconBreadCrumb.id];
        const iconBreadcrumbElement = (
            <div className="breadcrumb-item" key={iconBreadCrumb.id}>
                <a
                    className="icon-breadcrumb"
                    onClick={() => {
                        navigateTo(iconBreadCrumb.path);
                    }}
                >
                    {<FontAwesomeIcon icon={icons[iconName]} />}
                </a>
                <div className="breadcrumb-arrow">
                    <FontAwesomeIcon icon={icons.faAngleRight} />
                </div>
            </div>
        );
        const breadCrumbElements = breadCrumbs.map((item, index) => {
            const isLastItem = index === breadCrumbs.length - 1;
            return (
                <div
                    className={classNames('breadcrumb-item', {
                        'current-item': isLastItem
                    })}
                    key={item.id}
                >
                    <a
                        className="breadcrumb"
                        onClick={() => {
                            navigateTo(item.path);
                        }}
                    >
                        {item.label}
                    </a>
                    {!isLastItem && (
                        <div className="breadcrumb-arrow">
                            <FontAwesomeIcon icon={icons.faAngleRight} />
                        </div>
                    )}
                </div>
            );
        });
        return breadCrumbs.length
            ? [iconBreadcrumbElement, ...breadCrumbElements]
            : null;
    }
    return <div className="breadcrumbs">{renderBreadcrumbsItems()}</div>;
};

Breadcrumbs.propTypes = {
    items: PropTypes.array,
    iconsTypes: PropTypes.object,
    navigateTo: PropTypes.func
};

Breadcrumbs.defaultProps = {
    items: [],
    iconsTypes: {},
    navigateTo: () => {}
};

export default Breadcrumbs;
