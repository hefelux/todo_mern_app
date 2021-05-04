import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...props }) => {
    const _authContext = useContext(authContext);
    const { authenticated, loading, getUserFn } = _authContext;

    useEffect(()=> {
        getUserFn();
        // eslint-disable-next-line
    },[]);

    return (
        <Route
            {...props}
            render={(props) =>
                !authenticated && !loading ? (
                    <Redirect to="/login" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PrivateRoute;
