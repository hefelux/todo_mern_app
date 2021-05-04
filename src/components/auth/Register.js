import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
    const alertsContext = useContext(AlertContext);
    const { alert, showAlertFn } = alertsContext;

    const authContext = useContext(AuthContext);
    const { authenticated, alert_message, registerUserFn } = authContext;

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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { name, email, password, confirmPassword } = usuario;

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
            name.trim() === "" ||
            email.trim() === "" ||
            password.trim() === "" ||
            confirmPassword.trim() === ""
        ) {
            showAlertFn("Todos los campos son obligatorios.", "alerta-error");
            return;
        }
        // Password mínimo 6 carácteres
        if (password.length < 6) {
            showAlertFn(
                "La contraseña debe tener al menos 6 caracteres.",
                "alerta-error"
            );
            return;
        }
        // Password Iguales
        if (password !== confirmPassword) {
            showAlertFn("Las contraseñas deben ser iguales.", "alerta-error");
            return;
        }
        // Pasarlo al action del reducer
        registerUserFn({ name, email, password });
    };

    return (
        <div className="form-usuario">
            {alert ? (
                <div className={`alerta ${alert.category}`}>
                    {alert.message}
                </div>
            ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear cuenta</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Tu nombre"
                            value={name}
                            onChange={onChange}
                        />
                    </div>
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
                        <label htmlFor="confirm_password">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirm_password"
                            placeholder="Confirma tu contraseña"
                            value={confirmPassword}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            value="Crear cuenta"
                            className="btn btn-primario btn-block"
                        />
                    </div>
                </form>
                <Link to={"/"} className="enlace-cuenta">
                    Iniciar sesión
                </Link>
            </div>
        </div>
    );
};

export default Register;
