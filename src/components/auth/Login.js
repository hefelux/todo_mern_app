import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
    const alertsContext = useContext(AlertContext);
    const { alert, showAlertFn } = alertsContext;

    const authContext = useContext(AuthContext);
    const { authenticated, alert_message, loginUserFn } = authContext;

    // Se ejecuta segun se actualicen las variables indicadas
    useEffect(() => {
        if (authenticated) {
            props.history.push("/projects");
        }

        if (alert_message) {
            showAlertFn(alert_message.message, alert_message.category);
        }
        // eslint-disable-next-line
    }, [authenticated, alert_message, props.history]);

    // State iniciar sesión
    const [usuario, guardarUsuario] = useState({
        email: "",
        password: "",
    });

    const { email, password } = usuario;

    // Methods
    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    // Submit inicio sesion
    const onSubmit = (e) => {
        e.preventDefault();
        
        // Validar campos vacíos
        if (
            email.trim() === "" ||
            password.trim() === ""
        ) {
            showAlertFn("Todos los campos son obligatorios.", "alerta-error");
            return;
        }

        // Pasarlo al action del reducer
        loginUserFn({ email, password });
    };

    return (
        <div className="form-usuario">
            {alert ? (
                <div className={`alerta ${alert.category}`}>
                    {alert.message}
                </div>
            ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Tu email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            value="Iniciar sesión"
                            className="btn btn-primario btn-block"
                        />
                    </div>
                </form>
                <Link to={"/register"} className="enlace-cuenta">
                    Crear nueva cuenta
                </Link>
            </div>
        </div>
    );
};

export default Login;
