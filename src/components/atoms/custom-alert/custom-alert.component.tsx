import React, { ReactElement } from "react";

import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const Alert = (props: AlertProps): ReactElement => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default Alert;
