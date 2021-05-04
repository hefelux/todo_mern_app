import React, { useContext, useEffect } from "react";
import authContext from "../../context/auth/authContext";

const Navbar = () => {
    const _authContext = useContext(authContext);
    const { user, getUserFn, logoutUserFn } = _authContext;

    // Se ejecuta segun se actualicen las variables indicadas
    useEffect(() => {
        getUserFn();
        // eslint-disable-next-line
    }, []);

    const logout = () => {
        logoutUserFn();
    };

    return (
        <header className="app-header">
            {user ? (
                <p className="nombre-usuario">
                    Hola <span>{user.name}</span>
                </p>
            ) : null}

            <nav className="nav-principal">
                <button className="btn btn-blank cerrar-sesion" onClick={logout}>Cerrar Sesión</button>
            </nav>
        </header>
    );
};

export default Navbar;
