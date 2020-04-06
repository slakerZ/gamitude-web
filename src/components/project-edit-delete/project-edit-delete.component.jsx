import React from "react";
import { connect } from "react-redux";
import axios from "axios";
// API
import { url, headers } from "../project-edit/project-edit.api";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Actions
import { deleteProject } from "../../redux/projects/projects.actions";
// Selectors
import { selectProjects } from "../../redux/projects/projects.selectors";
import { selectToken } from "../../redux/user/user.selectors";

const ProjectEditDelete = ({
    index,
    setIsExpanded,
    projects,
    deleteProject,
    token,
}) => {
    const useStyles = makeStyles(theme => ({
        expansionPanel: {
            backgroundColor: "transparent",
        },
        expansionPanelSummary: {
            backgroundColor: theme.palette.secondary.main,
        },
        expansionPanelDetails: {
            backgroundColor: theme.palette.secondary.main,
            flexDirection: "column",
        },
    }));
    const classes = useStyles();

    const handleDeletion = () => {
        const id = projects[index].id;
        axios.delete(url(id), headers(token));
        setIsExpanded(false);
        deleteProject(index);
    };

    return (
        <Button onClick={handleDeletion} variant="contained">
            <Typography component="h6" variant="h6" className={classes.text}>
                {"Delete Project"}
            </Typography>
        </Button>
    );
};

const mapStateToProps = state => ({
    projects: selectProjects(state),
    token: selectToken(state),
});

const mapDispatchToProps = dispatch => ({
    deleteProject: value => dispatch(deleteProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditDelete);
