import React from "react";
import { connect } from "react-redux";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// UI icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// Components
import ProjectStats from "../project-stats/project-stats.component.jsx";
import ProjectsStatsDominant from "../project-stats-dominant/project-stats-dominant.component.jsx";

const ProjectEdit = ({ projects, index }) => {
    const useStyles = makeStyles({
        expansionPanel: {
            backgroundColor: "transparent",
        },
        expansionPanelSummary: {
            backgroundColor: "rgba(74, 2, 89, 0.4)",
        },
        expansionPanelDetails: {
            backgroundColor: "rgba(49, 0, 59, 0.4)",
            flexDirection: "column",
        },
    });
    const classes = useStyles();
    // mocked
    const sessionInProgress = false;
    const project = projects[index];
    return (
        <ExpansionPanel square className={classes.expansionPanel}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.expansionPanelSummary}
                disabled={sessionInProgress}
            >
                <Typography component="h4" variant="h4">
                    Edit Project
                </Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                <TextField
                    id={`${project.name}-name`}
                    label="PROJECT NAME"
                    variant="outlined"
                    defaultValue={project.name}
                />

                <ProjectStats index={index} />
                <ProjectsStatsDominant index={index} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const mapStateToProps = state => ({
    projects: state.projects.projects,
});

export default connect(mapStateToProps)(ProjectEdit);
