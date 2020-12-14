import React, { ReactElement } from "react";

import Typography from "@material-ui/core/Typography";

import CustomDialog from "./custom-dialog.component";
import useCustomDialogStyles from "./styles";
import { ConfirmationDialogType } from "./types";

const DeleteAccountDialog = ({
    open,
    setOpen,
    onSubmit,
}: ConfirmationDialogType): ReactElement => {
    const classes = useCustomDialogStyles();

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title={"Delete Account"}
            onSubmit={onSubmit}
        >
            <Typography
                variant="h4"
                component="h4"
                className={classes.textDanger}
            >
                {"Are you sure you want to delete your account?"}
            </Typography>
            <Typography
                variant="h4"
                component="h4"
                className={classes.textDanger}
            >
                {" This action CANNOT be undone."}
            </Typography>
        </CustomDialog>
    );
};

export default DeleteAccountDialog;
