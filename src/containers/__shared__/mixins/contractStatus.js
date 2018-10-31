import { CONTRACT_STATUSES } from '../../../constants';

const contractStatusMixin = Base =>
    class extends Base {
        validateContractStatus(statusCode) {
            return statusCode === CONTRACT_STATUSES.active || statusCode === CONTRACT_STATUSES.terminated;
        }
    };

export default contractStatusMixin;
