import React, { useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import FormTask from "../tasks/FormTask";
import TaskList from "../tasks/TaskList";
import projectContext from "../../context/projects/projectContext";
import authContext from "../../context/auth/authContext";

const Proyects = () => {
    const _authContext = useContext(authContext);
    const { getUserFn } = _authContext;

    // Se ejecuta segun se actualicen las variables indicadas
    useEffect(() => {
        getUserFn();
        // eslint-disable-next-line
    }, []);

    const projectsContext = useContext(projectContext);
    const { activeProject } = projectsContext;

    return (
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Navbar />
                {activeProject !== null ? (
                    <main>
                        <FormTask project={activeProject} />
                        <div className="contenedor-tareas">
                            <TaskList project={activeProject} />
                        </div>
                    </main>
                ) : (
                    <h2>Selecciona un proyecto para comenzar.</h2>
                )}
            </div>
        </div>
    );
};

export default Proyects;
