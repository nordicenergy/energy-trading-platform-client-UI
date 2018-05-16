import { PlantType as plantTypeMessages, TransactionStatuses as txStatusesMessages } from './messages/index';
import { PLANT_TYPES, TRANSACTION_STATUSES } from '../../constants/index';

export function convertPlantType(type) {
    switch (type) {
        case PLANT_TYPES.biomass:
            return plantTypeMessages.biomass;
        case PLANT_TYPES.solar:
            return plantTypeMessages.solar;
        case PLANT_TYPES.wind:
            return plantTypeMessages.wind;
        default:
            return plantTypeMessages.other;
    }
}

export function convertTransactionStatus(type) {
    switch (type) {
        case TRANSACTION_STATUSES.success:
            return txStatusesMessages.success;
        case TRANSACTION_STATUSES.fail:
            return txStatusesMessages.fail;
        case TRANSACTION_STATUSES.pending:
            return txStatusesMessages.pending;
        case TRANSACTION_STATUSES.waitingForOffer:
            return txStatusesMessages.waitingForOffer;
        default:
            return txStatusesMessages.unknown;
    }
}
