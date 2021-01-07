import React, { useState, Fragment, useEffect, ReactElement } from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import { selectProjects } from "redux/projects/projects.selectors";
import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import { postProjectTask } from "api/projectTasks/projectTasks.api";

import { ProjectType } from "pages/projects-desktop/types";

import CustomDialog from "./custom-dialog.component";
import useCustomDialogStyles from "./styles";
import { NewProjectTaskDialogPropTypes } from "./types";

const NewProjectTaskDialog = ({
    open,
    setOpen,
    token,
    getProjectTasksList,
    setSnackbarState,
    journalId,
    pageId,
    projects,
}: NewProjectTaskDialogPropTypes): ReactElement => {
    const classes = useCustomDialogStyles();

    const [projectTaskName, setprojectTaskName] = useState("");
    const [note, setNote] = useState("");
    const [tags, setTags] = useState("");
    const [deadline, setDeadline] = useState("");
    const [taskAssociatedProject, setTaskAssociatedProject] = useState("");

    const [
        createNewProjectTaskState,
        createNewProjectTask,
    ] = useAsyncFn(async () => {
        const requestBody = {
            journalId: journalId,

            projectId:
                taskAssociatedProject === "" ? null : taskAssociatedProject,

            name: projectTaskName,

            description: "",

            note: note,

            tags: tags.split(", "),

            deadline: deadline === "" ? null : deadline,
        };
        const result = await postProjectTask(token, requestBody);
        setOpen(false);
        getProjectTasksList(journalId, pageId);
        // Reset
        setprojectTaskName("");
        setNote("");
        setTaskAssociatedProject("");
        setTags("");
        setDeadline("");

        return result;
    }, [projectTaskName, taskAssociatedProject, note, tags, deadline]);

    const handleProjectTaskNameChange = (e: any) => {
        setprojectTaskName(e.target.value);
    };

    const handleChangeNote = (e: any) => {
        setNote(e.target.value);
    };

    const handleChangeTags = (e: any) => {
        setTags(e.target.value);
    };
    const handleChangeDeadline = (e: any) => {
        setDeadline(e.target.value);
    };

    const handleTaskAssociatedProjectChange = (e: any) => {
        setTaskAssociatedProject(e.target.value);
    };

    useEffect(() => {
        if (createNewProjectTaskState.error) {
            setSnackbarState({
                message: "Failed to create new task",
                severity: "error",
                open: true,
            });
        }
    }, [createNewProjectTaskState, setSnackbarState]);

    return (
        <Fragment>
            <CustomDialog
                aria-label="Create New Project Task Dialog"
                open={open}
                setOpen={setOpen}
                title={"Create New Task"}
                onSubmit={createNewProjectTask}
            >
                <div
                    aria-label="Create New Project Task Dialog's Body"
                    className={classes.newFolderDialogBody}
                >
                    <TextField
                        label={"Name"}
                        variant={"outlined"}
                        fullWidth
                        value={projectTaskName}
                        onChange={handleProjectTaskNameChange}
                    />

                    <TextField
                        label={"Note"}
                        variant={"outlined"}
                        fullWidth
                        value={note}
                        onChange={handleChangeNote}
                    />
                    <TextField
                        aria-label="Select Associated Project"
                        label="ASSOCIATED PROJECT"
                        select
                        variant="outlined"
                        value={taskAssociatedProject}
                        onChange={handleTaskAssociatedProjectChange}
                        fullWidth
                    >
                        {projects.map((project, index) => {
                            return (
                                <MenuItem key={index} value={project.id}>
                                    {project.name}
                                </MenuItem>
                            );
                        })}
                    </TextField>
                    <TextField
                        label={"Tags"}
                        variant={"outlined"}
                        fullWidth
                        value={tags}
                        onChange={handleChangeTags}
                    />
                    <TextField
                        type="date"
                        label={"Deadline"}
                        variant={"outlined"}
                        fullWidth
                        value={deadline}
                        onChange={handleChangeDeadline}
                    />
                </div>
            </CustomDialog>
        </Fragment>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
    projects: selectProjects(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewProjectTaskDialog);
