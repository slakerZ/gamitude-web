import React from "react";
// UI Core
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
import ProjectStatus from "../project-status/project-status.component.jsx";
import CustomIcon from "../custom-icon/custom-icon.component.jsx";

const Project = ({ index, name, status, method, dominant }) => {
    const useStyles = makeStyles(theme => ({
        container: {
            backgroundColor: "transparent",
        },
        summary: {
            backgroundColor: theme.palette.primary.light,
        },
        details: {
            backgroundColor: theme.palette.primary.main,
            flexDirection: "column",
        },
    }));
    const classes = useStyles();

    return (
        <ExpansionPanel square className={classes.container}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.summary}
            >
                <CustomIcon variant={dominant} size="medium" />
                <Typography component="h3" variant="h3">
                    {name}
                </Typography>
            </ExpansionPanelSummary>

            {status === 0 ? (
                <ExpansionPanelDetails className={classes.details}>
                    <ProjectWork index={index} method={method} />
                    <ProjectEdit index={index} name={name} />
                </ExpansionPanelDetails>
            ) : status === 1 ? (
                <ExpansionPanelDetails className={classes.details}>
                    <ProjectStatus index={index} destination={0} />
                    <ProjectStatus index={index} destination={2} />
                </ExpansionPanelDetails>
            ) : (
                <ExpansionPanelDetails className={classes.details}>
                    <ProjectStatus index={index} destination={0} />
                    <ProjectStatus index={index} destination={1} />
                </ExpansionPanelDetails>
            )}
        </ExpansionPanel>
    );
};

export default Project;
