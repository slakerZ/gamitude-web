import React from "react";
import { connect } from "react-redux";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// UI icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//Components
import ProjectWork from "../project-work/project-work.component.jsx";
import ProjectEdit from "../project-edit/project-edit.component.jsx";

const Project = ({ projects, index, Icon }) => {
    const useStyles = makeStyles({
        icons: {
            height: "5vh",
            width: "5vh",
        },
        container: {
            backgroundColor: "transparent",
        },
        summary: {
            backgroundColor: "rgba(74, 2, 89, 0.4)",
        },
        details: {
            backgroundColor: "rgba(49, 0, 59, 0.4)",
            flexDirection: "column",
        },
    });
    const classes = useStyles();
    const project = projects[index];
    return (
        <ExpansionPanel square className={classes.container}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.summary}
            >
                <Icon className={classes.icons} />
                <Typography component="h3" variant="h3">
                    {project.name}
                </Typography>
            </ExpansionPanelSummary>

            {project.status === 0 ? (
                <ExpansionPanelDetails className={classes.details}>
                    <ProjectWork index={project.index} />
                    <ProjectEdit index={project.index} />
                </ExpansionPanelDetails>
            ) : project.status === 1 ? (
                <ExpansionPanelDetails className={classes.details}>
                    <div>Hold</div>
                </ExpansionPanelDetails>
            ) : (
                <ExpansionPanelDetails className={classes.details}>
                    <div>Done</div>
                </ExpansionPanelDetails>
            )}
        </ExpansionPanel>
    );
};

const mapStateToProps = state => ({
    projects: state.projects.projects,
});

export default connect(mapStateToProps)(Project);
