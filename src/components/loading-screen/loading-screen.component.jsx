import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const LoadingScreen = () => {
    const useStyles = makeStyles({
        container: {
            width: "100vw",
            height: "100vh",
            backgroundColor: "transparent",
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
        },
    });
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography variant="h1" component="h1">
                Gamitude
            </Typography>
            <Typography variant="h5" component="h5">
                Manage your <strong>Energy</strong> not your <em>Time</em>{" "}
            </Typography>
        </div>
    );
};

export default LoadingScreen;
