import React, { useState, MouseEvent } from "react";
import axios from "axios";
import { useAsyncFn, useEffectOnce } from "react-use";
// MUI
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
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
import { setProjects } from "../../redux/projects/projects.actions";
import { selectToken } from "../../redux/user/user.selectors";
import { selectProjects } from "../../redux/projects/projects.selectors";
import { selectSessionInProgress } from "../../redux/session/session.selectors";
import { addProject } from "../../redux/projects/projects.actions";
// Context
import { useAddProjectContext } from "../../context/add-projects.context";
// Atoms
import CustomIcon from "../../components/atoms/custom-icon/custom-icon.component";
// Molecules
import Project from "../../components/molecules/project/project.component";
// Local
import { ProjectsType } from "./types";
import useProjectDesktopStyles from "./styles";
import { FOLDERS } from "./constants";
import { STATS } from "../../constants";
import {
    TabPanel,
    a11yProps,
} from "../../components/atoms/tab-panel/tab-panel.component";

const ProjectsDesktopPage = ({
    projects,
    setProjects,
    token,
    addProject,
}: ProjectsType) => {
    const classes = useProjectDesktopStyles();

    const {
        name,
        setName,
        boosted,
        setBoosted,
        dominant,
        setDominant,
    } = useAddProjectContext()!;

    const [currFolder, setCurrFolder] = useState(0);
    const [isNewProjectFormOpen, setIsNewProjectFormOpen] = React.useState(
        false,
    );
    const [text, setText] = React.useState("");

    const [postState, postProject] = useAsyncFn(async () => {
        console.log(boosted, dominant, name);
        const filteredBoosted = boosted.filter((el) => {
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
        resetContext();
        return data;
    });

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

    const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
        setCurrFolder(newValue);
    };

    const handleClickOpen = () => {
        setIsNewProjectFormOpen(true);
    };

    const handleChangeAdd = (event: { target: { value: string } }) => {
        setText(event.target.value);
    };

    const handleBlur = (event: { target: { value: string } }) => {
        setName(event.target.value);
    };

    const handleCloseAdd = () => {
        setIsNewProjectFormOpen(false);
    };

    const resetContext = () => {
        setName("");
        setBoosted([""]);
        setDominant("");
    };

    const handleChangeStats = (event: MouseEvent, newBoosted: string[]) => {
        if (newBoosted.includes(dominant) || dominant.length === 0) {
            setBoosted(newBoosted);
        }
    };

    const handleChangeDominant = (event: MouseEvent, newDominant: string) => {
        if (boosted.includes(newDominant)) {
            setDominant(newDominant);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.tabsWrapper}>
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
                                {...a11yProps(index, "projects-in-folder")}
                                icon={
                                    <CustomIcon variant={icon} size="small" />
                                }
                            />
                        );
                    })}
                </Tabs>
            </div>
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
                            value={currFolder}
                            index={status}
                            role={"folder"}
                            id={"projects-in-folder"}
                        >
                            <Project index={index} />
                        </TabPanel>
                    );
                })}
            </div>

            <div className={classes.fabWrapper} aria-label="Add Project">
                <Fab
                    color="secondary"
                    aria-label="add"
                    className={classes.add}
                    onClick={handleClickOpen}
                >
                    <AddIcon />
                </Fab>
            </div>

            <Dialog
                open={isNewProjectFormOpen}
                onClose={handleCloseAdd}
                aria-labelledby="form-dialog-title"
                PaperProps={{ className: classes.addNewForm }}
            >
                <DialogTitle id="form-dialog-title">
                    {"Create New Project"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="PROJECT NAME"
                        variant="outlined"
                        value={text}
                        onChange={handleChangeAdd}
                        onBlur={handleBlur}
                    />
                    <div className={classes.container}>
                        <Typography component="h4" variant="h4" align="center">
                            Select stats that this projects boosts
                        </Typography>
                        <ToggleButtonGroup
                            value={boosted}
                            onChange={handleChangeStats}
                            aria-label="boosted stats"
                            className={classes.btnGroup}
                        >
                            {STATS.map((stat, index) => {
                                return (
                                    <ToggleButton
                                        key={index}
                                        value={stat}
                                        aria-label={stat}
                                        className={classes.btn}
                                    >
                                        <CustomIcon
                                            variant={stat}
                                            size="medium"
                                        />
                                    </ToggleButton>
                                );
                            })}
                        </ToggleButtonGroup>
                    </div>
                    <div className={classes.container}>
                        <Typography variant="h4" component="h4" align="center">
                            Select the dominant stat
                        </Typography>
                        <ToggleButtonGroup
                            value={dominant}
                            exclusive
                            onChange={handleChangeDominant}
                            aria-label="dominant stat"
                            className={classes.btnGroup}
                        >
                            {STATS.map((stat, index) => {
                                return (
                                    <ToggleButton
                                        key={index}
                                        value={stat}
                                        aria-label={stat}
                                        className={classes.btn}
                                    >
                                        <CustomIcon
                                            variant={stat}
                                            size="medium"
                                        />
                                    </ToggleButton>
                                );
                            })}
                        </ToggleButtonGroup>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd} color="primary">
                        Cancel
                    </Button>
                    {postState.loading ? (
                        <CircularProgress />
                    ) : (
                        <Button variant="contained" onClick={postProject}>
                            {postState.error ? "Try Again" : "Submit"}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
    sessionInProgress: selectSessionInProgress(state),
    token: selectToken(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setProjects: (value: any) => dispatch(setProjects(value)),
    addProject: (value: any) => dispatch(addProject(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectsDesktopPage);
