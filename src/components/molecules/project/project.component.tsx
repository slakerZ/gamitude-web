import React, { useState } from "react";
import { useAsyncFn } from "react-use";

// API
import axios from "axios";
import {
    putDeleteProjectUrl,
    putDeleteAddProjectHeaders,
    putProjectRequestBody,
} from "../../../api/projects/projects.api";
// Redux
import { connect } from "react-redux";
import { selectProjects } from "../../../redux/projects/projects.selectors";
import { deleteProject } from "../../../redux/projects/projects.actions";
import { selectToken } from "../../../redux/user/user.selectors";
import {
    setDominant,
    setSelectedProject,
} from "../../../redux/projects/projects.actions";
import { setName } from "../../../redux/projects/projects.actions";
import { setBoosted } from "../../../redux/projects/projects.actions";

// MUI
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";
//Components
import CustomIcon from "../../atoms/custom-icon/custom-icon.component";
// Local
import { ProjectType } from "./types";
import useProjectStyles from "./styles";
import { STATS, ENERGIES } from "../../../constants";

const Project = ({
    index,
    projects,
    setName,
    token,
    deleteProject,
    setBoosted,
    setDominant,
    setSelectedProject,
}: ProjectType) => {
    const classes = useProjectStyles();

    const [text, setText] = useState("");
    const [open, setOpen] = React.useState(false);

    const dominant = projects[index].dominant;
    const boosted = projects[index].boosted;
    const name = projects[index].name;

    const syncWithRedux = (event: any) => {
        setName({
            index: index,
            name: event.target.value,
        });
    };

    const handleChangeStat = (event: any, newBoosted: any) => {
        if (newBoosted.length > 0 && newBoosted.includes(dominant)) {
            setBoosted({ index, newBoosted });
        }
    };

    const handleChangeDominant = (event: any, newDominant: any) => {
        if (boosted.includes(newDominant)) {
            setDominant({ index, newDominant });
        }
    };

    const handleDeletion = () => {
        setOpen(true);
    };

    const handleDeletionConfirm = () => {
        const id = projects[index].id;
        axios.delete(
            putDeleteProjectUrl(id),
            putDeleteAddProjectHeaders(token),
        );
        deleteProject(index);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSelectionChanged = (event: any) => {
        event.stopPropagation();
        setSelectedProject(projects[index]);
    };

    const [editProjectState, editProject] = useAsyncFn(async () => {
        const name = projects[index].name;
        const id = projects[index].id;
        const method = projects[index].method;
        const boosted = projects[index].boosted;
        const dominant = projects[index].dominant;

        const response = await axios.put(
            putDeleteProjectUrl(id),
            putProjectRequestBody(name, method, boosted, dominant),
            putDeleteAddProjectHeaders(token),
        );
        const data = await response.data;
        if (data) {
        }
        return data;
    }, [putDeleteProjectUrl]);

    return (
        <Accordion square className={classes.container}>
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
                <TextField
                    label="PROJECT NAME"
                    variant="outlined"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onBlur={syncWithRedux}
                />

                <div className={classes.container}>
                    <ToggleAbleTooltip target={"selectBoostedStats"}>
                        <Typography component="h5" variant="h5" align="center">
                            Select stats that this projects boosts
                        </Typography>
                    </ToggleAbleTooltip>
                    <ToggleButtonGroup
                        value={boosted}
                        onChange={handleChangeStat}
                        aria-label="boosted stats"
                        className={classes.btnGroup}
                    >
                        {STATS.map((stat, index) => {
                            return (
                                <ToggleAbleTooltip target={stat} key={index}>
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
                                </ToggleAbleTooltip>
                            );
                        })}
                    </ToggleButtonGroup>
                </div>

                <div className={classes.container}>
                    <ToggleAbleTooltip target={"selectDominantStats"}>
                        <Typography variant="h5" component="h5" align="center">
                            Select the dominant stat
                        </Typography>
                    </ToggleAbleTooltip>
                    <ToggleButtonGroup
                        value={dominant}
                        exclusive
                        onChange={handleChangeDominant}
                        aria-label="dominant stat"
                        className={classes.btnGroup}
                    >
                        {STATS.map((stat, index) => {
                            return (
                                <ToggleAbleTooltip target={stat} key={index}>
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
                        })}
                    </ToggleButtonGroup>
                </div>

                <Button onClick={handleDeletion} variant="contained">
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

                <Dialog
                    open={open}
                    onClose={handleCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className={classes.root}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete this project?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {" This action CANNOT be undone."}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                            {"No"}
                        </Button>
                        <Button onClick={handleDeletionConfirm} color="primary">
                            {"Yes"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </AccordionDetails>
        </Accordion>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
    token: selectToken(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setName: (value: any) => dispatch(setName(value)),
    setBoosted: (value: any) => dispatch(setBoosted(value)),
    setDominant: (value: any) => dispatch(setDominant(value)),
    deleteProject: (value: any) => dispatch(deleteProject(value)),
    setSelectedProject: (value: any) => dispatch(setSelectedProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);