import { ReduxStateType } from "redux/root.reducer";

export const selectProjectTasks = (state: ReduxStateType) =>
    state.projectTasks.projectTasks;
