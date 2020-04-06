import React from "react";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// Components
import ProjectStats from "../project-stats/project-stats.component.jsx";
import ProjectsStatsDominant from "../project-stats-dominant/project-stats-dominant.component.jsx";
import ProjectStatus from "../project-status/project-status.component.jsx";
import ProjectEditDelete from "../project-edit-delete/project-edit-delete.component.jsx";
import ProjectEditName from "../project-edit-name/project-edit-name.component.jsx";
import ProjectEditSubmit from "../project-edit-submit/project-edit-submit.component.jsx";

const ProjectEditBody = ({ index, setIsExpanded }) => {
    const useStyles = makeStyles(theme => ({
        expansionPanelDetails: {
            backgroundColor: theme.palette.secondary.main,
            flexDirection: "column",
        },
    }));
    const classes = useStyles();

    return (
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            <ProjectEditName index={index} />

            <ProjectStats index={index} />
            <ProjectsStatsDominant index={index} />

            <ProjectStatus index={index} destination={1} />
            <ProjectStatus index={index} destination={2} />

            <ProjectEditDelete index={index} setIsExpanded={setIsExpanded} />

            <ProjectEditSubmit index={index} setIsExpanded={setIsExpanded} />
        </ExpansionPanelDetails>
    );
};

export default ProjectEditBody;
