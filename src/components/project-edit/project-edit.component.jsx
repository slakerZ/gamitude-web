import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useAsyncFn } from "react-use";
// Api
import { url, headers, request_body } from "./project-edit.api";
// Actions
import { setName } from "../../redux/projects/projects.actions";
// Selectors
import { selectToken } from "../../redux/user/user.selectors";
import { selectSessionInProgress } from "../../redux/session/session.selectors";
import { selectProjects } from "../../redux/projects/projects.selectors";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

// Components
import ProjectStats from "../project-stats/project-stats.component.jsx";
import ProjectsStatsDominant from "../project-stats-dominant/project-stats-dominant.component.jsx";
import ProjectStatus from "../project-status/project-status.component.jsx";
import BackendFeedback from "../backend-feedback/backend-feedback.component.jsx";
import ProjectEditDelete from "../project-edit-delete/project-edit-delete.component.jsx";
import ProjectEditHeader from "../project-edit-header/project-edit-header.component.jsx";
import ProjectEditName from "../project-edit-name/project-edit-name.component.jsx";

const ProjectEdit = ({
    projects,
    index,
    sessionInProgress,
    setName,
    token,
}) => {
    const name = projects[index].name;

    const useStyles = makeStyles(theme => ({
        expansionPanel: {
            backgroundColor: "transparent",
        },
        expansionPanelSummary: {
            backgroundColor: theme.palette.secondary.main,
        },
        expansionPanelDetails: {
            backgroundColor: theme.palette.secondary.main,
            flexDirection: "column",
        },
    }));
    const classes = useStyles();

    const [isExpanded, setIsExpanded] = React.useState(false);

    useEffect(() => {
        setIsExpanded(false);
    }, [sessionInProgress]);

    // const handleChange = event => {
    //     setName({ index: index, name: event.target.value });
    // };

    const [state, submit] = useAsyncFn(async () => {
        // Async wasn't seeing updated versions
        const name = projects[index].name;
        const id = projects[index].id;
        const method = projects[index].method;
        const status = projects[index].status;
        const boosted = projects[index].boosted;
        const dominant = projects[index].dominant;

        const response = await axios.put(
            url(id),
            request_body(name, method, status, boosted, dominant),
            headers(token)
        );
        const data = await response.data;
        if (data) {
            setIsExpanded(false);
        }
        return data;
    }, [url]);

    return (
        <ExpansionPanel
            square
            className={classes.expansionPanel}
            disabled={sessionInProgress}
            expanded={isExpanded}
            onChange={(e, expanded) => setIsExpanded(expanded)}
        >
            <ProjectEditHeader />

            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                <ProjectEditName index={index} />

                <ProjectStats index={index} />
                <ProjectsStatsDominant index={index} />

                <ProjectStatus index={index} destination={1} />
                <ProjectStatus index={index} destination={2} />
                <ProjectEditDelete
                    index={index}
                    setIsExpanded={setIsExpanded}
                />

                <Button onClick={submit} variant="outlined">
                    <Typography component="h6" variant="h6">
                        Save
                    </Typography>
                </Button>

                <BackendFeedback
                    loading={state.loading}
                    error={state.error}
                    value={state.value}
                    errorMessage={"Couldn't save"}
                    successMessage={""}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const mapStateToProps = state => ({
    sessionInProgress: selectSessionInProgress(state),
    projects: selectProjects(state),
    token: selectToken(state),
});

const mapDispatchToProps = dispatch => ({
    setName: value => dispatch(setName(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);
