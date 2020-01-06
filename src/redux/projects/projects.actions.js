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
