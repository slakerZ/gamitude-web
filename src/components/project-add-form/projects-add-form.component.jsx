import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useAsyncFn } from "react-use";
// Context
import {
    AddProjectProvider,
    AddProjectContext,
} from "../../context/add-projects.context";
// Actions
import { addProject } from "../../redux/projects/projects.actions";
// Selectors
import { selectToken } from "../../redux/user/user.selectors";
// API
import {
    url,
    headers,
    requestData,
    convertForFront,
} from "../../api/project-add.api";
// UI Core
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Components
import ProjectAddBackendFeedback from "../project-add-backend-feedback/project-add-backend-feedback.component.jsx";
import CustomProjectStats from "../custom-project-stats/custom-project-stats.component.jsx";
import CustomProjectsStatsDominant from "../custom-project-stats-dominant/custom-project-stats-dominant.component.jsx";
import CustomProjectName from "../custom-project-name/custom-project-name.component.jsx";

const ProjectsAddForm = ({ open, setOpen, addProject, token }) => {
    const useStyles = makeStyles({
        root: {
            background: "transparent",
        },
    });
    const classes = useStyles();

    const [state, submit] = useAsyncFn(
        async context => {
            const response = await axios.post(
                url,
                requestData(context),
                headers(token)
            );
            const data = await response.data;
            const convertedData = convertForFront(data);
            addProject(convertedData);
            setOpen(false);
            resetContext(context);
            return data;
        },
        [url]
    );

    const handleClose = () => {
        setOpen(false);
    };

    const resetContext = context => {
        context.setName("");
        context.setBoosted([]);
        context.setDominant("");
    };

    return (
        <AddProjectProvider>
            <AddProjectContext.Consumer>
                {context => (
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                        className={classes.root}
                    >
                        <DialogTitle id="form-dialog-title">
                            {"Create New Project"}
                        </DialogTitle>
                        <DialogContent>
                            <CustomProjectName
                                onValueChange={context.setName}
                            />
                            <CustomProjectStats
                                groupValue={context.boosted}
                                groupOnChange={context.setBoosted}
                                dominant={context.dominant}
                            />
                            <CustomProjectsStatsDominant
                                groupValue={context.dominant}
                                groupOnChange={context.setDominant}
                                boosted={context.boosted}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <ProjectAddBackendFeedback
                                loading={state.loading}
                                error={state.error}
                                submit={() => submit(context)}
                            />
                        </DialogActions>
                    </Dialog>
                )}
            </AddProjectContext.Consumer>
        </AddProjectProvider>
    );
};

const mapStateToProps = state => ({
    token: selectToken(state),
});

const mapDispatchToProps = dispatch => ({
    addProject: value => dispatch(addProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsAddForm);
