import PROJECTS_DATA from "./projects.data";
import { ProjectsActionTypes } from "./projects.types";

const INITIAL_STATE = {
    projects: PROJECTS_DATA,
};

const projectsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProjectsActionTypes.SET_BOOSTED:
            console.log(action.payload);
            // projects: projects[0].boosted = action.payload
            return {
                ...state,
                ...state.projects.slice(0, action.index),
                ...action.stats,
                ...state.projects.slice(action.index + 1),
            };
        default:
            return state;
    }
};

export default projectsReducer;
