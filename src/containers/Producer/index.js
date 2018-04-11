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
    }
});

function prepareProducerInfoProps(translate, producer) {
    return {
        labels: {
            name: translate(labels.name),
            price: translate(labels.price),
            energyType: translate(labels.energyType),
            annualProduction: translate(labels.annualProduction),
            purchased: translate(labels.purchased),
            capacity: translate(labels.capacity),
            selectedSince: translate(labels.selectedSince),
            location: translate(labels.location)
        },
        details: {
            name: producer.name,
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
