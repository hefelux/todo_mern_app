import React, { useReducer } from "react";
import alertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SHOW_ALERT, HIDE_ALERT } from "../../types";

const AlertState = (props) => {
    const initialState = {
        alert: null,
    };
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Serie de funciones para el CRUD
    const showAlertFn = (message, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: { message, category },
        });
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT,
            });
        }, 5000);
    };

    return (
        <alertContext.Provider
            value={{
                alert: state.alert,
                showAlertFn,
            }}
        >
            {props.children}
        </alertContext.Provider>
    );
};

export default AlertState;
