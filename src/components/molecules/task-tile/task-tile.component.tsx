import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useAsyncFn, useEffectOnce } from "react-use";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { setSelectedTask } from "redux/projectTasks/projectTasks.actions";
import { setSelectedProject } from "redux/projects/projects.actions";
import { selectProjects } from "redux/projects/projects.selectors";
import {
    selectIsBreak,
    selectSessionInProgress,
} from "redux/session/session.selectors";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import {
    deleteProjectTaskById,
    putProjectTaskById,
} from "api/projectTasks/projectTasks.api";
import { ProjectType } from "api/projects/types";

import useProjectTaskStyles from "./styles";
import { ProjectTaskTilePropTypes } from "./types";

const TaskTile = ({
    projects,
    token,
    getProjectTasksList,
    currJournalId,
    currPageId,
    projectTask,
    getProjectsList,
    setSelectedTask,
    setSelectedProject,
    sessionInProgress,
    isBreak,
    setSnackbarState,
    getProjectsListState,
}: ProjectTaskTilePropTypes) => {
    const classes = useProjectTaskStyles();

    //useState
    const [taskName, setTaskName] = useState("");
    const [taskNote, setTaskNote] = useState("");
    const [taskTags, setTaskTags] = useState("");
    const [taskDue, setTaskDue] = useState("");
    const [taskAssociatedProject, setTaskAssociatedProject] = useState("");

    //useAsync
    const [editProjectTaskState, editProjectTask] = useAsyncFn(
        async (id) => {
            const requestBody = {
                journalId: currJournalId,
                description: "",
                name: taskName === "" ? projectTask.name : taskName,
                projectId:
                    taskAssociatedProject === ""
                        ? projectTask.projectId
                        : taskAssociatedProject,
                note: taskNote === "" ? projectTask.note : taskNote,
                tags: taskTags === "" ? projectTask.tags : taskTags.split(", "),
                deadline:
                    taskDue === ""
                        ? projectTask.deadline
                        : new Date(taskDue).toISOString(),
            };
            const response = await putProjectTaskById(token, requestBody, id);
            getProjectTasksList(currJournalId, currPageId);
            setTaskName("");
            setTaskNote("");
            setTaskTags("");
            setTaskTags("");
            setTaskDue("");
            setTaskAssociatedProject("");
            return response.data;
        },
        [taskName, taskAssociatedProject, taskNote, taskTags, taskDue],
    );

    const [deleteProjectTaskState, deleteProjectTask] = useAsyncFn(
        async (id) => {
            const response = await deleteProjectTaskById(token, id);
            getProjectTasksList(currJournalId, currPageId);
            return response;
        },
    );

    //handlers
    const handleTaskNameChange = (event: any) => {
        setTaskName(event.target.value);
    };

    const handleTaskNoteChange = (event: any) => {
        setTaskNote(event.target.value);
    };

    const handleTaskTagsChange = (event: any) => {
        setTaskTags(event.target.value);
    };

    const handleTaskAssociatedProjectChange = (event: any) => {
        setTaskAssociatedProject(event.target.value);
    };

    const handleTaskDueChange = (event: any) => {
        setTaskDue(event.target.value);
    };

    const handleSelectionChanged = (event: any) => {
        event.stopPropagation();
        setSelectedTask(projectTask);
        if (!sessionInProgress && !isBreak) {
            if (
                projectTask.projectId !== "" &&
                projectTask.projectId !== undefined &&
                projectTask.projectId !== null
            ) {
                const selectedProject = projects.find(
                    (project) => project.id === projectTask.projectId,
                );
                setSelectedProject(selectedProject);
            } else {
                setSelectedProject({});
            }
        } else if (isBreak) {
            setSnackbarState({
                severity: "info",
                message:
                    "Cannot change selected task when there's break available, either complete it or skip it",
                open: true,
                autoHideDuration: 3000,
            });
        } else if (sessionInProgress) {
            setSnackbarState({
                severity: "info",
                message: "Cannot change selected task during session",
                open: true,
                autoHideDuration: 3000,
            });
        }
    };

    const handleFinishTask = () => {
        if (!sessionInProgress && !isBreak) {
            deleteProjectTask(projectTask.id);
            setSelectedProject({});
        } else if (isBreak) {
            setSnackbarState({
                severity: "info",
                message:
                    "Cannot finish task when there's break available, either complete it or skip it",
                open: true,
                autoHideDuration: 3000,
            });
        } else if (sessionInProgress) {
            setSnackbarState({
                severity: "info",
                message: "Cannot finish task during session",
                open: true,
                autoHideDuration: 3000,
            });
        }
    };

    const handleEditTask = () => {
        if (!sessionInProgress && !isBreak) {
            editProjectTask(projectTask.id);
            setSelectedProject({});
        } else if (isBreak) {
            setSnackbarState({
                severity: "info",
                message:
                    "Cannot edit task when there's break available, either complete it or skip it",
                open: true,
                autoHideDuration: 3000,
            });
        } else if (sessionInProgress) {
            setSnackbarState({
                severity: "info",
                message: "Cannot edit task during session",
                open: true,
                autoHideDuration: 3000,
            });
        }
    };

    //useEffect
    useEffectOnce(() => {
        getProjectsList();
    });

    useEffect(() => {
        if (editProjectTaskState.error) {
            setSnackbarState({
                message: "Failed to edit task",
                severity: "error",
                open: true,
            });
        }
    }, [editProjectTaskState, setSnackbarState]);

    useEffect(() => {
        if (deleteProjectTaskState.error) {
            setSnackbarState({
                message: "Failed to delete task",
                severity: "error",
                open: true,
            });
        }
    }, [deleteProjectTaskState, setSnackbarState]);

    return (
        <Accordion
            className={classes.task}
            square
            onChange={(event) => event.preventDefault()}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="Task"
            >
                <FormControlLabel
                    aria-label="Select Task"
                    onClick={handleSelectionChanged}
                    onFocus={(event) => event.stopPropagation()}
                    control={<Radio />}
                    label={projectTask.name}
                    value={projectTask.id}
                />
                <Typography
                    style={{ paddingTop: 8.5, color: "grey" }}
                    align={"center"}
                >
                    {projectTask.note}
                </Typography>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.finish}
                    onClick={handleFinishTask}
                >
                    <Typography component="h6" variant="h6">
                        {"Finish"}
                    </Typography>
                </Button>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <TextField
                    label="TASK NAME"
                    variant="outlined"
                    value={taskName}
                    onChange={handleTaskNameChange}
                    fullWidth
                />
                <TextField
                    label="NOTE"
                    variant="outlined"
                    value={taskNote}
                    onChange={handleTaskNoteChange}
                    fullWidth
                />
                <TextField
                    label="TAGS"
                    variant="outlined"
                    value={taskTags}
                    onChange={handleTaskTagsChange}
                    fullWidth
                />
                <TextField
                    type="date"
                    label={""}
                    variant={"outlined"}
                    color={"secondary"}
                    fullWidth
                    value={taskDue}
                    onChange={handleTaskDueChange}
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
                    {getProjectsListState.loading ? (
                        <MenuItem value={"loading"}>{"LOADING...."}</MenuItem>
                    ) : (
                        projects.map(({ name, id }, index) => {
                            return (
                                <MenuItem key={index} value={id}>
                                    {name}
                                </MenuItem>
                            );
                        })
                    )}
                </TextField>
                <Button variant="outlined" onClick={handleFinishTask}>
                    <Typography component="h6" variant="h6">
                        {"Delete Task"}
                    </Typography>
                </Button>

                <Button variant="outlined" onClick={handleEditTask}>
                    <Typography component="h6" variant="h6">
                        {"Save"}
                    </Typography>
                </Button>
            </AccordionDetails>
        </Accordion>
    );
};
const mapStateToProps = (state: any) => ({
    token: selectToken(state),
    projects: selectProjects(state),
    sessionInProgress: selectSessionInProgress(state),
    isBreak: selectIsBreak(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedTask: (value: any) => dispatch(setSelectedTask(value)),
    setSelectedProject: (value: ProjectType) =>
        dispatch(setSelectedProject(value)),
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskTile);
