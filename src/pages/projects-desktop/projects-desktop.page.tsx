import React, { Fragment, useState, useEffect } from "react";
import { FolderType } from "api/folders/types";
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
import { selectTimers } from "redux/timers/timers.selectors";
import { selectToken } from "../../redux/user/user.selectors";
import { selectProjects } from "../../redux/projects/projects.selectors";
import { selectSessionInProgress } from "../../redux/session/session.selectors";
import { addFolder, setFolders } from "../../redux/folders/folders.actions";
import { setProjects, addProject } from "../../redux/projects/projects.actions";
import { selectFolders } from "../../redux/folders/folders.selectors";
// Atoms
import CustomIcon from "../../components/atoms/custom-icon/custom-icon.component";
import ToggleAbleTooltip from "../../components/atoms/toggleable-tooltip/toggleable-tooltip.component";
// Molecules
import Project from "../../components/molecules/project/project.component";
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
import CustomSnackbar from "components/atoms/custom-snackbar/custom-snackbar.component";
import { AlertProps } from "@material-ui/lab/Alert";

const ProjectsDesktopPage = ({
    projects,
    setProjects,
    token,
    addProject,
    addFolder,
    folders,
    setFolders,
    methods,
}: ProjectsPropTypes) => {
    const classes = useProjectDesktopStyles();

    const [isNewProjectFormOpen, setIsNewProjectFormOpen] = useState(false);
    const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);

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

    const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
        setProjectsCurrFolderIndex(newValue);
    };

    const handleOpenNewProjectDialog = () => {
        setIsNewProjectFormOpen(true);
    };

    const handleChangeSelectedProject = (event: any) => {
        setSelectedProject(event.target.value);
    };

    return (
        <div aria-label="Folders" className={classes.root}>
            <div className={classes.tabsWrapper}>
                <Tabs
                    aria-label="Folders navigation"
                    orientation="vertical"
                    variant="scrollable"
                    value={projectsCurrFolderIndex}
                    onChange={handleChange}
                    className={classes.tabs}
                >
                    {folders.map(({ name, icon }, index) => {
                        return (
                            <Tab
                                key={index}
                                label={name}
                                {...a11yProps(index, "projects-in-folder")}
                                icon={
                                    <CustomIcon variant={icon} size="small" />
                                }
                            />
                        );
                    })}
                </Tabs>
                <ToggleAbleTooltip target="folder">
                    <IconButton
                        aria-label="Add folder"
                        color="primary"
                        onClick={() => setIsNewFolderDialogOpen(true)}
                    >
                        <AddIcon />
                    </IconButton>
                </ToggleAbleTooltip>
            </div>
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
                                <Project index={index} />
                            </RadioGroup>
                        </TabPanel>
                    );
                })}
            </div>

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
            />
            <NewProjectDialog
                open={isNewProjectFormOpen}
                setOpen={setIsNewProjectFormOpen}
                token={token}
                getProjectsList={getProjectsList}
            />
        </div>
    );
};

const NewFolderDialog = ({
    open,
    setOpen,
    token,
    getFoldersList,
}: NewFolderDialogPropTypes) => {
    const classes = useProjectDesktopStyles();

    const [folderName, setFolderName] = useState("");
    const [folderIcon, setFolderIcon] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        AlertProps["severity"]
    >("info");
    const [snackbarMessage, setSnackbarMessage] = useState("");

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
    }, [createNewFolderState]);

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
            <CustomSnackbar
                open={snackbarOpen}
                setOpen={setSnackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </Fragment>
    );
};

const NewProjectDialog = ({
    open,
    setOpen,
    token,
    getProjectsList,
}: NewProjectDialogPropTypes) => {
    const [name, setName] = useState("");
    const [projectType, setProjectType] = useState<ProjectSessionType>("STAT");
    const [stats, setStats] = useState<StatType[] | EnergyType[] | any[]>([]);
    const [dominantStat, setDominantStat] = useState<
        StatType | EnergyType | string
    >("");
    const [folderId, setFolderId] = useState("");
    const [defaultTimerId, setDefaultTimerId] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        AlertProps["severity"]
    >("info");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [createNewProjectState, createNewProject] = useAsyncFn(async () => {
        const requestBody = {
            name: name,
            folderId: folderId,
            defaultTimerId: defaultTimerId,
            projectType: "None",
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
    }, [createNewProjectState]);

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
            <CustomSnackbar
                open={snackbarOpen}
                setOpen={setSnackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
    sessionInProgress: selectSessionInProgress(state),
    token: selectToken(state),
    folders: selectFolders(state),
    methods: selectTimers(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setProjects: (value: any) => dispatch(setProjects(value)),
    addProject: (value: any) => dispatch(addProject(value)),
    addFolder: (value: FolderType) => dispatch(addFolder(value)),
    setFolders: (value: any) => dispatch(setFolders(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectsDesktopPage);
