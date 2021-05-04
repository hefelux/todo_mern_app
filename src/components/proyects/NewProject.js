import React, { Fragment, useState, useContext } from "react";
import projectContext from "../../context/projects/projectContext";

const NewProject = () => {
    // Obtener state del formulario con context
    const projectsContext = useContext(projectContext);
    const {
        showNewProjectForm,
        showNewProjectFormError,
        showNewProjectFormFn,
        showNewProjectFormErrorFn,
        addProjectFn,
    } = projectsContext;

    // State para proyecto
    const [proyecto, guardarProyecto] = useState({
        projectName: "",
    });

    const { projectName } = proyecto;

    const onChangeProject = (e) => {
        showNewProjectFormErrorFn(false);
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitProject = (e) => {
        e.preventDefault();
        // Validar nombre
        if (projectName === "") {
            showNewProjectFormErrorFn(true);
            return;
        }

        const newProject = { name: projectName };
        // Agregar al state
        addProjectFn(newProject);
        // Reiniciar el form
        guardarProyecto({
            projectName: "",
        });
    };

    return (
        <Fragment>
            <button
                onClick={() => showNewProjectFormFn()}
                type="button"
                className="btn btn-primario btn-block"
            >
                Nuevo Proyecto
            </button>
            {showNewProjectForm ? (
                <form
                    onSubmit={onSubmitProject}
                    className="formulario-nuevo-proyecto"
                >
                    <input
                        type="text"
                        name="projectName"
                        id="projectName"
                        className="input-text"
                        placeholder="Nombre proyecto"
                        value={projectName}
                        onChange={onChangeProject}
                    />
                    {showNewProjectFormError ? (
                        <p className="mensaje error">Debes ingresar un nombre a tu proyecto.</p>
                    ) : null}
                    <input
                        type="submit"
                        value="Agregar proyecto"
                        className="btn btn-primario btn-block"
                    />
                </form>
            ) : null}
        </Fragment>
    );
};

export default NewProject;
