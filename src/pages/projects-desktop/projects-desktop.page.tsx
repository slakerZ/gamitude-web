import React, { useState, useEffect, lazy, Suspense, Fragment } from "react";
import { connect } from "react-redux";
import { useAsyncFn, useEffectOnce } from "react-use";

import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import RadioGroup from "@material-ui/core/RadioGroup";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AddIcon from "@material-ui/icons/Add";
import Skeleton from "@material-ui/lab/Skeleton";

import {
    setAddProjectDialogOpen,
    setFoldersSettingsDialogOpen,
} from "redux/dialogs/dialogs.actions";
import {
    selectIsAddProjectDialogOpen,
    selectIsFolderSettingsDialogOpen,
} from "redux/dialogs/dialogs.selectors";
import { setFolders } from "redux/folders/folders.actions";
import { selectFolders } from "redux/folders/folders.selectors";
import { setProjects } from "redux/projects/projects.actions";
import { selectProjects } from "redux/projects/projects.selectors";
import {
    selectIsBreak,
    selectSessionInProgress,
} from "redux/session/session.selectors";
import { setUser } from "redux/user/user.actions";
import { selectToken } from "redux/user/user.selectors";

import { getFolders } from "api/folders/folders.api";
import { getProjects } from "api/projects/projects.api";
import { ProjectType } from "api/projects/types";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import {
    TabPanel,
    a11yProps,
} from "components/atoms/tab-panel/tab-panel.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import ProjectTile from "components/molecules/project-tile/project-tile.component";

import useProjectDesktopStyles from "./styles";
import { ProjectsPropTypes } from "./types";

const FolderSettingsDialog = lazy(
    () => import("components/molecules/custom-dialog/folder-settings-dialog"),
);
const NewProjectDialog = lazy(
    () =>
        import(
            "components/molecules/custom-dialog/new-project-dialog.component"
        ),
);

const ProjectsDesktopPage = ({
    projects,
    setProjects,
    token,
    folders,
    setFolders,
    setUser,
    sessionInProgress,
    isBreak,
    setAddProjectDialogOpen,
    isAddProjectDialogOpen,
    isFolderSettingsDialogOpen,
    setFoldersSettingsDialogOpen,
}: ProjectsPropTypes) => {
    const classes = useProjectDesktopStyles();

    // This is only for front components to mark the right radio button
    const [selectedProject, setSelectedProject] = useState("");
    const [projectsCurrFolderIndex, setProjectsCurrFolderIndex] = useState(0);

    const [getProjectsListState, getProjectsList] = useAsyncFn(async () => {
        const response = await getProjects(token);
        const result = response.data;
        setProjects(result);
        return result;
    });

    const [getFoldersListState, getFoldersList] = useAsyncFn(async () => {
        const response = await getFolders(token);
        const result = response.data;
        setFolders(result);
    });

    useEffectOnce(() => {
        getFoldersList();
        getProjectsList();
    });

    const handleChangeCurrentFolder = (
        event: React.ChangeEvent<any>,
        newValue: number,
    ) => {
        setProjectsCurrFolderIndex(newValue);
    };

    const handleChangeSelectedProject = (
        event: React.ChangeEvent<any>,
        newValue: any,
    ) => {
        if (!sessionInProgress && !isBreak) {
            setSelectedProject(newValue);
        }
    };
    const handleOpenNewProjectDialog = () => {
        setAddProjectDialogOpen(true);
    };

    const handleOpenNewFolderDialog = () => {
        setFoldersSettingsDialogOpen(true);
    };

    useEffect(() => {
        if (getFoldersListState.error) {
            const unpacked: any = { ...getFoldersListState.error };
            const statusCode = unpacked.response.status;
            if (statusCode === 401) {
                setUser({
                    token: null,
                });
            }
        }
    }, [getFoldersListState, getProjectsListState, setUser]);

    return (
        <div aria-label="Folders" className={classes.root}>
            {getFoldersListState.loading ? (
                <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.tabsPlaceholder}
                />
            ) : (
                <ToggleAbleTooltip target="folders" placement="right">
                    <div className={classes.tabsWrapper}>
                        <Tabs
                            selectionFollowsFocus
                            aria-label="Folders navigation"
                            orientation="vertical"
                            variant="scrollable"
                            value={projectsCurrFolderIndex}
                            onChange={handleChangeCurrentFolder}
                            className={classes.tabs}
                        >
                            {folders.map(({ name, icon }, index) => {
                                return (
                                    <Tab
                                        key={index}
                                        label={name}
                                        {...a11yProps(
                                            index,
                                            "folder-with-projects",
                                        )}
                                        icon={
                                            <CustomIcon
                                                variant={icon}
                                                size="small"
                                            />
                                        }
                                    />
                                );
                            })}
                        </Tabs>
                        <IconButton
                            aria-label="Add folder"
                            color="primary"
                            onClick={handleOpenNewFolderDialog}
                        >
                            <CustomIcon variant="settings" size="small" />
                        </IconButton>
                    </div>
                </ToggleAbleTooltip>
            )}
            {getProjectsListState.loading ? (
                <div className={classes.center}>
                    <CircularProgress />
                </div>
            ) : (
                <div
                    aria-label="Projects in current Folder"
                    role="menu"
                    className={classes.projectsWrapper}
                >
                    {projects.map((project: ProjectType, index: number) => {
                        const { folderId } = project;
                        return (
                            <TabPanel
                                key={index}
                                value={projectsCurrFolderIndex}
                                index={folders.findIndex((folder) => {
                                    return folder.id === folderId;
                                })}
                                role={"menuitem"}
                                id={`project-${project.id}`}
                            >
                                <RadioGroup
                                    aria-label={`selected_project_${index}`}
                                    name="selected_project"
                                    value={selectedProject}
                                    onChange={handleChangeSelectedProject}
                                >
                                    <ProjectTile
                                        index={index}
                                        getProjectsList={getProjectsList}
                                    />
                                </RadioGroup>
                            </TabPanel>
                        );
                    })}
                </div>
            )}

            <div className={classes.fabWrapper} aria-label="Add Project">
                <ToggleAbleTooltip target="addProject" placement="top">
                    <Fab
                        color="secondary"
                        aria-label="Open add project dialog"
                        className={classes.add}
                        onClick={handleOpenNewProjectDialog}
                    >
                        <AddIcon />
                    </Fab>
                </ToggleAbleTooltip>
            </div>

            <Suspense fallback={<Fragment />}>
                <FolderSettingsDialog
                    open={isFolderSettingsDialogOpen}
                    setOpen={setFoldersSettingsDialogOpen}
                    getFoldersList={getFoldersList}
                />
                <NewProjectDialog
                    open={isAddProjectDialogOpen}
                    setOpen={setAddProjectDialogOpen}
                    getProjectsList={getProjectsList}
                />
            </Suspense>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
    sessionInProgress: selectSessionInProgress(state),
    token: selectToken(state),
    folders: selectFolders(state),
    isBreak: selectIsBreak(state),
    isAddProjectDialogOpen: selectIsAddProjectDialogOpen(state),
    isFolderSettingsDialogOpen: selectIsFolderSettingsDialogOpen(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setProjects: (value: any) => dispatch(setProjects(value)),
    setFolders: (value: any) => dispatch(setFolders(value)),
    setUser: (value: any) => dispatch(setUser(value)),
    setAddProjectDialogOpen: (value: boolean) =>
        dispatch(setAddProjectDialogOpen(value)),
    setFoldersSettingsDialogOpen: (value: boolean) =>
        dispatch(setFoldersSettingsDialogOpen(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectsDesktopPage);
