import { ReduxStateType } from "redux/root.reducer";

export const selectProjects = (state: ReduxStateType) =>
    state.projects.projects;

export const selectProject = (state: ReduxStateType, ownProps: any) => {
    return state.projects.projects[ownProps.index];
};

export const selectSelectedProject = (state: ReduxStateType) =>
    state.projects.selectedProject;
