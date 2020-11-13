import React, { Fragment, useState, useEffect } from "react";
import { useAsyncFn, useEffectOnce } from "react-use";
// MUI
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RadioGroup from "@material-ui/core/RadioGroup";
import IconButton from "@material-ui/core/IconButton";
// API
import { getFolders, postFolder } from "api/folders/folders.api";
import { getProjects, postProject } from "api/projects/projects.api";
// Redux
import { connect } from "react-redux";
import { selectToken } from "../../redux/user/user.selectors";
import { selectProjects } from "../../redux/projects/projects.selectors";
import { selectSessionInProgress } from "../../redux/session/session.selectors";
import { setFolders } from "../../redux/folders/folders.actions";
import { setProjects } from "../../redux/projects/projects.actions";
import { selectFolders } from "../../redux/folders/folders.selectors";
// Atoms
import CustomIcon from "../../components/atoms/custom-icon/custom-icon.component";
import ToggleAbleTooltip from "../../components/atoms/toggleable-tooltip/toggleable-tooltip.component";
// Molecules
import ProjectTile from "../../components/molecules/project-tile/project-tile.component";
// Local
import {
    ProjectsPropTypes,
    NewProjectDialogPropTypes,
    NewFolderDialogPropTypes,
} from "./types";
import useProjectDesktopStyles from "./styles";
import {
    TabPanel,
    a11yProps,
} from "../../components/atoms/tab-panel/tab-panel.component";
import CustomDialog from "../../components/atoms/custom-dialog/custom-dialog.component";
import BoostedDominantBtnGroup from "../../components/molecules/boosted-dominant-btn-group/boosted-dominant-btn-group.component";
import { TextField, Typography } from "@material-ui/core";
import CustomToggleButtonGroup from "../../components/atoms/custom-toggle-button-group/custom-toggle-button-group.component";
import { ICONS } from "../../components/atoms/custom-icon/constants";
import { EnergyType, StatType } from "types";
import { ProjectSessionType } from "types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from "@material-ui/lab/Skeleton";
import {
    editMessage,
    editSeverity,
    setOpen,
} from "redux/snackbar/snackbar.actions";

