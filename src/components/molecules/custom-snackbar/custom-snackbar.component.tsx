import React from "react";
import { connect } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";

import { setOpen } from "redux/snackbar/snackbar.actions";
import {
    selectMessage,
    selectSeverity,
    selectOpen,
} from "redux/snackbar/snackbar.selectors";

import CustomAlert from "components/atoms/custom-alert/custom-alert.component";

import { CustomSnackbarPropTypes } from "./types";

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

const mapStateToProps = (state: any) => ({
    message: selectMessage(state),
    severity: selectSeverity(state),
    open: selectOpen(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setOpen: (value: any) => dispatch(setOpen(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomSnackbar);
