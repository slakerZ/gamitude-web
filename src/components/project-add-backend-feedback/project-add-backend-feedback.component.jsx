import React from "react";
// UI icons
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import CachedIcon from "@material-ui/icons/Cached";

const ProjectAddBackendFeedback = ({ loading, error }) => {
    return loading ? (
        <CircularProgress />
    ) : error ? (
        <CachedIcon />
    ) : (
        <AddIcon />
    );
};
export default ProjectAddBackendFeedback;
