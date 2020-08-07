import React from "react";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// Components
import ProjectStats from "../project-stats/project-stats.component";
import ProjectsStatsDominant from "../project-stats-dominant/project-stats-dominant.component";
import ProjectStatus from "../../atoms/project-status/project-status.component";
import ProjectEditDelete from "../project-edit-delete/project-edit-delete.component";
import ProjectEditName from "../../atoms/project-edit-name/project-edit-name.component";
import ProjectEditSubmit from "../../atoms/project-edit-submit/project-edit-submit.component";

const ProjectEditBody = ({
    index,
    setIsExpanded,
}: {
    index: number;
    setIsExpanded: any;
}) => {
    const useStyles = makeStyles((theme) => ({
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
