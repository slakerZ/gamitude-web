import { createSelector } from "reselect";

export const selectProjects = state => state.projects.projects;
// Only for the following selectors
export const selectProjectsObject = state => state.projects;

export const selectSessionInProgress = createSelector(
    [selectProjectsObject],
    projects => projects.sessionInProgress
);

export const selectBreakInProgress = createSelector(
    [selectProjectsObject],
    projects => projects.breakInProgress
);

export const selectSessionsComplete = createSelector(
    [selectProjectsObject],
    projects => projects.sessionsComplete
);
