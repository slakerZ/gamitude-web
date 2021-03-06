import React, { ReactElement } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import useCustomDialogStyles from "./styles";
import { CustomDialogPropType } from "./types";

const CustomDialog = ({
    open,
    setOpen,
    title,
    onSubmit,
    children,
    handleCancel,
}: CustomDialogPropType): ReactElement => {
    const classes = useCustomDialogStyles();

    const onCancel = () => {
        setOpen(false);
        if (handleCancel) {
            handleCancel();
        }
    };

    return (
        <Dialog
            className={classes.root}
            open={open}
            PaperProps={{ className: classes.rootPaper }}
            onClose={onCancel}
            TransitionComponent={Slide}
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
