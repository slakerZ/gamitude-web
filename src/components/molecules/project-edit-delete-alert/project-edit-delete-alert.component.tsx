import React from "react";
import axios from "axios";
import { connect } from "react-redux";
// API
import { url, headers } from "../../../api/project-edit-delete.api";
// Actions
import { deleteProject } from "../../../redux/projects/projects.actions";
// Selectors
import { selectProjects } from "../../../redux/projects/projects.selectors";
import { selectToken } from "../../../redux/user/user.selectors";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ProjectEditDeleteAlert = ({
    open,
    setOpen,
    index,
    setIsExpanded,
    token,
    projects,
    deleteProject,
}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: theme.palette.primary.main,
        },
    }));
    const classes = useStyles();

    const handleDeletion = () => {
        const id = projects[index].id;
        axios.delete(url(id), headers(token));
        setIsExpanded(false);
        deleteProject(index);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.root}
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this project?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {" This action CANNOT be undone."}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    {"No"}
                </Button>
                <Button onClick={handleDeletion} color="primary">
                    {"Yes"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
const mapStateToProps = (state) => ({
    projects: selectProjects(state),
    token: selectToken(state),
});

const mapDispatchToProps = (dispatch) => ({
    deleteProject: (value) => dispatch(deleteProject(value)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectEditDeleteAlert);
