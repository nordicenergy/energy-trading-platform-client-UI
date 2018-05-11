import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SortOption from './SortOption';
import './SortToolbar.css';

class SortToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortParams: {}
        };
    }

    handleSortOptionChange(sortParam) {
        const { onChange } = this.props;
        const { sortParams } = this.state;
        const newSortParams = { ...sortParams, ...sortParam };

        Object.keys(newSortParams).forEach(key => {
            if (!newSortParams[key]) {
                delete newSortParams[key];
            }
        });

        this.setState({ sortParams: newSortParams });
        onChange && onChange(newSortParams);
    }

    render() {
        const { className, labels, sortOptions } = this.props;
        const classes = classNames('sort-toolbar', className);

        return (
            <div className={classes}>
                <strong className="sort-toolbar-title">{labels.title}</strong>
                {sortOptions.map(sortOption => (
                    <SortOption
                        key={sortOption.value}
                        {...sortOption}
                        onChange={sortParam => this.handleSortOptionChange(sortParam)}
                    />
                ))}
            </div>
        );
    }
}

SortToolbar.propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({
        title: PropTypes.string
    }),
    sortOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ),
    onChange: PropTypes.func
};
SortToolbar.defaultProps = {
    labels: {
        title: 'Sort by'
    },
    sortOptions: []
};

export default SortToolbar;
