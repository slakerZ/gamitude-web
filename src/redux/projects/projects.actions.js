import { ProjectsActionTypes } from "./projects.types";

export const setBoosted = ({ index, stats }) => ({
    type: ProjectsActionTypes.SET_BOOSTED,
    stats: stats,
    index: index,
});

export const setDominant = value => ({
    type: ProjectsActionTypes.SET_DOMINANT,
    payload: value,
});
