import {
    ADD_TASK,
    GET_TASK_LIST,
    SHOW_TASK_FORM_ERROR,
    DELETE_TASK,
    SET_ACTIVE_TASK,
    EDIT_TASK,
} from "../../types";

const taskReducer = (state, action) => {
    let stateReduced = {};

    switch (action.type) {
        case GET_TASK_LIST:
            stateReduced = {
                ...state,
                projectTaskList: action.payload,
            };
            break;
        case ADD_TASK:
            stateReduced = {
                ...state,
                projectTaskList: [...state.projectTaskList, action.payload],
            };
            break;
        case SHOW_TASK_FORM_ERROR:
            stateReduced = {
                ...state,
                showTaskFormError: action.payload,
            };
            break;
        case DELETE_TASK:
            stateReduced = {
                ...state,
                projectTaskList: state.projectTaskList.filter(
                    (task) => task._id !== action.payload
                ),
            };
            break;
        case SET_ACTIVE_TASK:
            stateReduced = {
                ...state,
                activeTask: action.payload,
            };
            break;
        case EDIT_TASK:
            stateReduced = {
                ...state,
                projectTaskList: state.projectTaskList.map((task) =>
                    task._id === action.payload._id
                        ? {
                            ...task,
                            name: action.payload.name,
                            done: action.payload.done,
                        }
                        : task
                ),
                activeTask: null,
            };
            break;
        default:
            stateReduced = state;
            break;
    }

    return stateReduced;
};

export default taskReducer;
