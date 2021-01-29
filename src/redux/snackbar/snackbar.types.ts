import { SnackbarProps } from "@material-ui/core/Snackbar";
import { AlertProps } from "@material-ui/lab/Alert";

export const SnackbarActionTypes = {
    EDIT_MESSAGE: "EDIT_MESSAGE",
    SET_OPEN: "SET_OPEN",
    EDIT_SEVERITY: "EDIT_SEVERITY",
    SET_SNACKBAR_STATE: "SET_SNACKBAR_STATE",
};

export interface SnackbarStateType {
    severity: AlertProps["severity"];
    message: SnackbarProps["message"];
    autoHideDuration: SnackbarProps["autoHideDuration"];
    open: SnackbarProps["open"];
}
