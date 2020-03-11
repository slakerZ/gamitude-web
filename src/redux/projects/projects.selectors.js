import { createSelector } from "reselect";

export const selectProjects = state => state.projects.projects;

export const selectProject = (state, ownProps) => {
    return state.projects.projects[ownProps.index];
};
// Won't re-render when should
export const selectDominant = createSelector(
    [selectProject],
    project => project.dominant
);

export const selectMethod = createSelector(
    [selectProject],
    project => project.method
);
