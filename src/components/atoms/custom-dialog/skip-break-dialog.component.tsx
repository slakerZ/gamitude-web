import React, { ReactElement } from "react";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";

import { setSessionInProgress } from "redux/session/session.actions";

import CustomDialog from "./custom-dialog.component";
import useCustomDialogStyles from "./styles";
import { ConfirmationDialogType } from "./types";

const SkipBreakDialog = ({
    open,
    setOpen,
    onSubmit,
}: ConfirmationDialogType): ReactElement => {
    const classes = useCustomDialogStyles();

    const handleCancel = () => {
        setSessionInProgress(true);
    };

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title={"Are you sure you want to skip this break?"}
            onSubmit={onSubmit}
            handleCancel={handleCancel}
        >
            <Typography
                variant="h4"
                component="h4"
                className={classes.textDanger}
            >
                {"This will negatively impact your further performance!"}
            </Typography>
        </CustomDialog>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    setSessionInProgress: (value: any) => dispatch(setSessionInProgress(value)),
});

export default connect(null, mapDispatchToProps)(SkipBreakDialog);
