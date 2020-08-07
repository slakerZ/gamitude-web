import React, { FC } from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const BackendFeedback = ({
    loading,
    error,
    value,
    errorMessage,
    successMessage,
}: {
    loading: boolean;
    error: any;
    value: any;
    errorMessage: string;
    successMessage: string;
}) => {
    const useStyles = makeStyles((theme) => ({
        progress: {
            alignSelf: "center",
        },
        error: {
            color: theme.palette.primary.main,
            textAlign: "center",
        },
        success: {
            color: theme.palette.primary.main,
            textAlign: "center",
        },
    }));
    const classes = useStyles();

    return loading ? (
        <CircularProgress className={classes.progress} />
    ) : error ? (
        <Typography variant="h3" component="h3" className={classes.error}>
            {errorMessage}
        </Typography>
    ) : value && !error && !loading ? (
        <Typography variant="h3" className={classes.success} component="h3">
            {successMessage}
        </Typography>
    ) : null;
};

export default BackendFeedback;
