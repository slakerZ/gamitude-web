import { ReduxStateType } from "redux/root.reducer";

export const selectProjectTasks = (state: ReduxStateType) =>
    state.projectTasks.projectTasks;

export const selectSelectedTask = (state: ReduxStateType) =>
    state.projectTasks.selectedProjectTask;
