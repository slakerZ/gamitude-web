import React, { useState, MouseEvent } from "react";
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
import { selectMethods } from "redux/methods/methods.selectors";
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
import { ProjectsPropTypes } from "./types";
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
import { FullProjectType } from "api/projects/types";
import { EnergyType, StatType } from "types";
import { ProjectSessionType } from "types";

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

    // Projects Dialog
    const [projectName, setProjectName] = useState("");
    const [projectsSessionType, setProjectsSessionType] = useState<
        ProjectSessionType
    >("STAT");
    const [projectBoostedStatistics, setprojectBoostesStatistics] = useState<
        StatType[] | EnergyType[]
    >(["STRENGTH"]);
    const [projectDominantStatistic, setProjectDominantStatistic] = useState<
        StatType | EnergyType
    >("STRENGTH");
    const [projectsCurrFolderIndex, setProjectsCurrFolderIndex] = useState(0);
    const [projectDefaultMethodIndex, setProjectDefaultMethodIndex] = useState(
        0,
    );

    // Folders Dialog
    const [folderIndex, setFolderIndex] = useState(0);
    const [folderName, setFolderName] = useState("");
    const [folderIcon, setFolderIcon] = useState("");

    const [createNewFolderState, createNewFolder] = useAsyncFn(async () => {
        const requestBody = {
            name: folderName,
            icon: folderIcon,
            description: "",
        };
        const result = await postFolder(token, requestBody);
        addFolder(result.data);
        setIsNewFolderDialogOpen(false);
        return result;
    }, [folderName, folderIcon]);

    const [createNewProjectState, createNewProject] = useAsyncFn(async () => {
        const requestBody = {
            name: projectName,
            folderId: folders[folderIndex].id,
            defaultTimerId: methods[projectDefaultMethodIndex].id,
            projectType: projectsSessionType,
            dominantStat: projectDominantStatistic,
            stats: projectBoostedStatistics,
            daysPerWeek: 0,
            hoursPerDay: 0,
            dayInterval: 0,
        };
        console.log(requestBody);
        const result = await postProject(token, requestBody);
        addProject(result.data);
        setIsNewProjectFormOpen(false);
        return result.data;
    }, [
        projectName,
        folderIndex,
        projectDefaultMethodIndex,
        projectsSessionType,
        projectBoostedStatistics,
        projectDominantStatistic,
    ]);

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

    const handleClickOpen = () => {
        setIsNewProjectFormOpen(true);
    };

    const handleChangeSelectedProject = (event: any) => {
        setSelectedProject(event.target.value);
    };

    const handleIconChange = (e: any, newIcon: any) => {
        setFolderIcon(newIcon);
    };

    const handleChangeFolderName = (e: any) => {
        setFolderName(e.target.value);
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
                <CustomDialog
                    aria-label="Create New Folder Dialog"
                    open={isNewFolderDialogOpen}
                    setOpen={setIsNewFolderDialogOpen}
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
            </div>
            <div
                aria-label="Projects in current Folder"
                className={classes.projectsWrapper}
            >
                {projects.map((project: any) => {
                    const { status } = project;
                    const index = projects.indexOf(project);
                    return (
                        <TabPanel
                            key={index}
                            value={projectsCurrFolderIndex}
                            index={status}
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
                        onClick={handleClickOpen}
                    >
                        <AddIcon />
                    </Fab>
                </ToggleAbleTooltip>
            </div>

            <CustomDialog
                aria-label="Create New Project Dialog"
                open={isNewProjectFormOpen}
                setOpen={setIsNewProjectFormOpen}
                title={"Create new project"}
                onSubmit={createNewProject}
            >
                <BoostedDominantBtnGroup
                    boosted={projectBoostedStatistics}
                    setBoosted={setprojectBoostesStatistics}
                    dominant={projectDominantStatistic}
                    setDominant={setProjectDominantStatistic}
                    name={projectName}
                    setName={setProjectName}
                    sessionType={projectsSessionType}
                    setSessionType={setProjectsSessionType}
                    folder={folderIndex}
                    setFolder={setFolderIndex}
                    method={projectDefaultMethodIndex}
                    setMethod={setProjectDefaultMethodIndex}
                />
            </CustomDialog>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
    sessionInProgress: selectSessionInProgress(state),
    token: selectToken(state),
    folders: selectFolders(state),
    methods: selectMethods(state),
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
