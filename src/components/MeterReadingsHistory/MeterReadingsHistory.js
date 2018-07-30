import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../services/formatter';
import { MONTH_DAY_DATE_FORMAT } from '../../constants';
import { formatFloat } from '../../services/formatter';

import './MeterReadingsHistory.css';

const MeterReadingsHistory = ({ title, data, consumptionUnitLabel, noDataMessage }) => {
    return (
        <div>
            <table className="meter-readings-history">
                <caption>{title}</caption>
                <tbody>
                    {data.map((item, index) => {
                        const isConsumptionValid = item.consumption != null && isFinite(item.consumption);
                        const value = isConsumptionValid ? formatFloat(item.consumption) : '-';
                        return (
                            <tr key={`${item.date}${index}`}>
                                <td>{item.date ? formatDate(item.date, MONTH_DAY_DATE_FORMAT) : '-'} </td>
                                <td>
                                    {value} {consumptionUnitLabel || '-'}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <p>{!data.length && noDataMessage}</p>
        </div>
    );
};

MeterReadingsHistory.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    consumptionUnitLabel: PropTypes.string,
    noDataMessage: PropTypes.string
};

MeterReadingsHistory.defaultProps = {
    data: [],
    title: '-',
    consumptionUnitLabel: '-',
    noDataMessage: '-'
};

export default MeterReadingsHistory;
