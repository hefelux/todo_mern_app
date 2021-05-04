import React, { useContext, useEffect } from "react";
import projectContext from "../../context/projects/projectContext";
import ProjectItem from "./ProjectItem";
import AlertContext from "../../context/alerts/alertContext";

const ProjectList = () => {
    // Obtener state del formulario con context
    const projectsContext = useContext(projectContext);
    const { projectList, errorMessage, getProjectListFn } = projectsContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlertFn } = alertContext;

    // Se ejecuta una sola vez al iniciar el componente
    useEffect(() => {
        if (errorMessage) {
            showAlertFn(errorMessage.message, errorMessage.category);
        }
        getProjectListFn();
        // eslint-disable-next-line
    }, [errorMessage]);

    if (projectList.length === 0) {
        return <p>No has añadido ningún proyecto.</p>;
    }

    return (
        <ul className="listado-proyectos">
            {alert ? (
                <div className={`alerta ${alert.category}`}>
                    {alert.message}
                </div>
            ) : null}
            {projectList.map((project) => (
                <ProjectItem key={project._id} project={project} />
            ))}
        </ul>
    );
};

export default ProjectList;
