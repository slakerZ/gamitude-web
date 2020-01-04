import { ProjectsActionTypes } from "./projects.types";

export const setBoosted = (newStats, index) => ({
    type: ProjectsActionTypes.SET_BOOSTED,
    stats: newStats,
    index: index,
});

export const setDominant = value => ({
    type: ProjectsActionTypes.SET_DOMINANT,
    payload: value,
});
