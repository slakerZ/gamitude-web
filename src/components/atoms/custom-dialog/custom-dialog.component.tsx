import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { CustomDialogPropType } from "./types";
import Button from "@material-ui/core/Button";

const CustomDialog = ({
    open,
    setOpen,
    title,
    onSubmit,
}: CustomDialogPropType) => {
    const onCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button onClick={onSubmit}>{"SUBMIT"}</Button>
                <Button onClick={onCancel}>{"CANCEL"}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialog;
