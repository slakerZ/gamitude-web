import React from "react";
import axios from "axios";
import { connect } from "react-redux";
// API
import { url, headers, request_body } from "../../../api/project-status.api";
// Actions
import { setStatus } from "../../../redux/projects/projects.actions";
// Selectors
import { selectToken } from "../../../redux/user/user.selectors";
import { selectProjects } from "../../../redux/projects/projects.selectors";
// UI core
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ProjectStatus = ({
    index,
    destination,
    setStatus,
    projects,
    token,
}: {
    index: any;
    destination: any;
    setStatus: any;
    projects: any;
    token: any;
}) => {
    const id = projects[index].id;

    const handleStatus = (status: any) => {
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
                    ? "Paused"
                    : "Done"}
            </Typography>
        </Button>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
    token: selectToken(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setStatus: (value: any) => dispatch(setStatus(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStatus);
