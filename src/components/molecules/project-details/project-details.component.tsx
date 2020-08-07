import React from "react";
import { connect } from "react-redux";
// Selectors
import { selectProjects } from "../../../redux/projects/projects.selectors";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// Components
import ProjectWork from "../../organisms/project-work/project-work.component";
import ProjectEdit from "../project-edit/project-edit.component";
import ProjectStatus from "../../atoms/project-status/project-status.component";

const ProjectDetails = ({ index, projects }: { index: any; projects: any }) => {
    const status = projects[index].status;

    const useStyles = makeStyles((theme) => ({
        details: {
            backgroundColor: theme.palette.primary.main,
            flexDirection: "column",
        },
    }));
    const classes = useStyles();

    return status === 0 ? (
        <ExpansionPanelDetails className={classes.details}>
            <ProjectWork index={index} />
            <ProjectEdit index={index} />
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
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
});

export default connect(mapStateToProps)(ProjectDetails);