const ProjectsDesktopPage = ({
    projects,
    setProjects,
    token,
    folders,
    setFolders,
    setSnackbarMessage,
    setSnackbarOpen,
    setSnackbarSeverity,
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
        setSelectedProject(newValue);
    };
    const handleOpenNewProjectDialog = () => {
        setIsNewProjectFormOpen(true);
    };

    const handleOpenNewFolderDialog = () => {
        setIsNewFolderDialogOpen(true);
    };

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
                    {projects.map((project: any) => {
                        const { folderId } = project;
                        const index = projects.indexOf(project);
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
                token={token}
                getFoldersList={getFoldersList}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarSeverity={setSnackbarSeverity}
            />
            <NewProjectDialog
                open={isNewProjectFormOpen}
                setOpen={setIsNewProjectFormOpen}
                token={token}
                getProjectsList={getProjectsList}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarSeverity={setSnackbarSeverity}
            />
        </div>
    );
};

const NewFolderDialog = ({
    open,
    setOpen,
    token,
    getFoldersList,
    setSnackbarMessage,
    setSnackbarOpen,
    setSnackbarSeverity,
}: NewFolderDialogPropTypes) => {
    const classes = useProjectDesktopStyles();

    const [folderName, setFolderName] = useState("");
    const [folderIcon, setFolderIcon] = useState("");

    const [createNewFolderState, createNewFolder] = useAsyncFn(async () => {
        const requestBody = {
            name: folderName,
            icon: folderIcon,
            description: "",
        };
        const result = await postFolder(token, requestBody);
        setOpen(false);
        getFoldersList();
        // Reset
        setFolderName("");
        setFolderIcon("");
        return result;
    }, [folderName, folderIcon]);

    const handleIconChange = (e: any, newIcon: any) => {
        setFolderIcon(newIcon);
    };

    const handleChangeFolderName = (e: any) => {
        setFolderName(e.target.value);
    };

    useEffect(() => {
        if (createNewFolderState.error) {
            setSnackbarSeverity("error");
            setSnackbarMessage("Failed to create new folder");
            setSnackbarOpen(true);
        }
    }, [
        createNewFolderState,
        setSnackbarSeverity,
        setSnackbarMessage,
        setSnackbarOpen,
    ]);

    return (
        <Fragment>
            <CustomDialog
                aria-label="Create New Folder Dialog"
                open={open}
                setOpen={setOpen}
                title={"Create New Folder"}
                onSubmit={createNewFolder}
            >
                <div
                    aria-label="Create New Folder Dialog's Body"
                    className={classes.newFolderDialogBody}
                >
                    <TextField
                        label={"Name"}
                        variant={"outlined"}
                        fullWidth
                        value={folderName}
                        onChange={handleChangeFolderName}
                    />
                    <Typography
                        variant={"h4"}
                        component={"h4"}
                        align={"center"}
                    >
                        {"Choose folder icon"}
                    </Typography>
                    <CustomToggleButtonGroup
                        value={folderIcon}
                        handleChange={handleIconChange}
                        items={ICONS}
                        exclusive={true}
                    />
                </div>
            </CustomDialog>
        </Fragment>
    );
};

const NewProjectDialog = ({
    open,
    setOpen,
    token,
    getProjectsList,
    setSnackbarMessage,
    setSnackbarOpen,
    setSnackbarSeverity,
}: NewProjectDialogPropTypes) => {
    const [name, setName] = useState("");
    const [projectType, setProjectType] = useState<ProjectSessionType>("STAT");
    const [stats, setStats] = useState<StatType[] | EnergyType[] | any[]>([]);
    const [dominantStat, setDominantStat] = useState<
        StatType | EnergyType | string
    >("");
    const [folderId, setFolderId] = useState("");
    const [defaultTimerId, setDefaultTimerId] = useState("");

    const [createNewProjectState, createNewProject] = useAsyncFn(async () => {
        const requestBody = {
            name: name,
            folderId: folderId,
            defaultTimerId: defaultTimerId,
            projectType: projectType,
            dominantStat: dominantStat,
            stats: stats,
            daysPerWeek: 0,
            hoursPerDay: 0,
            dayInterval: 0,
        };
        const result = await postProject(token, requestBody);
        setOpen(false);
        getProjectsList();
        // Reset
        setName("");
        setProjectType("STAT");
        setStats([]);
        setDominantStat("");
        setFolderId("");
        setDefaultTimerId("");
        return result.data;
    }, [name, folderId, defaultTimerId, projectType, stats, dominantStat]);

    useEffect(() => {
        if (createNewProjectState.error) {
            setSnackbarSeverity("error");
            setSnackbarMessage("Failed to create new project");
            setSnackbarOpen(true);
        }
    }, [
        createNewProjectState,
        setSnackbarSeverity,
        setSnackbarMessage,
        setSnackbarOpen,
    ]);

    return (
        <Fragment>
            <CustomDialog
                aria-label="Create New Project Dialog"
                open={open}
                setOpen={setOpen}
                title={"Create new project"}
                onSubmit={createNewProject}
            >
                <BoostedDominantBtnGroup
                    boosted={stats}
                    setBoosted={setStats}
                    dominant={dominantStat}
                    setDominant={setDominantStat}
                    name={name}
                    setName={setName}
                    sessionType={projectType}
                    setSessionType={setProjectType}
                    folder={folderId}
                    setFolder={setFolderId}
                    method={defaultTimerId}
                    setMethod={setDefaultTimerId}
                />
            </CustomDialog>
        </Fragment>
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
    setSnackbarOpen: (value: any) => dispatch(setOpen(value)),
    setSnackbarSeverity: (value: any) => dispatch(editSeverity(value)),
    setSnackbarMessage: (value: any) => dispatch(editMessage(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectsDesktopPage);
