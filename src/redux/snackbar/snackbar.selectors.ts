import { ReduxStateType } from "redux/root.reducer";

export const selectMessage = (state: ReduxStateType) => state.snackbar.message;
export const selectSeverity = (state: ReduxStateType) =>
    state.snackbar.severity;
export const selectOpen = (state: ReduxStateType) => state.snackbar.open;
