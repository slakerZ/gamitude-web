import React from "react";
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

const Project = ({ title, Icon }) => {
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

    return (
        <ExpansionPanel square className={classes.container}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.summary}
            >
                <Icon className={classes.icons} />
                <Typography component="h3" variant="h3">
                    {title}
                </Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className={classes.details}>
                <ProjectWork />
                <ProjectEdit title={title} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default Project;
