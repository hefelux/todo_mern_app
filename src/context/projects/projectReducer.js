import {
    GET_PROJECT_LIST,
    SHOW_PROJECT_FORM,
    ADD_PROJECT,
    SHOW_PROJECT_FORM_ERROR,
    SET_PROJECT_ACTIVE,
    DELETE_PROJECT,
    PROJECT_ERROR
} from "../../types";

const projectReducer = (state, action) => {
    let stateReduced = {};

    switch (action.type) {
        case SET_PROJECT_ACTIVE:
            stateReduced = {
                ...state,
                activeProject: action.payload,
            };
            break;
        case SHOW_PROJECT_FORM:
            stateReduced = {
                ...state,
                showNewProjectForm: true,
            };
            break;
        case SHOW_PROJECT_FORM_ERROR:
            stateReduced = {
                ...state,
                showNewProjectFormError: action.payload,
            };
            break;
        case GET_PROJECT_LIST:
            stateReduced = {
                ...state,
                projectList: action.payload,
            };
            break;
        case ADD_PROJECT:
            stateReduced = {
                ...state,
                projectList: [...state.projectList, action.payload],
                showNewProjectForm: false,
            };
            break;
        case DELETE_PROJECT:
            stateReduced = {
                ...state,
                projectList: state.projectList.filter(
                    (project) => project._id !== action.payload
                ),
                activeProject: null,
            };
            break;
        case PROJECT_ERROR:
            stateReduced = {
                ...state,
                errorMessage: action.payload,
            };
            break;
        default:
            stateReduced = state;
            break;
    }

    return stateReduced;
};

export default projectReducer;
