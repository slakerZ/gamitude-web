import React from "react";
import axios from "axios";
import { connect } from "react-redux";
// API
import { url, headers, request_body } from "./project-status.api";
// Actions
import { setStatus } from "../../redux/projects/projects.actions";
// Selectors
import { selectToken } from "../../redux/user/user.selectors";
import { selectProjects } from "../../redux/projects/projects.selectors";
// UI core
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ProjectStatus = ({ index, destination, setStatus, projects, token }) => {
    const id = projects[index].id;

    const handleStatus = status => {
        setStatus({ index: index, status: status });
        axios.put(url(id), request_body(status), headers(token));
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

const mapStateToProps = state => ({
    projects: selectProjects(state),
    token: selectToken(state),
});

const mapDispatchToProps = dispatch => ({
    setStatus: value => dispatch(setStatus(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStatus);
