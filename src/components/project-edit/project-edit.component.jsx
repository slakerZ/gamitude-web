import React from "react";
import { connect } from "react-redux";
// Actions
import { setName, deleteProject } from "../../redux/projects/projects.actions";
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
    name,
    index,
    sessionInProgress,
    setName,
    deleteProject,
}) => {
    const useStyles = makeStyles({
        expansionPanel: {
            backgroundColor: "transparent",
        },
        expansionPanelSummary: {
            backgroundColor: "rgba(74, 2, 89, 0.4)",
        },
        expansionPanelDetails: {
            backgroundColor: "rgba(49, 0, 59, 0.4)",
            flexDirection: "column",
        },
    });
    const classes = useStyles();

    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleChange = event => {
        setName({ index: index, name: event.target.value });
    };

    const handleSave = () => {
        //TODO: Add proper API call
        setIsExpanded(false);
    };

    const handleDeletion = () => {
        deleteProject(index);
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
                <Button onClick={() => handleSave()} variant="outlined">
                    <Typography component="h6" variant="h6">
                        Save
                    </Typography>
                </Button>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const mapStateToProps = state => ({
    sessionInProgress: state.projects.sessionInProgress,
});

const mapDispatchToProps = dispatch => ({
    setName: value => dispatch(setName(value)),
    deleteProject: value => dispatch(deleteProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);
