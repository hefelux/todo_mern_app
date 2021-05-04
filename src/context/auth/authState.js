import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    CLOSE_SESSION,
} from "../../types";
import axiosClient from '../../config/axios';
import tokenAuth from "../../config/tokenAuth";

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        authenticated: null,
        user: null,
        alert_message: null,
        loading: true
    };
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Serie de funciones para el CRUD
    const registerUserFn = async (data) => {
        try {
            const response = await axiosClient.post("users/create", data);

            dispatch({
                type: CREATE_ACCOUNT_SUCCESS,
                payload: response.data,
            });
            // Obtener datos de usuario
            getUserFn();

        } catch (error) {
            const alert = {
                message: error.response.data.msg,
                category: "alerta-error",
            };
            dispatch({
                type: CREATE_ACCOUNT_ERROR,
                payload: alert,
            });
        }
    };

    const getUserFn = async (data) => {
        const token = localStorage.getItem('token');

        if(token) {
            tokenAuth(token);
        }

        try {
            const response = await axiosClient.get("auth/getuser", data);
            dispatch({
                type: GET_USER,
                payload: response.data,
            });
        } catch (error) { 
            console.log(error.response);
            const alert = {
                message: error.response.data.msg,
                category: "alerta-error",
            };
            dispatch({
                type: LOGIN_ERROR,
                payload: alert,
            });
        }
    };

    const loginUserFn = async (data) => {
        try {
            const response = await axiosClient.post("auth/login", data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data,
            });
            // Obtener datos de usuario
            getUserFn();
        } catch (error) {
            console.log(error.response);
            const alert = {
                message: error.response.data.msg,
                category: "alerta-error",
            };
            dispatch({
                type: LOGIN_ERROR,
                payload: alert,
            });
        }
    };

    const logoutUserFn = async () => {
        try {
            dispatch({
                type: CLOSE_SESSION,
            });
        } catch (error) {
            console.log(error.response);
        }
    };


    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                alert_message: state.alert_message,
                loading: state.loading,
                registerUserFn,
                loginUserFn,
                getUserFn,
                logoutUserFn,
            }}
        >
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;
