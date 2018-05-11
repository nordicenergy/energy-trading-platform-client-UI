import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from '../TextField';
import DateField from '../DateField';
import SortToolbar from '../SortToolbar';
import TradePosition, { TradePositionPropType } from './TradePosition';
import './TradePositionsList.css';

class TradePositionsList extends Component {
    render() {
        const {
            id,
            className,
            labels,
            tradeVolume,
            onTradeVolumeChange,
            dateFilter,
            onDateFilterChange,
            sortOptions,
            onSortParametersChange,
            tradePositions
        } = this.props;
        const classes = classNames('trade-positions-list', className);

        return (
            <div className={classes}>
                <h3>{labels.title}</h3>
                <form className="trade-positions-list-toolbar" aria-controls={id}>
                    <TextField
                        label={labels.tradeVolumeField}
                        addon="kWh"
                        value={tradeVolume}
                        onChange={onTradeVolumeChange}
                    />
                    <DateField label={labels.filterByDateField} dateFilter={dateFilter} onChange={onDateFilterChange} />
                    {sortOptions.length > 0 && (
                        <div className="trade-positions-list-sort-toolbar">
                            <SortToolbar
                                labels={{ title: labels.sortToolbarTitle }}
                                sortOptions={sortOptions}
                                onChange={onSortParametersChange}
                            />
                        </div>
                    )}
                </form>
                {tradePositions.length > 0 && (
                    <ul id={id} className="trade-positions">
                        {tradePositions.map(tradePosition => (
                            <li key={tradePosition.offerAddress}>
                                <TradePosition tradePosition={tradePosition} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

TradePositionsList.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    labels: PropTypes.shape({
        title: PropTypes.string,
        tradeVolumeField: PropTypes.string,
        filterByDateField: PropTypes.string
    }),
    tradeVolume: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onTradeVolumeChange: PropTypes.func,
    dateFilter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onDateFilterChange: PropTypes.func,
    sortOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ),
    onSortParametersChange: PropTypes.func,
    tradePositions: PropTypes.arrayOf(TradePositionPropType)
};
TradePositionsList.defaultProps = {
    id: `trade-positions-${Date.now()}`,
    labels: {
        title: 'Open Trade Positions',
        tradeVolumeField: 'Trade Volume',
        filterByDateField: 'Filter by Date',
        sortToolbarTitle: 'Sort by'
    },
    tradeVolume: '',
    dateFilter: '',
    sortOptions: [],
    tradePositions: []
};

export default TradePositionsList;
