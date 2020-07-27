import React, { FC } from "react";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

// UI icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const ProjectEditHeader: FC = () => {
    const useStyles = makeStyles((theme) => ({
        expansionPanelSummary: {
            backgroundColor: theme.palette.secondary.main,
        },
    }));
    const classes = useStyles();

    return (
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.expansionPanelSummary}
        >
            <Typography component="h4" variant="h4">
                {"Edit Project"}
            </Typography>
        </ExpansionPanelSummary>
    );
};

export default ProjectEditHeader;
