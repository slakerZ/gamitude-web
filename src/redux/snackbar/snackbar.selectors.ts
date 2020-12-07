import { SnackbarProps } from "@material-ui/core/Snackbar";
import { AlertProps } from "@material-ui/lab/Alert";

import { ReduxStateType } from "redux/root.reducer";

export const selectMessage = (
    state: ReduxStateType,
): SnackbarProps["message"] => state.snackbar.message;
export const selectSeverity = (state: ReduxStateType): AlertProps["severity"] =>
    state.snackbar.severity;
export const selectOpen = (state: ReduxStateType): SnackbarProps["open"] =>
    state.snackbar.open;
export const selectAutoHideDuration = (
    state: ReduxStateType,
): SnackbarProps["autoHideDuration"] => state.snackbar.autoHideDuration;
