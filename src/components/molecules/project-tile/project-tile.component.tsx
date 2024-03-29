import clsx from "clsx";
import { ProjectSessionType } from "configs/types";

import React, { useState, useEffect, lazy, Suspense, Fragment } from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { setSelectedProject } from "redux/projects/projects.actions";
import { selectProjects } from "redux/projects/projects.selectors";
import {
    selectIsBreak,
    selectSessionInProgress,
    selectSessionType,
} from "redux/session/session.selectors";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import { deleteProjectById, putProjectById } from "api/projects/projects.api";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import BoostedDominantBtnGroup from "components/molecules/boosted-dominant-btn-group/boosted-dominant-btn-group.component";

import useProjectStyles from "./styles";
import { ProjectTilePropTypes } from "./types";

const DeleteProjectDialog = lazy(
    () =>
        import(
            "components/molecules/custom-dialog/delete-project-dialog.component"
        ),
);

const ProjectTile = ({
    index,
    projects,
    token,
    setSelectedProject,
    getProjectsList,
    setSnackbarState,
    sessionType,
    sessionInProgress,
    isBreak,
}: ProjectTilePropTypes) => {
    const classes = useProjectStyles();

    const [isDeleteWarningDialogOpen, setIsDeleteWarningDialogOpen] = useState(
        false,
    );
    const [expanded, setExpanded] = useState(false);

    // Get defaults from redux
    const dominantRedux = projects[index].dominantStat;
    const boostedRedux = projects[index].stats;
    const nameRedux = projects[index].name;
    const folderRedux = projects[index].folderId;
    const methodRedux = projects[index].defaultTimerId;
    const typeRedux = projects[index].projectType;

    const [defaultMethod, setDefaultMethod] = useState(methodRedux);
    const [folder, setFolder] = useState(folderRedux);
    const [name, setName] = useState(nameRedux);
    const [boosted, setBoosted] = useState(boostedRedux);
    const [dominant, setDominant] = useState(dominantRedux);
    const [projectType, setProjectType] = useState<ProjectSessionType>(
        typeRedux,
    );

    const [deleteProjectState, deleteProject] = useAsyncFn(async () => {
        const id = projects[index].id;
        const response = await deleteProjectById(token, id);
        getProjectsList();
        return response;
    });

    const [editProjectState, editProject] = useAsyncFn(async () => {
        const id = projects[index].id;
        setExpanded(false);

        const requestBody = {
            name: name,
            folderId: folder,
            defaultTimerId: defaultMethod,
            projectType: projectType,
            dominantStat: dominant,
            stats: boosted,
            daysPerWeek: 0,
            hoursPerDay: 0,
            dayInterval: 0,
        };

        const response = await putProjectById(token, requestBody, id);
        getProjectsList();
        return response.data;
    }, [name, boosted, dominant, folder, defaultMethod, projectType]);

    const handleDeletion = () => {
        setIsDeleteWarningDialogOpen(true);
    };

    const handleDeletionConfirm = () => {
        deleteProject();
        setIsDeleteWarningDialogOpen(false);
    };

    const handleSelectionChanged = (event: any) => {
        event.stopPropagation();

        if (!sessionInProgress && !isBreak) {
            setSelectedProject(projects[index]);
        } else if (isBreak) {
            setSnackbarState({
                severity: "info",
                message:
                    "Cannot change selected project when there's break available, either complete it or skip it",
                open: true,
                autoHideDuration: 3000,
            });
        } else if (sessionInProgress) {
            setSnackbarState({
                severity: "info",
                message: "Cannot change selected project during session",
                open: true,
                autoHideDuration: 3000,
            });
        }
    };

    useEffect(() => {
        if (editProjectState.error) {
            setSnackbarState({
                severity: "error",
                message: "Failed to edit project",
                open: true,
                autoHideDuration: 3000,
            });
        }
    }, [editProjectState, setSnackbarState]);

    useEffect(() => {
        if (deleteProjectState.error) {
            setSnackbarState({
                severity: "error",
                message: "Failed to delete project",
                open: true,
                autoHideDuration: 3000,
            });
        }
    }, [deleteProjectState, setSnackbarState]);

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            square
            className={clsx(classes.container)}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.summary}
            >
                <CustomIcon variant={dominant} size="medium" />
                <ToggleAbleTooltip target="project">
                    <FormControlLabel
                        className={classes.selectProject}
                        aria-label="Select Project"
                        onClick={handleSelectionChanged}
                        onFocus={(event) => event.stopPropagation()}
                        control={<Radio />}
                        label={name}
                        value={projects[index].id}
                    />
                </ToggleAbleTooltip>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <BoostedDominantBtnGroup
                    boosted={boosted}
                    setBoosted={setBoosted}
                    dominant={dominant}
                    setDominant={setDominant}
                    name={name}
                    setName={setName}
                    sessionType={projectType}
                    setSessionType={setProjectType}
                    folder={folder}
                    setFolder={setFolder}
                    method={defaultMethod}
                    setMethod={setDefaultMethod}
                />

                <Button onClick={handleDeletion} variant="outlined">
                    <Typography component="h6" variant="h6">
                        {"Delete Project"}
                    </Typography>
                </Button>

                <Button onClick={editProject} variant="outlined">
                    <Typography component="h6" variant="h6">
                        {"Save"}
                    </Typography>
                </Button>

                <Suspense fallback={<Fragment />}>
                    <DeleteProjectDialog
                        open={isDeleteWarningDialogOpen}
                        setOpen={setIsDeleteWarningDialogOpen}
                        onSubmit={handleDeletionConfirm}
                    />
                </Suspense>
            </AccordionDetails>
        </Accordion>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
    token: selectToken(state),
    sessionType: selectSessionType(state),
    isBreak: selectIsBreak(state),
    sessionInProgress: selectSessionInProgress(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedProject: (value: any) => dispatch(setSelectedProject(value)),
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTile);
