import React, { ReactElement } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import useLoadingScreenStyles from "./styles";

const LoadingScreen = (): ReactElement => {
    const classes = useLoadingScreenStyles();

    return (
        <div className={classes.container}>
            <Typography variant="h1" component="h1">
                Gamitude
            </Typography>
            <Typography variant="h5" component="h5">
                Manage your <strong>Energy</strong> not your <em>Time</em>{" "}
            </Typography>
            <CircularProgress className={classes.progress} />
        </div>
    );
};

export default LoadingScreen;
