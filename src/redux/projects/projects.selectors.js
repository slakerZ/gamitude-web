export const selectProjects = state => state.projects.projects;
export const selectProjectsObject = state => state.projects;
export const selectSessionInProgress = state =>
    state.projects.sessionInProgress;
export const selectBreakInProgress = state => state.projects.breakInProgress;
export const selectSessionsComplete = state => state.projects.sessionsComplete;
