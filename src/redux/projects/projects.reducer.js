import PROJECTS_DATA from "./projects.data";
import { ProjectsActionTypes } from "./projects.types";

const INITIAL_STATE = {
    projects: PROJECTS_DATA,
    sessionInProgress: false,
};

const projectsReducer = (state = INITIAL_STATE, action) => {
    const tempProjects = [...state.projects];
    switch (action.type) {
        case ProjectsActionTypes.SET_BOOSTED:
            tempProjects[action.index].boosted = action.stats;
            return {
                projects: tempProjects,
                sessionInProgress: state.sessionInProgress,
            };
        case ProjectsActionTypes.SET_DOMINANT:
            tempProjects[action.index].dominant = action.dominant;
            return {
                projects: tempProjects,
                sessionInProgress: state.sessionInProgress,
            };
        case ProjectsActionTypes.SET_NAME:
            tempProjects[action.index].name = action.name;
            return {
                projects: tempProjects,
                sessionInProgress: state.sessionInProgress,
            };
        default:
            return state;
    }
};

export default projectsReducer;
