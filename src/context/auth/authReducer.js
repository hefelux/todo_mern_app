import {
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    CLOSE_SESSION,
} from "../../types";

const authReducer = (state, action) => {
    let stateReduced = {};

    switch (action.type) {
        case LOGIN_SUCCESS:
        case CREATE_ACCOUNT_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            stateReduced = {
                ...state,
                authenticated: true,
                alert_message: null,
                loading: false
            };
            break;
        case CLOSE_SESSION:
        case LOGIN_ERROR:
        case CREATE_ACCOUNT_ERROR:
            localStorage.removeItem("token");
            stateReduced = {
                ...state,
                token: null,
                user: null,
                authenticated: false,
                alert_message: action.payload,
                loading: false,
            };
            break;
        case GET_USER:
            stateReduced = {
                ...state,
                authenticated: true,
                user: action.payload.user,
                loading: false,
            };
            break;
        default:
            stateReduced = state;
            break;
    }

    return stateReduced;
};

export default authReducer;
