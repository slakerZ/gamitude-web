import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
// Actions
import { setName, deleteProject } from "../../redux/projects/projects.actions";
// Selectors
import { selectToken } from "../../redux/user/user.selectors";
import { selectSessionInProgress } from "../../redux/session/session.selectors";
import { selectProjects } from "../../redux/projects/projects.selectors";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// UI icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// Components
import ProjectStats from "../project-stats/project-stats.component.jsx";
import ProjectsStatsDominant from "../project-stats-dominant/project-stats-dominant.component.jsx";
import ProjectStatus from "../project-status/project-status.component.jsx";

const ProjectEdit = ({
    projects,
    index,
    sessionInProgress,
    setName,
    deleteProject,
    token,
}) => {
    const name = projects[index].name;
    const id = projects[index].id;
    const method = projects[index].method;
    const status = projects[index].status;
    const boosted = projects[index].boosted;
    const dominant = projects[index].dominant;

    const useStyles = makeStyles(theme => ({
        expansionPanel: {
            backgroundColor: "transparent",
        },
        expansionPanelSummary: {
            backgroundColor: theme.palette.secondary.main,
        },
        expansionPanelDetails: {
            backgroundColor: theme.palette.secondary.main,
            flexDirection: "column",
        },
    }));
    const classes = useStyles();

    const [isExpanded, setIsExpanded] = React.useState(false);

    useEffect(() => {
        setIsExpanded(false);
    }, [sessionInProgress]);

    const handleChange = event => {
        setName({ index: index, name: event.target.value });
    };

    const handleSave = () => {
        const url = `http://gamitude.rocks:31778/api/pro/Projects/${id}`;
        const data = {
            Name: name,
            PrimaryMethod: mapMethodToPrimaryMethod(method),
            ProjectStatus: mapStatusToProjectStatus(status),
            Stats: mapBoostedToStats(boosted),
            DominantStat: mapDominantToDominantStat(dominant),
        };
        const headers = {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        };
        axios.put(url, data, headers).then(response => {
            console.log(response.data);
        });
        setIsExpanded(false);
    };

    const handleDeletion = () => {
        // Api call
        setIsExpanded(false);
        deleteProject(index);
    };

    const mapMethodToPrimaryMethod = method => {
        switch (method) {
            case 25:
                return "POMODORO";
            default:
                return "POMODORO";
        }
    };
    const mapStatusToProjectStatus = status => {
        switch (status) {
            case 0:
                return "ACTIVE";
            case 1:
                return "PAUSED";
            case 2:
                return "DONE";
            default:
                return "ACTIVE";
        }
    };
    const mapBoostedToStats = boosted => {
        return boosted.map(stat => {
            return stat.toUpperCase();
        });
    };

    const mapDominantToDominantStat = dominant => {
        return dominant.toUpperCase();
    };

    return (
        <ExpansionPanel
            square
            className={classes.expansionPanel}
            disabled={sessionInProgress}
            expanded={isExpanded}
            onChange={(e, expanded) => setIsExpanded(expanded)}
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.expansionPanelSummary}
            >
                <Typography component="h4" variant="h4">
                    Edit Project
                </Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                <TextField
                    label="PROJECT NAME"
                    variant="outlined"
                    value={name}
                    onChange={handleChange}
                />

                <ProjectStats index={index} />
                <ProjectsStatsDominant index={index} />

                <ProjectStatus index={index} destination={1} />
                <ProjectStatus index={index} destination={2} />
                <Button onClick={() => handleDeletion()} variant="contained">
                    <Typography component="h6" variant="h6">
                        Delete Project
                    </Typography>
                </Button>
                <Button onClick={handleSave} variant="outlined">
                    <Typography component="h6" variant="h6">
                        Save
                    </Typography>
                </Button>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const mapStateToProps = state => ({
    sessionInProgress: selectSessionInProgress(state),
    projects: selectProjects(state),
    token: selectToken(state),
});

const mapDispatchToProps = dispatch => ({
    setName: value => dispatch(setName(value)),
    deleteProject: value => dispatch(deleteProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);
