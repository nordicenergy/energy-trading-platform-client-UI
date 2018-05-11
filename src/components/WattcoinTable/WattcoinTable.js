import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components';

import './WattcoinTable.css';

class WattcoinTable extends React.Component {
    renderCountCell(label, count) {
        return (
            <div className="wattcoin-table-count-info" role="cell">
                <div className="wattcoin-table-label">{label}</div>
                <div className="wattcoin-table-value">{count}</div>
            </div>
        );
    }

    renderTextualCell(label, value) {
        return (
            <div className="wattcoin-table-textual-info" role="cell">
                <span className="wattcoin-table-label">{label}</span>
                <span className="wattcoin-table-value">{value}</span>
            </div>
        );
    }

    renderTotalCell(label, total) {
        const { onMoreClick = f => f, labels = {} } = this.props;
        const { button = 'More' } = labels;
        return (
            <div className="wattcoin-table-total-info" role="cell">
                <span>
                    <span className="wattcoin-table-label">{label}</span>
                    <span className="wattcoin-table-value">{`${total || ''}`.replace('.', ',')}</span>
                </span>
                <Button disabled className="wattcoin-table-more-button" onClick={() => onMoreClick()}>
                    {button}
                </Button>
            </div>
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
                <span id="wattcoin-table-caption">{caption}</span>
                <div role="table" aria-labelledby="wattcoin-table-caption">
                    <div role="rowgroup">
                        <div role="row">{this.renderTextualCell(producer, data.producer)}</div>
                        <div role="row">{this.renderTextualCell(energyType, data.type)}</div>
                    </div>
                    <div role="rowgroup">
                        <div role="row">{this.renderTotalCell(total, data.total)}</div>
                        <div role="row">
                            {this.renderCountCell(trx, count.trx)}
                            {this.renderCountCell(sent, count.sent)}
                            {this.renderCountCell(received, count.received)}
                        </div>
                    </div>
                </div>
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
