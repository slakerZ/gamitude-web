import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const StatsBackend = ({ state, submit }: { state: any; submit: any }) => {
    const useStyles = makeStyles({
        center: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    });
    const classes = useStyles();

    return state.loading ? (
        <div className={classes.center}>
            <CircularProgress />
        </div>
    ) : !state.error ? (
        <div className={classes.center}>
            <Button variant="contained" onClick={submit}>
                Retry
            </Button>
        </div>
    ) : null;
};

export default StatsBackend;
