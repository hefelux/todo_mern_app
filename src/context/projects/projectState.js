import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
    ADD_PROJECT,
    GET_PROJECT_LIST,
    SHOW_PROJECT_FORM,
    SHOW_PROJECT_FORM_ERROR,
    PROJECT_ERROR,
    SET_PROJECT_ACTIVE,
    DELETE_PROJECT
} from "../../types";
import axiosClient from '../../config/axios';

const ProjectState = props => {
    const initialState = {
        showNewProjectForm: false,
        showNewProjectFormError: false,
        projectList: [],
        activeProject: null,
        errorMessage: null
    };
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(projectReducer, initialState); 

    // Serie de funciones para el CRUD
    const setActiveProjectFn = (project) => {
        dispatch({
            type: SET_PROJECT_ACTIVE,
            payload: project,
        });
    };

    const showNewProjectFormFn = () => {
        dispatch({
            type: SHOW_PROJECT_FORM
        });
    }

    const showNewProjectFormErrorFn = (status) => {
        dispatch({
            type: SHOW_PROJECT_FORM_ERROR,
            payload: status
        });
    };

    const getProjectListFn = async () => {
        try {
            const res = await axiosClient.get('/projects');
            dispatch({
                type: GET_PROJECT_LIST,
                payload: res.data,
            });
            
        } catch (error) {
            const alert = {
                message: "Hubo un error al obtener tus proyectos.",
                category: "alerta-error",
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert,
            });
        }
    };
    
    const addProjectFn = async (newProject) => {
        try {
            const res = await axiosClient.post('/projects/create', newProject);
            dispatch({
                type: ADD_PROJECT,
                payload: res.data,
            });
            
        } catch (error) {
            const alert = {
                message: "Hubo un error al añadir el proyecto.",
                category: "alerta-error",
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert,
            });
        }
        
    }

    const deleteProjectFn = async (id) => {
        try {
            await axiosClient.delete(`/projects/delete/${id}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: id,
            });
            
        } catch (error) {
            const alert = {
                message: 'Hubo un error al eliminar el proyecto.',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert,
            });
        }
        
    };

    return (
        <projectContext.Provider
            value={{
                showNewProjectForm: state.showNewProjectForm,
                showNewProjectFormError: state.showNewProjectFormError,
                projectList: state.projectList,
                errorMessage: state.errorMessage,
                taskList: state.taskList,
                activeProject: state.activeProject,
                showNewProjectFormFn,
                showNewProjectFormErrorFn,
                getProjectListFn,
                addProjectFn,
                setActiveProjectFn,
                deleteProjectFn,
            }}
        >
            {props.children}
        </projectContext.Provider>
    );
}

export default ProjectState;