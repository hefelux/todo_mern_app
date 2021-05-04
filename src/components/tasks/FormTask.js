import React, { useState, useContext, useEffect } from "react";
import taskContext from "../../context/tasks/taskContext";

const FormTask = ({project}) => {

    const { _id } = project;

    const tasksContext = useContext(taskContext);
    const {
        activeTask,
        addTaskFn,
        getTaskListFn,
        showTaskFormError,
        showTaskFormErrorFn,
        editTaskFn,
    } = tasksContext;

    const [task, saveTask] = useState({
        taskName: ''
    });

    const { taskName } = task;

    useEffect(() => {
        if (activeTask !== null) {
            saveTask({
                taskName: activeTask.name,
            });
        } else {
            saveTask({
                taskName: "",
            });
        }
    }, [activeTask]);

    const SaveNameTask = (e) => {
        showTaskFormErrorFn(false);
        saveTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const addNewTask = (e) => {
        e.preventDefault();
        // Validar campo
        if(taskName === '') {
            showTaskFormErrorFn(true);
            return;
        }

        // Añadir o Editar
        if (activeTask === null) {
            const newTask = {
                name: taskName,
                done: false,
                projectId: _id,
            };
            // Actualizar state
            addTaskFn(newTask);
        } else {
            const editTask = {
                ...activeTask,
                name: taskName
            }
            editTaskFn(editTask);
        }
        
        // Vaciar formulario
        saveTask({
            taskName: ''
        })
        getTaskListFn(_id);
    }

    return (
        <div className="formulario">
            <form onSubmit={addNewTask}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        name="taskName"
                        id="taskName"
                        className="input-text"
                        placeholder="Nombre tarea"
                        value={taskName}
                        onChange={SaveNameTask}
                    />
                </div>
                {showTaskFormError ? (
                    <p className="mensaje error">
                        Debes ingresar un nombre a tu tarea.
                    </p>
                ) : null}
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={ activeTask === null ? 'Agregar nueva tarea' : 'Editar tarea'}
                    />
                </div>
            </form>
        </div>
    );
};

export default FormTask;
