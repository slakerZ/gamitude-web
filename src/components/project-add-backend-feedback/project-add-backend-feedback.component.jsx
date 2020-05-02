import React from "react";
// UI icons
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProjectAddBackendFeedback = ({ loading, error, submit }) => {
    return loading ? (
        <CircularProgress />
    ) : error ? (
        <Button variant="contained" onClick={submit}>
            {process.env.NODE_ENV == "development"
                ? error.message
                : "Try Again"}
        </Button>
    ) : (
        <Button variant="contained" onClick={submit}>
            {"Confirm"}
        </Button>
    );
};
export default ProjectAddBackendFeedback;
