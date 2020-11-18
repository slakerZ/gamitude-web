import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { CustomDialogPropType } from "./types";

import useCustomDialogStyles from "./styles";

const CustomDialog = ({
    open,
    setOpen,
    title,
    onSubmit,
    children,
}: CustomDialogPropType) => {
    const classes = useCustomDialogStyles();

    const onCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog
            className={classes.root}
            open={open}
            PaperProps={{ className: classes.rootPaper }}
            onClose={onCancel}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button variant={"contained"} onClick={onSubmit}>
                    {"SUBMIT"}
                </Button>
                <Button variant={"contained"} onClick={onCancel}>
                    {"CANCEL"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialog;
