import React, { useState } from "react";
import { useAsyncFn } from "react-use";
// API
import { deleteProjectById, putProjectById } from "api/projects/projects.api";
// Redux
import { connect } from "react-redux";
import { selectProjects } from "redux/projects/projects.selectors";
import { selectToken } from "redux/user/user.selectors";
import { setSelectedProject } from "redux/projects/projects.actions";
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
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";
//Components
import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import BoostedDominantBtnGroup from "../boosted-dominant-btn-group/boosted-dominant-btn-group.component";
// Local
import { ProjectTilePropTypes } from "./types";
import useProjectStyles from "./styles";
import CustomDialog from "components/atoms/custom-dialog/custom-dialog.component";
import { ProjectSessionType } from "types";

const Project = ({
    index,
    projects,
    token,
    setSelectedProject,
    getProjectsList,
}: ProjectTilePropTypes) => {
    const classes = useProjectStyles();

    const [isDeleteWarningDialogOpen, setIsDeleteWarningDialogOpen] = useState(
        false,
    );
    const [expanded, setExpanded] = useState(false);

    // Get defaults from redux
    const dominantRedux = projects[index].dominantStat;
    const boostedRedux = projects[index].stats;
    const nameRedux = projects[index].name;
    const folderRedux = projects[index].folderId;
    const methodRedux = projects[index].defaultTimerId;

    const [defaultMethod, setDefaultMethod] = useState(methodRedux);
    const [folder, setFolder] = useState(folderRedux);
    const [name, setName] = useState(nameRedux);
    const [boosted, setBoosted] = useState(boostedRedux);
    const [dominant, setDominant] = useState(dominantRedux);
    const [projectType, setProjectType] = useState<ProjectSessionType>("STAT");

    const [deleteProjectState, deleteProject] = useAsyncFn(async () => {
        const id = projects[index].id;
        deleteProjectById(token, id).then(() => {
            getProjectsList();
            return;
        });
    });

    const [editProjectState, editProject] = useAsyncFn(async () => {
        const id = projects[index].id;
        setExpanded(false);

        const requestBody = {
            name: name,
            folderId: folder,
            defaultTimerId: defaultMethod,
            projectType: "None",
            dominantStat: dominant,
            stats: boosted,
            daysPerWeek: 0,
            hoursPerDay: 0,
            dayInterval: 0,
        };

        const response = await putProjectById(token, requestBody, id);
        return response.data;
    }, [name, boosted, dominant, folder, defaultMethod]);

    const handleDeletion = () => {
        setIsDeleteWarningDialogOpen(true);
    };

    const handleDeletionConfirm = () => {
        deleteProject();
        setIsDeleteWarningDialogOpen(false);
    };

    const handleSelectionChanged = (event: any) => {
        event.stopPropagation();
        setSelectedProject(projects[index]);
    };

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
                    <Typography component="h6" variant="h6">
                        {"Save"}
                    </Typography>
                </Button>

                <CustomDialog
                    open={isDeleteWarningDialogOpen}
                    setOpen={setIsDeleteWarningDialogOpen}
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
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedProject: (value: any) => dispatch(setSelectedProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
