import { SnackbarProps } from "@material-ui/core/Snackbar";
import { AlertProps } from "@material-ui/lab/Alert";

export interface CustomSnackbarPropTypes {
    open: SnackbarProps["open"];
    setOpen: any;
    severity: AlertProps["severity"];
    message: SnackbarProps["message"];
    autoHideDuration: SnackbarProps["autoHideDuration"];
}
