import React from 'react';
import PropTypes from 'prop-types';
import { formatFloat } from '../../services/formatter';

import './MeterReadingsHistory.css';

const MeterReadingsHistory = ({ title, data, noDataMessage }) => {
    return (
        <div>
            <table className="meter-readings-history">
                <caption>{title}</caption>
                <tbody>
                    {data.map((item, index) => {
                        const isConsumptionValid = item.value != null && isFinite(item.value);
                        const value = isConsumptionValid ? formatFloat(item.value) : '-';
                        return (
                            <tr key={`${Date.now()}${index}`}>
                                <td>{item.date || '-'} </td>
                                <td>{`${value} kWh` || '-'}</td>
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
    noDataMessage: PropTypes.string
};

MeterReadingsHistory.defaultProps = {
    data: [],
    title: '-',
    noDataMessage: '-'
};

export default MeterReadingsHistory;
