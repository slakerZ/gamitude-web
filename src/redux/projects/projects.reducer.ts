import { ProjectsActionTypes } from "./projects.types";

const INITIAL_STATE = {
    projects: [{ id: "" }],
    selectedProject: {
        id: "",
    },
};

const projectsReducer = (state = INITIAL_STATE, action: any) => {
    const tempProjects: (any | never)[] = [...state.projects];
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
                id: action.payload.id,
                name: action.payload.name,
                method: 25,
                status: 0,
                boosted: action.payload.boosted,
                dominant: action.payload.dominant,
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
        case ProjectsActionTypes.SET_SELECTED_PROJECT:
            return {
                ...state,
                selectedProject: action.payload,
            };
        case ProjectsActionTypes.SET_SELECTED_PROJECT_BY_ID:
            return {
                ...state,
                selectedProject:
                    state.projects.find(
                        (project) => project.id === action.payload,
                    ) || state.selectedProject,
            };
        default:
            return state;
    }
};

export default projectsReducer;
