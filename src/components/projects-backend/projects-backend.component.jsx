import React from "react";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProjectsBackend = ({ state, submit }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            padding: theme.spacing(7, 5),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {state.loading ? (
                <CircularProgress />
            ) : state.error ? (
                <Button variant="contained" onClick={submit}>
                    Retry
                </Button>
            ) : null}
        </div>
    );
};

export default ProjectsBackend;
