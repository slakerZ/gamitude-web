import { ProjectsActionTypes } from "./projects.types";

export const setBoosted = ({ index, stats }) => ({
    type: ProjectsActionTypes.SET_BOOSTED,
    stats: stats,
    index: index,
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

export const setBreakInProgress = value => ({
    type: ProjectsActionTypes.SET_BREAK_IN_PROGRESS,
    payload: value,
});

export const setSessionInProgress = value => ({
    type: ProjectsActionTypes.SET_SESSION_IN_PROGRESS,
    payload: value,
});

export const setSessionsComplete = value => ({
    type: ProjectsActionTypes.SET_SESSIONS_COMPLETE,
    payload: value,
});
