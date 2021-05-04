import React, { useContext } from 'react';
import taskContext from "../../context/tasks/taskContext";

const Task = ({ task }) => {

    const { _id, name, done, projectId } = task;

    const tasksContext = useContext(taskContext);
    const {
        deleteTaskFn,
        getTaskListFn,
        editTaskFn,
        setActiveTaskFn,
    } = tasksContext;

    const deleteTask = () => {
        deleteTaskFn(_id);
        getTaskListFn(projectId);
    }

    const changeStatus = () => {
        const newTask = {
            ...task,
            done: !done
        }
        editTaskFn(newTask);
        getTaskListFn(projectId);
    }

     const setActiveTask = () => {
         setActiveTaskFn(task);
     };

    return (
        <li className="tarea sombra">
            {name}
            <div className="estado">
                {done ? (
                    <button
                        type="button"
                        className="completo"
                        onClick={changeStatus}
                    >
                        Terminada
                    </button>
                ) : (
                    <button
                        type="button"
                        className="incompleto"
                        onClick={changeStatus}
                    >
                        En Progreso
                    </button>
                )}
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={setActiveTask}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={deleteTask}
                >
                    Eliminar
                </button>
            </div>
        </li>
    );
};

export default Task;