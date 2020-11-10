import { AlertProps } from "@material-ui/lab/Alert";

export interface CustomSnackbarPropTypes {
    open: boolean;
    setOpen: any;
    severity: AlertProps["severity"];
    message: string;
}
