import { createSelector } from "reselect";

export const selectProjects = (state: any) => state.projects.projects;

export const selectProject = (state: any, ownProps: any) => {
    return state.projects.projects[ownProps.index];
};
// Won't re-render when should
export const selectDominant = createSelector(
    [selectProject],
    (project) => project.dominant,
);

export const selectMethod = createSelector(
    [selectProject],
    (project) => project.method,
);

export const selectSelectedProject = (state: any) =>
    state.projects.selectedProject;
