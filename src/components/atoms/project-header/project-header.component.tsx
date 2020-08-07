import React from "react";
import { connect } from "react-redux";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// UI icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//Components
import CustomIcon from "../custom-icon/custom-icon.component";
// Selectors
import { selectProjects } from "../../../redux/projects/projects.selectors";

const ProjectHeader = ({
    index,
    projects,
}: {
    index: any;
    projects: any[];
}) => {
    const dominant = projects[index].dominant;
    const name = projects[index].name;

    const useStyles = makeStyles((theme) => ({
        summary: {
            backgroundColor: theme.palette.primary.light,
        },
    }));
    const classes = useStyles();

    return (
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.summary}
        >
            <CustomIcon variant={dominant} size="medium" />
            <Typography component="h3" variant="h3">
                {name}
            </Typography>
        </ExpansionPanelSummary>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
});

export default connect(mapStateToProps)(ProjectHeader);
