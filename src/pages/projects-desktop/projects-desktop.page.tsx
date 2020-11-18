import React, { useState, useEffect } from "react";
import { useAsyncFn, useEffectOnce } from "react-use";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
// API
import { getFolders } from "api/folders/folders.api";
import { getProjects } from "api/projects/projects.api";
// Redux
import { connect } from "react-redux";
import { selectToken } from "redux/user/user.selectors";
import { selectProjects } from "redux/projects/projects.selectors";
import { selectSessionInProgress } from "redux/session/session.selectors";
import { setFolders } from "redux/folders/folders.actions";
import { setProjects } from "redux/projects/projects.actions";
import { selectFolders } from "redux/folders/folders.selectors";
// Atoms
import CustomIcon from "../../components/atoms/custom-icon/custom-icon.component";
import ToggleAbleTooltip from "../../components/atoms/toggleable-tooltip/toggleable-tooltip.component";
// Molecules
import ProjectTile from "../../components/molecules/project-tile/project-tile.component";
// Local
import { ProjectsPropTypes } from "./types";
import useProjectDesktopStyles from "./styles";
import {
    TabPanel,
    a11yProps,
} from "../../components/atoms/tab-panel/tab-panel.component";
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from "@material-ui/lab/Skeleton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RadioGroup from "@material-ui/core/RadioGroup";
import AddIcon from "@material-ui/icons/Add";
import { setUser } from "redux/user/user.actions";
import NewFolderDialog from "components/atoms/custom-dialog/new-folder-dialog.component";
import NewProjectDialog from "components/atoms/custom-dialog/new-project-dialog.component";

const ProjectsDesktopPage = ({
    projects,
    setProjects,
    token,
    folders,
    setFolders,
    setUser,
    sessionInProgress,
}: ProjectsPropTypes) => {
    const classes = useProjectDesktopStyles();

    const [isNewProjectFormOpen, setIsNewProjectFormOpen] = useState(false);
    const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);

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
        if (!sessionInProgress) {
            setSelectedProject(newValue);
        }
    };
    const handleOpenNewProjectDialog = () => {
        setIsNewProjectFormOpen(true);
    };

    const handleOpenNewFolderDialog = () => {
        setIsNewFolderDialogOpen(true);
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
    }, [getFoldersListState, getProjectsListState]);

    return (
        <div aria-label="Folders" className={classes.root}>
            {getFoldersListState.loading ? (
                <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.tabsPlaceholder}
                />
            ) : (
                <div className={classes.tabsWrapper}>
                    <Tabs
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
                                    {...a11yProps(index, "projects-in-folder")}
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
                    <ToggleAbleTooltip target="folder">
                        <IconButton
                            aria-label="Add folder"
                            color="primary"
                            onClick={handleOpenNewFolderDialog}
                        >
                            <AddIcon />
                        </IconButton>
                    </ToggleAbleTooltip>
                </div>
            )}
            {getProjectsListState.loading ? (
                <div className={classes.center}>
                    <CircularProgress />
                </div>
            ) : (
                <div
                    aria-label="Projects in current Folder"
                    className={classes.projectsWrapper}
                >
                    {projects.map((project: any, index: number) => {
                        const { folderId } = project;
                        return (
                            <TabPanel
                                key={index}
                                value={projectsCurrFolderIndex}
                                index={folders.findIndex((folder) => {
                                    return folder.id === folderId;
                                })}
                                role={"folder"}
                                id={"projects-in-folder"}
                            >
                                <RadioGroup
                                    aria-label="selected_project"
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
                <ToggleAbleTooltip target="project">
                    <Fab
                        color="secondary"
                        aria-label="add"
                        className={classes.add}
                        onClick={handleOpenNewProjectDialog}
                    >
                        <AddIcon />
                    </Fab>
                </ToggleAbleTooltip>
            </div>

            <NewFolderDialog
                open={isNewFolderDialogOpen}
                setOpen={setIsNewFolderDialogOpen}
                getFoldersList={getFoldersList}
            />
            <NewProjectDialog
                open={isNewProjectFormOpen}
                setOpen={setIsNewProjectFormOpen}
                getProjectsList={getProjectsList}
            />
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
    sessionInProgress: selectSessionInProgress(state),
    token: selectToken(state),
    folders: selectFolders(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setProjects: (value: any) => dispatch(setProjects(value)),
    setFolders: (value: any) => dispatch(setFolders(value)),
    setUser: (value: any) => dispatch(setUser(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectsDesktopPage);
