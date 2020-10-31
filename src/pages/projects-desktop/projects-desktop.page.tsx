import React, { useState, MouseEvent } from "react";
import axios from "axios";
import { useAsyncFn, useEffectOnce } from "react-use";
// MUI
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RadioGroup from "@material-ui/core/RadioGroup";
import IconButton from "@material-ui/core/IconButton";
// API
import {
    getAddProjectsUrl,
    addProjectRequestBody,
    putDeleteAddProjectHeaders,
    getProjectsHeaders,
} from "../../api/projects/projects.api";
import { convertForFront, parseProjects } from "../../api/mappings";
// Redux
import { connect } from "react-redux";
import { selectToken } from "../../redux/user/user.selectors";
import { selectProjects } from "../../redux/projects/projects.selectors";
import { selectSessionInProgress } from "../../redux/session/session.selectors";
import { setFolders } from "../../redux/folders/folders.actions";
import { setProjects } from "../../redux/projects/projects.actions";
import { addProject } from "../../redux/projects/projects.actions";
// Atoms
import CustomIcon from "../../components/atoms/custom-icon/custom-icon.component";
import ToggleAbleTooltip from "../../components/atoms/toggleable-tooltip/toggleable-tooltip.component";
// Molecules
import Project from "../../components/molecules/project/project.component";
// Local
import { ProjectsType } from "./types";
import useProjectDesktopStyles from "./styles";
import {
    TabPanel,
    a11yProps,
} from "../../components/atoms/tab-panel/tab-panel.component";
import { selectFolders } from "../../redux/folders/folders.selectors";
import CustomDialog from "../../components/atoms/custom-dialog/custom-dialog.component";
import BoostedDominantBtnGroup from "../../components/atoms/custom-toggle-button-group/boosted-dominant-btn-group.component";

const ProjectsDesktopPage = ({
    projects,
    setProjects,
    token,
    addProject,
    setFolders,
    folders,
}: ProjectsType) => {
    const classes = useProjectDesktopStyles();

    const [currFolder, setCurrFolder] = useState(0);
    const [isNewProjectFormOpen, setIsNewProjectFormOpen] = useState(false);
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
        setFolders([
            ...folders,
            { label: "New Folder", icon: "active", index: folders.length },
        ]);
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
                    {folders.map(({ label, icon, index }) => {
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
                        onClick={handleAddFolder}
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
    setFolders: (value: any) => dispatch(setFolders(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectsDesktopPage);
