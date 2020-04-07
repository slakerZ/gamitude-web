import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useAsyncFn } from "react-use";
// API
import { url, headers, request_data } from "./project-add.api";
// Actions
import { addProject } from "../../redux/projects/projects.actions";
// Selectors
import { selectToken } from "../../redux/user/user.selectors";
// UI core
import { makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
// Components
import ProjectAddBackendFeedback from "../project-add-backend-feedback/project-add-backend-feedback.component.jsx";

const ProjectAdd = ({ addProject, token }) => {
    const useStyles = makeStyles(theme => ({
        add: {
            position: "sticky",
            margin: "0 20px 40px 0",
            float: "right",
            top: "calc(100vh - 50px)",
            boxShadow: "5px 5px 10px #000000",
            backgroundColor: theme.palette.complement.dark,
        },
    }));
    const classes = useStyles();

    const [state, submit] = useAsyncFn(async () => {
        const response = await axios.post(url, request_data, headers(token));
        const data = await response.data;
        addProject(response.data.id);
        return data;
    }, [url]);

    return (
        <Fab
            color="secondary"
            aria-label="add"
            className={classes.add}
            onClick={submit}
            disabled={state.loading}
        >
            <ProjectAddBackendFeedback
                loading={state.loading}
                error={state.error}
            />
        </Fab>
    );
};

const mapStateToProps = state => ({
    token: selectToken(state),
});

const mapDispatchToProps = dispatch => ({
    addProject: value => dispatch(addProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);
