import React from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
//Components
import CustomTimer from "../custom-timer/custom-timer.component.jsx";
import ToggleButtons from "../projects-toggle/projects-toggle.component.jsx";
import ProjectEdit from "../project-edit/project-edit.component.jsx";

const Project = ({ title, Icon }) => {
    const useStyles = makeStyles({
        icons: {
            height: "5vh",
            width: "5vh",
        },
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

    return (
        <ExpansionPanel square className={classes.expansionPanel}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.expansionPanelSummary}
            >
                <Icon className={classes.icons} />
                <Typography component="h3" variant="h3">
                    {title}
                </Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                <CustomTimer time={25} />
                <ToggleButtons />
                <ProjectEdit title={title} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default Project;
