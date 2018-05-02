import { PlantType as messages } from '../services/translations/messages';
import { PLANT_TYPES } from '../constants';

export function convertPlantType(type) {
    switch (type) {
        case PLANT_TYPES.biomass:
            return messages.biomass;
        case PLANT_TYPES.solar:
            return messages.solar;
        case PLANT_TYPES.wind:
            return messages.wind;
        default:
            return messages.other;
    }
}
