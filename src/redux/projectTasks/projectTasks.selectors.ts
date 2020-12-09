import { ReduxStateType } from "redux/root.reducer";

export const selectPages = (state: ReduxStateType) => state.projectTasks;
