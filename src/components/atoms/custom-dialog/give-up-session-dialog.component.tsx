import React, { ReactElement } from "react";

import Typography from "@material-ui/core/Typography";

import CustomDialog from "./custom-dialog.component";
import { ConfirmationDialogType } from "./types";

const GiveUpSessionDialog = ({
    open,
    setOpen,
    onSubmit,
}: ConfirmationDialogType): ReactElement => {
    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            onSubmit={onSubmit}
            title="WARNING"
        >
            <Typography variant="h6" component="h6">
                {"Current session progress will be lost."}
            </Typography>
            <Typography variant="body1" component="p">
                {"No stats will be added, no time will be logged."}
            </Typography>
        </CustomDialog>
    );
};

export default GiveUpSessionDialog;
