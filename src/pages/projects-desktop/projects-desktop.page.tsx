import axios from "axios";
import React, { useState, MouseEvent } from "react";
import { connect } from "react-redux";
import { useAsyncFn, useEffectOnce } from "react-use";

import { TextField, Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import RadioGroup from "@material-ui/core/RadioGroup";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AddIcon from "@material-ui/icons/Add";

import { addFolder } from "redux/folders/folders.actions";
import { selectFolders } from "redux/folders/folders.selectors";
import { setProjects } from "redux/projects/projects.actions";
import { addProject } from "redux/projects/projects.actions";
import { selectProjects } from "redux/projects/projects.selectors";
import { selectSessionInProgress } from "redux/session/session.selectors";
import { selectToken } from "redux/user/user.selectors";

import { convertForFront, parseProjects } from "api/mappings";
import {
    getAddProjectsUrl,
    addProjectRequestBody,
    putDeleteAddProjectHeaders,
    getProjectsHeaders,
} from "api/projects/projects.api";

import CustomDialog from "components/atoms/custom-dialog/custom-dialog.component";
import { ICONS } from "components/atoms/custom-icon/constants";
import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import CustomToggleButtonGroup from "components/atoms/custom-toggle-button-group/custom-toggle-button-group.component";
import {
    TabPanel,
    a11yProps,
} from "components/atoms/tab-panel/tab-panel.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";
import BoostedDominantBtnGroup from "components/molecules/boosted-dominant-btn-group/boosted-dominant-btn-group.component";
import Project from "components/molecules/project/project.component";

import { ProjectsType } from "./types";

import useProjectDesktopStyles from "./styles";

const ProjectsDesktopPage = ({
    projects,
    setProjects,
    token,
    addProject,
    addFolder,
    folders,
}: ProjectsType) => {
    const classes = useProjectDesktopStyles();

    const [isNewProjectFormOpen, setIsNewProjectFormOpen] = useState(false);
    const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);

    const [defaultMethod, setDefaultMethod] = useState(0);
    const [folder, setFolder] = useState(folders[0].index);
    const [folderName, setFolderName] = useState("");
    const [icon, setIcon] = useState("");
    const [currFolder, setCurrFolder] = useState(0);

    const [name, setName] = useState("");
    const [boosted, setBoosted] = useState([""]);
    const [dominant, setDominant] = useState("");
    const [selected, setSelected] = useState("");
    const [sessionType, setSessionType] = useState("STAT");

    const [postState, postProject] = useAsyncFn(async () => {
        const filteredBoosted = boosted.filter((el: string) => {
            return el !== "";
        });
        const response = await axios.post(
            getAddProjectsUrl,
            addProjectRequestBody(name, filteredBoosted, dominant),
            putDeleteAddProjectHeaders(token),
        );
        const data = await response.data;
        const convertedData = convertForFront(data);
        addProject(convertedData);
        setIsNewProjectFormOpen(false);
        return data;
    }, [name, boosted, dominant]);

    const [getProjectsState, getProjects] = useAsyncFn(async () => {
        const response = await axios.get(
            getAddProjectsUrl,
            getProjectsHeaders(token),
        );
        const result = await response.data;
        const parsedProjects = parseProjects(result);
        setProjects(parsedProjects);
        return result;
    });

    useEffectOnce(() => {
        getProjects();
    });

    const handleAddFolder = () => {
        addFolder({
            label: folderName,
            icon: icon,
            index: folders.length,
        });
        setIsNewFolderDialogOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
        setCurrFolder(newValue);
    };

    const handleClickOpen = () => {
        setIsNewProjectFormOpen(true);
    };

    const handleChangeSelectedProject = (event: any) => {
        setSelected(event.target.value);
    };

    const handleIconChange = (e: any, newIcon: any) => {
        setIcon(newIcon);
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
                    value={currFolder}
                    onChange={handleChange}
                    className={classes.tabs}
                >
                    {folders.map(({ label, icon }, index) => {
                        return (
                            <Tab
                                key={index}
                                label={label}
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
                    onSubmit={handleAddFolder}
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
                            value={icon}
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
                            value={currFolder}
                            index={status}
                            role={"folder"}
                            id={"projects-in-folder"}
                        >
                            <RadioGroup
                                aria-label="selected_project"
                                name="selected_project"
                                value={selected}
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
                onSubmit={postProject}
            >
                <BoostedDominantBtnGroup
                    boosted={boosted}
                    setBoosted={setBoosted}
                    dominant={dominant}
                    setDominant={setDominant}
                    name={name}
                    setName={setName}
                    sessionType={sessionType}
                    setSessionType={setSessionType}
                    folder={folder}
                    setFolder={setFolder}
                    method={defaultMethod}
                    setMethod={setDefaultMethod}
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
});

const mapDispatchToProps = (dispatch: any) => ({
    setProjects: (value: any) => dispatch(setProjects(value)),
    addProject: (value: any) => dispatch(addProject(value)),
    addFolder: (value: any) => dispatch(addFolder(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectsDesktopPage);
