import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../services/formatter';
import { MONTH_DAY_DATE_FORMAT } from '../../constants';

import './MeterReadingsHistory.css';

const MeterReadingsHistory = ({ title, data, consumptionUnitLabel }) => {
    return (
        <table className="meter-readings-history">
            <caption>{title}</caption>
            <tbody>
            {data.map((item, index) => {
                return (
                    <tr key={`${item.date}${index}`}>
                        <td>{item.date ? formatDate(item.date, MONTH_DAY_DATE_FORMAT) : '-'} </td>
                        <td>
                            {Number.isFinite(item.value) ? item.value : '-'} {consumptionUnitLabel || '-'}
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

MeterReadingsHistory.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    consumptionUnitLabel: PropTypes.string
};

MeterReadingsHistory.defaultProps = {
    data: [],
    title: '-',
    consumptionUnitLabel: '-'
};

export default MeterReadingsHistory;
