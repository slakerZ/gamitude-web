import React from "react";
import { connect } from "react-redux";
// Actions
import { setStatus } from "../../redux/projects/projects.actions";
// UI core
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ProjectStatus = ({ index, destination, setStatus }) => {
    const handleStatus = status => {
        setStatus({ index: index, status: status });
    };

    return (
        <Button onClick={() => handleStatus(destination)} variant="outlined">
            <Typography component="h6" variant="h6">
                Move to{" "}
                {destination === 0
                    ? "Active"
                    : destination === 1
                    ? "On Hold"
                    : "Complete"}
            </Typography>
        </Button>
    );
};

const mapDispatchToProps = dispatch => ({
    setStatus: value => dispatch(setStatus(value)),
});

export default connect(null, mapDispatchToProps)(ProjectStatus);
