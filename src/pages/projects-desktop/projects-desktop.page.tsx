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
import { STATS, ENERGIES } from "../../constants";
import {
    TabPanel,
    a11yProps,
} from "../../components/atoms/tab-panel/tab-panel.component";
import { selectFolders } from "../../redux/folders/folders.selectors";
import SessionTypeSwitch from "../../components/atoms/session-type-switch/session-type-switch.component";

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
    const [isNewProjectFormOpen, setIsNewProjectFormOpen] = React.useState(
        false,
    );
    const [text, setText] = React.useState("");
    const [name, setName] = useState("");
    const [boosted, setBoosted] = useState([""]);
    const [dominant, setDominant] = useState("");
    const [selected, setSelected] = useState("");
    const [sessionType, setSessionType] = useState("stat");

    const [postState, postProject] = useAsyncFn(
        async (name, boosted, dominant) => {
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
            resetContext();
            return data;
        },
    );

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

    const handleChangeSelectedProject = (event: any) => {
        setSelected(event.target.value);
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
                        color="primary"
                        aria-label="add folder"
                        onClick={handleAddFolder}
                    >
                        <AddIcon />
                    </IconButton>
                </ToggleAbleTooltip>
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

            <Dialog
                open={isNewProjectFormOpen}
                onClose={handleCloseAdd}
                aria-labelledby="form-dialog-title"
                PaperProps={{ className: classes.addNewForm }}
            >
                <DialogTitle id="form-dialog-title">
                    {"Create New Project"}
                </DialogTitle>
                <DialogContent className={classes.addProjectDialogContent}>
                    <TextField
                        label="PROJECT NAME"
                        variant="outlined"
                        value={text}
                        onChange={handleChangeAdd}
                        onBlur={handleBlur}
                    />
                    <SessionTypeSwitch
                        sessionType={sessionType}
                        setSessionType={setSessionType}
                    />
                    <div className={classes.container}>
                        <Typography component="h4" variant="h4" align="center">
                            {sessionType === "stat"
                                ? "Select stats that this projects boosts"
                                : "Select energies that this project restores"}
                        </Typography>
                        <ToggleButtonGroup
                            value={boosted}
                            onChange={handleChangeStats}
                            aria-label="boosted stats"
                            className={classes.btnGroup}
                        >
                            {sessionType === "stat"
                                ? STATS.map((stat, index) => {
                                      return (
                                          <ToggleAbleTooltip
                                              target={stat}
                                              key={index}
                                          >
                                              <ToggleButton
                                                  value={stat}
                                                  aria-label={stat}
                                                  className={classes.btn}
                                              >
                                                  <CustomIcon
                                                      variant={stat}
                                                      size="medium"
                                                  />
                                              </ToggleButton>
                                          </ToggleAbleTooltip>
                                      );
                                  })
                                : ENERGIES.map((energy, index) => {
                                      return (
                                          <ToggleAbleTooltip
                                              target={energy}
                                              key={index}
                                          >
                                              <ToggleButton
                                                  value={energy}
                                                  aria-label={energy}
                                                  className={classes.btn}
                                              >
                                                  <CustomIcon
                                                      variant={energy}
                                                      size="medium"
                                                  />
                                              </ToggleButton>
                                          </ToggleAbleTooltip>
                                      );
                                  })}
                        </ToggleButtonGroup>
                    </div>
                    <div className={classes.container}>
                        <Typography variant="h4" component="h4" align="center">
                            {sessionType === "stat"
                                ? "Select the dominant stat"
                                : "Select the most restored energy"}
                        </Typography>
                        <ToggleButtonGroup
                            value={dominant}
                            exclusive
                            onChange={handleChangeDominant}
                            aria-label="dominant stat"
                            className={classes.btnGroup}
                        >
                            {sessionType === "stat"
                                ? STATS.map((stat, index) => {
                                      return (
                                          <ToggleAbleTooltip
                                              target={stat}
                                              key={index}
                                          >
                                              <ToggleButton
                                                  value={stat}
                                                  aria-label={stat}
                                                  className={classes.btn}
                                              >
                                                  <CustomIcon
                                                      variant={stat}
                                                      size="medium"
                                                  />
                                              </ToggleButton>
                                          </ToggleAbleTooltip>
                                      );
                                  })
                                : ENERGIES.map((energy, index) => {
                                      return (
                                          <ToggleAbleTooltip
                                              target={energy}
                                              key={index}
                                          >
                                              <ToggleButton
                                                  value={energy}
                                                  aria-label={energy}
                                                  className={classes.btn}
                                              >
                                                  <CustomIcon
                                                      variant={energy}
                                                      size="medium"
                                                  />
                                              </ToggleButton>
                                          </ToggleAbleTooltip>
                                      );
                                  })}
                        </ToggleButtonGroup>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCloseAdd}>
                        Cancel
                    </Button>
                    {postState.loading ? (
                        <CircularProgress />
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => postProject(name, boosted, dominant)}
                        >
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
