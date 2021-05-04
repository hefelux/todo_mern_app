import React, { useReducer } from "react";
import taskContext from "./taskContext";
import taskReducer from "./taskReducer";
import {
    GET_TASK_LIST,
    ADD_TASK,
    SHOW_TASK_FORM_ERROR,
    DELETE_TASK,
    SET_ACTIVE_TASK,
    EDIT_TASK,
} from "../../types";
import axiosClient from '../../config/axios';

const TaskState = (props) => {
    const initialState = {
        projectTaskList: [],
        showTaskFormError: false,
        activeTask: null
    };
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Serie de funciones para el CRUD
    const getTaskListFn = async (projectId) => {
        try {
            const res = await axiosClient.get("/tasks", {
                params: { projectId },
            });
            dispatch({
                type: GET_TASK_LIST,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }

    };

    const addTaskFn = async (task) => {
        try {
            const res = await axiosClient.post("/tasks/create", task);
            dispatch({
                type: ADD_TASK,
                payload: res.data,
            });
        } catch (error) {
            console.log(error)
        }
        
    }

    const showTaskFormErrorFn = (status) => {
        dispatch({
            type: SHOW_TASK_FORM_ERROR,
            payload: status,
        });
    };

    const deleteTaskFn = async (id) => {
        try {
            await axiosClient.delete(`/tasks/delete/${id}`);
            dispatch({
                type: DELETE_TASK,
                payload: id,
            });
        } catch (error) {
            console.log(error)
        }
        
    };

    const setActiveTaskFn = (task) => {
        dispatch({
            type: SET_ACTIVE_TASK,
            payload: task,
        });
    }

    const editTaskFn = async (task) => {
        try {
            const res = await axiosClient.put(`/tasks/edit/${task._id}`, task);
            dispatch({
                type: EDIT_TASK,
                payload: res.data,
            });
        } catch (error) {
            console.log(error)
        }
        
    };

    return (
        <taskContext.Provider
            value={{
                projectTaskList: state.projectTaskList,
                showTaskFormError: state.showTaskFormError,
                activeTask: state.activeTask,
                getTaskListFn,
                addTaskFn,
                showTaskFormErrorFn,
                deleteTaskFn,
                setActiveTaskFn,
                editTaskFn,
            }}
        >
            {props.children}
        </taskContext.Provider>
    );
};

export default TaskState;
