import React, { useState } from "react";
import { useAsyncFn } from "react-use";
// API
import { deleteProjectById, putProjectById } from "api/projects/projects.api";
// Redux
import { connect } from "react-redux";
import { selectProjects } from "../../../redux/projects/projects.selectors";
import {
    deleteProject,
    setMethod,
    setStatus,
} from "../../../redux/projects/projects.actions";
import { selectToken } from "../../../redux/user/user.selectors";
import {
    setDominant as setDominantRedux,
    setSelectedProject,
} from "../../../redux/projects/projects.actions";
import {
    setName as setNameRedux,
    setMethod as setFolderRedux,
} from "../../../redux/projects/projects.actions";
import { setBoosted as setBoostedRedux } from "../../../redux/projects/projects.actions";
import { selectMethods } from "../../../redux/methods/methods.selectors";
// MUI
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";
//Components
import CustomIcon from "../../atoms/custom-icon/custom-icon.component";
import BoostedDominantBtnGroup from "../boosted-dominant-btn-group/boosted-dominant-btn-group.component";
// Local
import { ProjectType } from "./types";
import useProjectStyles from "./styles";
import CustomDialog from "../../atoms/custom-dialog/custom-dialog.component";

const Project = ({
    index,
    projects,
    token,
    deleteProject,
    setSelectedProject,
    setNameRedux,
    setBoostedRedux,
    setDominantRedux,
    setStatusRedux,
    setFolderRedux,
    methods,
}: ProjectType) => {
    const classes = useProjectStyles();

    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const dominantRedux = projects[index].dominant;
    const boostedRedux = projects[index].boosted;
    const nameRedux = projects[index].name;
    const folderRedux = projects[index].status;
    // TODO: New api adjust
    const methodRedux = projects[index].method;

    const [defaultMethod, setDefaultMethod] = useState(0);
    const [folder, setFolder] = useState(folderRedux);
    const [name, setName] = useState(nameRedux);
    const [boosted, setBoosted] = useState(boostedRedux);
    const [dominant, setDominant] = useState(dominantRedux);
    const [projectType, setProjectType] = useState("STAT");

    const handleDeletion = () => {
        setOpen(true);
    };

    const handleDeletionConfirm = () => {
        const id = projects[index].id;
        deleteProjectById(token, id).then((data) => {
            console.log(data);
            deleteProject(index);
            setOpen(false);
        });
    };

    const handleSelectionChanged = (event: any) => {
        event.stopPropagation();
        setSelectedProject(projects[index]);
    };

    const [editProjectState, editProject] = useAsyncFn(async () => {
        const id = projects[index].id;
        const method = projects[index].method;

        setNameRedux({
            index: index,
            name: name,
        });
        setBoostedRedux({
            index: index,
            newBoosted: boosted,
        });
        setDominantRedux({
            index: index,
            newDominant: dominant,
        });
        setStatusRedux({
            index: index,
            status: folder,
        });
        setFolderRedux({
            index: index,
            method: methods[defaultMethod],
        });

        setExpanded(false);

        const requestBody = {
            name: name,
            folderId: folder.id,
            defaultTimerId: method.id,
        };
        // const response = putProjectById(token, ,id)
        // const response = await axios.put(
        //     putDeleteProjectUrl(id),
        //     putProjectRequestBody(name, method, boosted, dominant),
        //     putDeleteAddProjectHeaders(token),
        // );
        // const data = await response.data;
        // return data;
    }, [name, boosted, dominant, folder, defaultMethod]);

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            square
            className={classes.container}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.summary}
            >
                <CustomIcon variant={dominant} size="medium" />
                <ToggleAbleTooltip target="project">
                    <FormControlLabel
                        className={classes.selectProject}
                        aria-label="Select Project"
                        onClick={handleSelectionChanged}
                        onFocus={(event) => event.stopPropagation()}
                        control={<Radio />}
                        label={name}
                        value={name}
                    />
                </ToggleAbleTooltip>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <BoostedDominantBtnGroup
                    boosted={boosted}
                    setBoosted={setBoosted}
                    dominant={dominant}
                    setDominant={setDominant}
                    name={name}
                    setName={setName}
                    sessionType={projectType}
                    setSessionType={setProjectType}
                    folder={folder}
                    setFolder={setFolder}
                    method={defaultMethod}
                    setMethod={setDefaultMethod}
                />

                <Button onClick={handleDeletion} variant="outlined">
                    <Typography component="h6" variant="h6">
                        {"Delete Project"}
                    </Typography>
                </Button>

                <Button onClick={editProject} variant="outlined">
                    {editProjectState.loading ? (
                        <CircularProgress className={classes.progress} />
                    ) : (
                        <Typography component="h6" variant="h6">
                            {editProjectState.error ? "Retry" : "Save"}
                        </Typography>
                    )}
                </Button>

                <CustomDialog
                    open={open}
                    setOpen={setOpen}
                    title={"Are you sure you want to delete this project?"}
                    onSubmit={handleDeletionConfirm}
                >
                    <Typography
                        variant="h4"
                        component="h4"
                        className={classes.textDanger}
                    >
                        {" This action CANNOT be undone."}
                    </Typography>
                </CustomDialog>
            </AccordionDetails>
        </Accordion>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
    token: selectToken(state),
    methods: selectMethods(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setNameRedux: (value: any) => dispatch(setNameRedux(value)),
    setBoostedRedux: (value: any) => dispatch(setBoostedRedux(value)),
    setDominantRedux: (value: any) => dispatch(setDominantRedux(value)),
    deleteProject: (value: any) => dispatch(deleteProject(value)),
    setSelectedProject: (value: any) => dispatch(setSelectedProject(value)),
    setStatusRedux: (value: any) => dispatch(setStatus(value)),
    setFolderRedux: (value: any) => dispatch(setFolderRedux(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
