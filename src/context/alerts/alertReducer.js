import { SHOW_ALERT, HIDE_ALERT } from '../../types';

const alertReducer = (state, action) => {
    let stateReduced = {};

    switch (action.type) {
        case SHOW_ALERT:
            stateReduced = {
                alert: action.payload,
            };
            break;
        case HIDE_ALERT:
            stateReduced = {
                alert: action.payload,
            };
            break;
        default:
            stateReduced = state;
            break;
    }

    return stateReduced;
};

export default alertReducer;
