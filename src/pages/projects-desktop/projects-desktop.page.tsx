import React, { useState } from "react";
import axios from "axios";
import { useAsyncFn, useEffectOnce } from "react-use";
// MUI Core
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
// API
import { url, headers, parseProjects } from "../../api/projects.api";
// Redux
import { connect } from "react-redux";
import { setProjects } from "../../redux/projects/projects.actions";
import { selectToken } from "../../redux/user/user.selectors";
import { selectProjects } from "../../redux/projects/projects.selectors";
import {
    selectBreakInProgress,
    selectSessionInProgress,
    selectProjectsTab,
} from "../../redux/session/session.selectors";
// Atoms
import CustomIcon from "../../components/atoms/custom-icon/custom-icon.component";
// Molecules
import Project from "../../components/molecules/project/project.component";
import ProjectAddForm from "../../components/organisms/project-add-form/projects-add-form.component";
import { AddProjectProvider } from "../../context/add-projects.context";
// Local
import { ProjectsType, TabPanelProps } from "./types";
import useProjectDesktopStyles from "./styles";
import { FOLDERS } from "./constants";
import { a11yProps } from "./utils";

const TabPanel = (props: TabPanelProps) => {
    const { children, currFolder, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={currFolder !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {currFolder === index || currFolder === 0 ? (
                <Box p={0}>
                    <Typography>{children}</Typography>
                </Box>
            ) : (
                <Box p={0}></Box>
            )}
        </div>
    );
};

const ProjectsDesktopPage = ({
    projects,
    projectsTab,
    setProjects,
    token,
}: ProjectsType) => {
    const classes = useProjectDesktopStyles();

    const [currFolder, setCurrFolder] = useState(0);
    const [isNewProjectFormOpen, setIsNewProjectFormOpen] = React.useState(
        false,
    );

    const [state, submit] = useAsyncFn(async () => {
        const response = await axios.get(url, headers(token));
        const result = await response.data;
        const parsedProjects = parseProjects(result);
        setProjects(parsedProjects);
        return result;
    }, [url]);

    useEffectOnce(() => {
        submit();
    });

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrFolder(newValue);
    };

    const handleClickOpen = () => {
        setIsNewProjectFormOpen(true);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={currFolder}
                onChange={handleChange}
                aria-label="Project folders navigation"
                className={classes.tabs}
            >
                {FOLDERS.map(({ label, icon, index }) => {
                    return (
                        <Tab
                            label={label}
                            key={index}
                            {...a11yProps(index)}
                            icon={<CustomIcon variant={icon} size="small" />}
                        />
                    );
                })}
            </Tabs>

            <div
                className={classes.projectsWrapper}
                aria-label="Projects in current Folder"
            >
                {projects.map((project: any) => {
                    const { status } = project;
                    const index = projects.indexOf(project);
                    return (
                        <TabPanel
                            key={index}
                            currFolder={currFolder}
                            index={status}
                        >
                            <Project index={index} />
                        </TabPanel>
                    );
                })}
            </div>

            <AddProjectProvider>
                <div className={classes.fabAndFormWrapper} aria-label="">
                    <Fab
                        color="secondary"
                        aria-label="add"
                        className={classes.add}
                        onClick={handleClickOpen}
                    >
                        <AddIcon />
                    </Fab>
                    <ProjectAddForm
                        open={isNewProjectFormOpen}
                        setOpen={setIsNewProjectFormOpen}
                    />
                </div>
            </AddProjectProvider>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
    breakInProgress: selectBreakInProgress(state),
    sessionInProgress: selectSessionInProgress(state),
    projectsTab: selectProjectsTab(state),
    token: selectToken(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setProjects: (value: any) => dispatch(setProjects(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectsDesktopPage);
