import PROJECTS_DATA from "./projects.data";
import { ProjectsActionTypes } from "./projects.types";

const INITIAL_STATE = {
    projects: PROJECTS_DATA,
};

const projectsReducer = (state = INITIAL_STATE, action) => {
    const tempProjects = [...state.projects];
    switch (action.type) {
        case ProjectsActionTypes.SET_BOOSTED:
            tempProjects[action.index].boosted = action.stats;
            return {
                projects: tempProjects,
            };
        default:
            return state;
    }
};

export default projectsReducer;
