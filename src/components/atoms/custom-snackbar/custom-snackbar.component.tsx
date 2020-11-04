import React from "react";
import CustomAlert from "components/atoms/custom-alert/custom-alert.component";
import { CustomSnackbarPropTypes } from "./types";
import Snackbar from "@material-ui/core/Snackbar";

const CustomSnackbar = ({
    open,
    setOpen,
    severity,
    message,
}: CustomSnackbarPropTypes) => {
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <CustomAlert onClose={handleClose} severity={severity}>
                {message}
            </CustomAlert>
        </Snackbar>
    );
};

export default CustomSnackbar;
