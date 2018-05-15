import React from 'react';
import PropTypes from 'prop-types';
import { ENTER_KEY_CODE } from '../../constants';
import './NavigationCard.css';
import MyProducerIcon from './MyProducerIcon';
import BuyEnergyIcon from './BuyEnergyIcon';
import SellEnergyIcon from './SellEnergyIcon';

const ICONS_TYPES = {
    buy_energy: BuyEnergyIcon,
    my_producer: MyProducerIcon,
    sell_energy: SellEnergyIcon
};

class NavigationCard extends React.Component {
    handlerCardEnterPress(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this.props.onCardClickHandler();
        }
    }

    render() {
        const { title, type, onCardClickHandler } = this.props;
        const Icon = ICONS_TYPES[type];

        return (
            <div
                className="nav-card-container"
                onClick={() => onCardClickHandler()}
                onKeyUp={event => this.handlerCardEnterPress(event)}
                tabIndex={0}
            >
                <div className="nav-card">
                    <div className="nav-card-image-container">
                        <Icon />
                    </div>
                    <div className="nav-card-title-container">
                        <p className="nav-card-title">{title}</p>
                    </div>
                </div>
            </div>
        );
    }
}

NavigationCard.propTypes = {
    title: PropTypes.string,
    type: PropTypes.oneOf(['buy_energy', 'my_producer', 'sell_energy']),
    onCardClickHandler: PropTypes.func.isRequired
};

export default NavigationCard;
