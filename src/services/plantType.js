import { defineMessages } from 'react-intl';
import { PLANT_TYPES } from '../constants';

const labels = defineMessages({
    biomass: {
        id: 'app.plantType.biomass',
        defaultMessage: 'Biomass'
    },
    solar: {
        id: 'app.plantType.solar',
        defaultMessage: 'Solar'
    },
    wind: {
        id: 'app.plantType.wind',
        defaultMessage: 'Wind'
    },
    other: {
        id: 'app.plantType.other',
        defaultMessage: 'Other'
    }
});

export function convertPlantType(type) {
    switch (type) {
        case PLANT_TYPES.biomass:
            return labels.biomass;
        case PLANT_TYPES.solar:
            return labels.solar;
        case PLANT_TYPES.wind:
            return labels.wind;
        default:
            return labels.other;
    }
}
