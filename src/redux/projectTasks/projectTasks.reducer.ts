import { ProjectTasksActionTypes } from "./projectTasks.types";

const INITIAL_STATE = {
    projectTasks: [],
};

const projectTasksReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ProjectTasksActionTypes.SET_PROJECT_TASKS:
            return {
                ...state,
                projectTasks: action.payload,
            };
        case ProjectTasksActionTypes.ADD_PROJECT_TASK:
            return {
                ...state,
                projectTasks: [...state.projectTasks, action.payload],
            };
        default:
            return state;
    }
};

export default projectTasksReducer;
