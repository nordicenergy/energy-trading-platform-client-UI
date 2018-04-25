import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components';

import './WattcoinTable.css';

class WattcoinTable extends React.Component {
    renderCountCell(label, count) {
        return (
            <td className="wattcoin-table-count-info">
                <div>
                    <div className="wattcoin-table-label">{label}</div>
                    <div className="wattcoin-table-value">{count}</div>
                </div>
            </td>
        );
    }

    renderTextualCell(label, value) {
        return (
            <td className="wattcoin-table-textual-info">
                <span className="wattcoin-table-label">{label}</span>
                <span className="wattcoin-table-value">{value}</span>
            </td>
        );
    }

    renderTotalCell(label, total) {
        const { onMoreClick = f => f, labels = {} } = this.props;
        const { button = 'More' } = labels;
        return (
            <td className="wattcoin-table-total-info" colSpan="3">
                <span>
                    <span className="wattcoin-table-label">{label}</span>
                    <span className="wattcoin-table-value">{`${total || ''}`.replace('.', ',')}</span>
                </span>
                <Button disabled className="wattcoin-table-more-button" onClick={() => onMoreClick()}>
                    {button}
                </Button>
            </td>
        );
    }

    render() {
        const { data = {}, labels = {} } = this.props;
        const {
            caption = 'Wattcoin',
            producer = 'Producer',
            energyType = 'Type of energy',
            total = 'Total',
            trx = 'Transaction',
            sent = 'Sent',
            received = 'Received'
        } = labels;
        const { count = {} } = data;

        return (
            <div className="wattcoin-table-container">
                <table>
                    <caption>{caption}</caption>
                    <tbody>
                        <tr>
                            {this.renderTextualCell(producer, data.producer)}
                            {this.renderTotalCell(total, data.total)}
                        </tr>
                        <tr>
                            {this.renderTextualCell(energyType, data.type)}
                            {this.renderCountCell(trx, count.trx)}
                            {this.renderCountCell(sent, count.sent)}
                            {this.renderCountCell(received, count.received)}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

WattcoinTable.propTypes = {
    labels: PropTypes.shape({
        caption: PropTypes.string,
        producer: PropTypes.string,
        energyType: PropTypes.string,
        total: PropTypes.string,
        trx: PropTypes.string,
        sent: PropTypes.string,
        received: PropTypes.string,
        button: PropTypes.string
    }),
    data: PropTypes.shape({
        producer: PropTypes.string,
        type: PropTypes.string,
        total: PropTypes.number,
        count: PropTypes.shape({
            trx: PropTypes.number,
            sent: PropTypes.number,
            received: PropTypes.number
        })
    }),
    onMoreClick: PropTypes.func
};

export default WattcoinTable;
