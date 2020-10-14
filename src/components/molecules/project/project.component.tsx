import React, { Fragment, useState } from "react";
import { useAsyncFn } from "react-use";

// API
import axios from "axios";
import { url, headers } from "./project-edit-delete.api";
import {
    urlEdit,
    headersEdit,
    request_bodyEdit,
} from "./project-edit-submit.api";
// Redux
import { connect } from "react-redux";
import { selectProjects } from "../../../redux/projects/projects.selectors";
import { deleteProject } from "../../../redux/projects/projects.actions";
import { selectToken } from "../../../redux/user/user.selectors";
import { setDominant } from "../../../redux/projects/projects.actions";
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
//Components
import BackendFeedback from "../../atoms/backend-feedback/backend-feedback.component";
import CustomIcon from "../../atoms/custom-icon/custom-icon.component";
// Local
import { ProjectType } from "./types";
import useProjectStyles from "./styles";

const Project = ({
    index,
    projects,
    setName,
    token,
    deleteProject,
    setBoosted,
    setDominant,
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
        axios.delete(url(id), headers(token));
        deleteProject(index);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const [state, submit] = useAsyncFn(async () => {
        const name = projects[index].name;
        const id = projects[index].id;
        const method = projects[index].method;
        const boosted = projects[index].boosted;
        const dominant = projects[index].dominant;

        const response = await axios.put(
            urlEdit(id),
            request_bodyEdit(name, method, boosted, dominant),
            headersEdit(token),
        );
        const data = await response.data;
        if (data) {
        }
        return data;
    }, [urlEdit]);

    return (
        <Accordion square className={classes.container}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.summary}
            >
                <CustomIcon variant={dominant} size="medium" />
                <Typography component="h3" variant="h3">
                    {name}
                </Typography>
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
                    <Typography component="h5" variant="h5" align="center">
                        Select stats that this projects boosts
                    </Typography>
                    <ToggleButtonGroup
                        value={boosted}
                        onChange={handleChangeStat}
                        aria-label="boosted stats"
                        className={classes.btnGroup}
                    >
                        <ToggleButton
                            value="strength"
                            aria-label="strength"
                            className={classes.btn}
                        >
                            <CustomIcon variant="strength" size="medium" />
                        </ToggleButton>

                        <ToggleButton
                            value="creativity"
                            aria-label="creativity"
                            className={classes.btn}
                        >
                            <CustomIcon variant="creativity" size="medium" />
                        </ToggleButton>

                        <ToggleButton
                            value="intelligence"
                            aria-label="intelligence"
                            className={classes.btn}
                        >
                            <CustomIcon variant="intelligence" size="medium" />
                        </ToggleButton>

                        <ToggleButton
                            value="fluency"
                            aria-label="fluency"
                            className={classes.btn}
                        >
                            <CustomIcon variant="fluency" size="medium" />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <div className={classes.container}>
                    <Typography variant="h5" component="h5" align="center">
                        Select the dominant stat
                    </Typography>
                    <ToggleButtonGroup
                        value={dominant}
                        exclusive
                        onChange={handleChangeDominant}
                        aria-label="dominant stat"
                        className={classes.btnGroup}
                    >
                        <ToggleButton
                            value="strength"
                            aria-label="strength"
                            className={classes.btn}
                        >
                            <CustomIcon variant="strength" size="medium" />
                        </ToggleButton>

                        <ToggleButton
                            value="creativity"
                            aria-label="creativity"
                            className={classes.btn}
                        >
                            <CustomIcon variant="creativity" size="medium" />
                        </ToggleButton>

                        <ToggleButton
                            value="intelligence"
                            aria-label="intelligence"
                            className={classes.btn}
                        >
                            <CustomIcon variant="intelligence" size="medium" />
                        </ToggleButton>

                        <ToggleButton
                            value="fluency"
                            aria-label="fluency"
                            className={classes.btn}
                        >
                            <CustomIcon variant="fluency" size="medium" />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <Button onClick={handleDeletion} variant="contained">
                    <Typography component="h6" variant="h6">
                        {"Delete Project"}
                    </Typography>
                </Button>

                <Button onClick={submit} variant="outlined">
                    <Typography component="h6" variant="h6">
                        {"Save"}
                    </Typography>
                </Button>

                <BackendFeedback
                    loading={state.loading}
                    error={state.error}
                    value={state.value}
                    errorMessage={"Couldn't save"}
                    successMessage={""}
                />

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
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
