import clsx from "clsx";

import React, { ReactElement } from "react";
import { useLocation } from "react-router";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import useLoadingScreenStyles from "./styles";

const LoadingScreen = (): ReactElement => {
    const classes = useLoadingScreenStyles();
    const location = useLocation();

    return (
        <div
            className={clsx(classes.container, {
                [classes.relative]: location.pathname !== "/",
                [classes.fixed]: location.pathname === "/",
            })}
        >
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
