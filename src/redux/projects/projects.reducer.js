import { ProjectsActionTypes } from "./projects.types";

const INITIAL_STATE = {
    projects: [],
};

const projectsReducer = (state = INITIAL_STATE, action) => {
    const tempProjects = [...state.projects];
    switch (action.type) {
        case ProjectsActionTypes.SET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
            };
        case ProjectsActionTypes.SET_BOOSTED:
            tempProjects[action.index].boosted = action.boosted;
            return {
                ...state,
                projects: tempProjects,
            };
        case ProjectsActionTypes.SET_DOMINANT:
            tempProjects[action.index].dominant = action.dominant;
            return {
                ...state,
                projects: tempProjects,
            };
        case ProjectsActionTypes.SET_NAME:
            tempProjects[action.index].name = action.name;
            return {
                ...state,
                projects: tempProjects,
            };
        case ProjectsActionTypes.SET_METHOD:
            tempProjects[action.index].method = action.method;
            return {
                ...state,
                projects: tempProjects,
            };
        case ProjectsActionTypes.SET_STATUS:
            tempProjects[action.index].status = action.status;
            return {
                ...state,
                projects: tempProjects,
            };

        case ProjectsActionTypes.ADD_PROJECT:
            tempProjects.push({
                name: "New Project",
                method: 25,
                status: 0,
                boosted: ["intelligence"],
                dominant: "intelligence",
            });
            return {
                ...state,
                projects: tempProjects,
            };
        case ProjectsActionTypes.DELETE_PROJECT:
            tempProjects.splice(action.index, 1);
            return {
                ...state,
                projects: tempProjects,
            };

        default:
            return state;
    }
};

export default projectsReducer;
