import Producer from './Producer';
import { defineMessages } from 'react-intl';
import { convertPlantType } from '../../services/plantType';

const labels = defineMessages({
    header: {
        id: 'app.producerPage.header',
        defaultMessage: 'My Producer'
    },
    name: {
        id: 'app.producerPage.name',
        defaultMessage: 'Name'
    },
    price: {
        id: 'app.producerPage.price',
        defaultMessage: 'Price'
    },
    marketPrice: {
        id: 'app.producerPage.marketPrice',
        defaultMessage: 'vs. market price of'
    },
    energyType: {
        id: 'app.producerPage.energyType',
        defaultMessage: 'Type of energy'
    },
    annualProduction: {
        id: 'app.producerPage.annualProduction',
        defaultMessage: 'Annual Production'
    },
    purchased: {
        id: 'app.producerPage.purchased',
        defaultMessage: 'Energy purchased'
    },
    capacity: {
        id: 'app.producerPage.capacity',
        defaultMessage: 'Peak Capacity'
    },
    selectedSince: {
        id: 'app.producerPage.selectedSince',
        defaultMessage: 'Selected since'
    },
    location: {
        id: 'app.producerPage.location',
        defaultMessage: 'Location'
    },
    selectButton: {
        id: 'app.producerPage.selectButton',
        defaultMessage: 'Select Producer'
    },
    deselectButton: {
        id: 'app.producerPage.deselectButton',
        defaultMessage: 'Deselect Producer'
    },
    changeButton: {
        id: 'app.producerPage.changeButton',
        defaultMessage: 'Change Producer'
    },
    backButton: {
        id: 'app.producerPage.backButton',
        defaultMessage: 'Back to Producers'
    },
    switchBack: {
        id: 'app.producerPage.switchBack',
        defaultMessage: 'Switch back to market price purchasing'
    }
});

function prepareProducerInfoProps(translate, producer) {
    return {
        labels: {
            name: translate(labels.name),
            price: translate(labels.price),
            marketPrice: translate(labels.marketPrice),
            energyType: translate(labels.energyType),
            annualProduction: translate(labels.annualProduction),
            purchased: translate(labels.purchased),
            capacity: translate(labels.capacity),
            selectedSince: translate(labels.selectedSince),
            location: translate(labels.location)
        },
        details: {
            name: producer.name,
            marketPrice: producer.marketPrice,
            price: producer.price,
            energyType: translate(convertPlantType(producer.plantType)),
            annualProduction: producer.annualProduction,
            purchased: producer.purchased,
            capacity: producer.capacity,
            selectedSince: producer.dates,
            location: producer.location
        },
        description: producer.description,
        picture: producer.picture
    };
}

// Common
export { labels, prepareProducerInfoProps };

export default Producer;
