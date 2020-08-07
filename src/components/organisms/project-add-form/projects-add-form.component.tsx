import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useAsyncFn } from "react-use";
// Context
import {
    AddProjectProvider,
    AddProjectContext,
} from "../../../context/add-projects.context";
// Actions
import { addProject } from "../../../redux/projects/projects.actions";
// Selectors
import { selectToken } from "../../../redux/user/user.selectors";
// API
import {
    url,
    headers,
    requestData,
    convertForFront,
} from "../../../api/project-add.api";
// UI Core
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Components
import ProjectAddBackendFeedback from "../../atoms/project-add-backend-feedback/project-add-backend-feedback.component";
import CustomProjectStats from "../../atoms/custom-project-stats/custom-project-stats.component";
import CustomProjectsStatsDominant from "../../atoms/custom-project-stats-dominant/custom-project-stats-dominant.component";
import CustomProjectName from "../../atoms/custom-project-name/custom-project-name.component";

const ProjectsAddForm = ({
    open,
    setOpen,
    addProject,
    token,
}: {
    open: any;
    setOpen: any;
    addProject: any;
    token: any;
}) => {
    const useStyles = makeStyles({
        root: {
            background: "transparent",
        },
    });
    const classes = useStyles();

    const [state, submit] = useAsyncFn(
        async (context: any) => {
            const response = await axios.post(
                url,
                requestData(context),
                headers(token),
            );
            const data = await response.data;
            const convertedData = convertForFront(data);
            addProject(convertedData);
            setOpen(false);
            resetContext(context);
            return data;
        },
        [url],
    );

    const handleClose = () => {
        setOpen(false);
    };

    const resetContext = (context: any) => {
        context.setName("");
        context.setBoosted([]);
        context.setDominant("");
    };

    return (
        <AddProjectProvider>
            <AddProjectContext.Consumer>
                {(context: any) => (
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

const mapStateToProps = (state: any) => ({
    token: selectToken(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    addProject: (value: any) => dispatch(addProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsAddForm);
