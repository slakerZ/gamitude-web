import { ProjectsActionTypes } from "./projects.types";

export const setBoosted = ({ index, newBoosted }) => ({
    type: ProjectsActionTypes.SET_BOOSTED,
    index: index,
    boosted: newBoosted,
});

export const setDominant = ({ index, newDominant }) => ({
    type: ProjectsActionTypes.SET_DOMINANT,
    dominant: newDominant,
    index: index,
});

export const setName = ({ index, name }) => ({
    type: ProjectsActionTypes.SET_NAME,
    index: index,
    name: name,
});

export const setMethod = ({ index, method }) => ({
    type: ProjectsActionTypes.SET_METHOD,
    method: method,
    index: index,
});

export const setStatus = ({ index, status }) => ({
    type: ProjectsActionTypes.SET_STATUS,
    status: status,
    index: index,
});

export const addProject = () => ({
    type: ProjectsActionTypes.ADD_PROJECT,
});

export const deleteProject = index => ({
    type: ProjectsActionTypes.DELETE_PROJECT,
    index: index,
});
