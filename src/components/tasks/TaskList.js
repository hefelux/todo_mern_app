import React, { Fragment, useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";
import Task from "./Task";

const TaskList = ({ project }) => {
    const { _id, name } = project;

    const projectsContext = useContext(projectContext);
    const { deleteProjectFn } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { projectTaskList } = tasksContext;

    const deleteProject = () => {
        deleteProjectFn(_id);
    };

    return (
        <Fragment>
            <h2>Proyecto: {name}</h2>
            <ul className="listado-tareas">
                {projectTaskList.length === 0 ? (
                    <li className="tarea">
                        <p>No hay tareas</p>
                    </li>
                ) : (
                    projectTaskList.map((task) => (
                        <Task key={task._id} task={task} />
                    ))
                )}
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={deleteProject}
            >
                Eliminar Proyecto
            </button>
        </Fragment>
    );
};

export default TaskList;
