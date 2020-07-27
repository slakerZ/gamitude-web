import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useAsyncFn } from "react-use";
// API
import {
    url,
    headers,
    request_body,
} from "../../../api/project-edit-submit.api";
// Selectors
import { selectToken } from "../../../redux/user/user.selectors";
import { selectProjects } from "../../../redux/projects/projects.selectors";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components
import BackendFeedback from "../backend-feedback/backend-feedback.component";

const ProjectEditSubmit = ({ index, setIsExpanded, projects, token }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: theme.spacing(1, 1),
        },
    }));
    const classes = useStyles();

    const [state, submit] = useAsyncFn(async () => {
        const name = projects[index].name;
        const id = projects[index].id;
        const method = projects[index].method;
        const boosted = projects[index].boosted;
        const dominant = projects[index].dominant;

        const response = await axios.put(
            url(id),
            request_body(name, method, boosted, dominant),
            headers(token),
        );
        const data = await response.data;
        if (data) {
            setIsExpanded(false);
        }
        return data;
    }, [url]);

    return (
        <div className={classes.root}>
            <Button onClick={submit} variant="outlined">
                <Typography component="h6" variant="h6">
                    {"Save"}
                </Typography>
            </Button>

            <BackendFeedback
                loading={state.loading}
                error={state.error}
                value={state.value}
                errorMessage={"Couldn't save"}
                successMessage={""}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    projects: selectProjects(state),
    token: selectToken(state),
});

export default connect(mapStateToProps)(ProjectEditSubmit);
