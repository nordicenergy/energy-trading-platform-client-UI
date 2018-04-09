import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import icons from '@fortawesome/fontawesome-free-solid';
import classNames from 'classnames';
import './Breadcrumbs.css';

class Breadcrumbs extends React.Component {
    renderBreadcrumbsItems() {
        const { items, iconsTypes, onClick } = this.props;
        const [rootBreadCrumb = {}, ...breadCrumbs] = items;
        const isRootIcon = rootBreadCrumb.type === 'icon';
        const rootBreadcrumbLabel = isRootIcon ? (
            <FontAwesomeIcon icon={icons[iconsTypes[rootBreadCrumb.id]]} />
        ) : (
            rootBreadCrumb.label
        );
        const iconBreadcrumbElement = (
            <div className="breadcrumb-item" key={rootBreadCrumb.id}>
                <a
                    className="icon-breadcrumb"
                    onClick={() => {
                        onClick(rootBreadCrumb.path);
                    }}
                >
                    {rootBreadcrumbLabel}
                </a>
                <div className="breadcrumb-arrow">
                    <FontAwesomeIcon icon={icons.faAngleRight} />
                </div>
            </div>
        );
        const breadCrumbElements = breadCrumbs.map((item, index) => {
            const isLastItem = index === breadCrumbs.length - 1;
            const isBreadCrumbIcon = item.type === 'icon';
            const breadcrumbLabel = isBreadCrumbIcon ? (
                <FontAwesomeIcon icon={icons[iconsTypes[item.id]]} />
            ) : (
                item.label
            );
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
                            onClick(item.path);
                        }}
                    >
                        {breadcrumbLabel}
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
    render() {
        return (
            <div className="breadcrumbs">{this.renderBreadcrumbsItems()}</div>
        );
    }
}

Breadcrumbs.propTypes = {
    items: PropTypes.array,
    iconsTypes: PropTypes.object,
    onClick: PropTypes.func
};

Breadcrumbs.defaultProps = {
    items: [],
    iconsTypes: {},
    onClick: () => {}
};

export default Breadcrumbs;
