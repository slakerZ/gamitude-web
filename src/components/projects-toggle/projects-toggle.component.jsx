import React from "react";
import { connect } from "react-redux";
// Actions
import { setMethod } from "../../redux/projects/projects.actions";
// Selectors
import {
    selectProjects,
    selectSessionInProgress,
} from "../../redux/projects/projects.selectors";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// UI lab
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles(theme => ({
    toggleContainer: {
        margin: theme.spacing(2, 0),
    },
}));

const ProjectsToggle = ({ index, projects, setMethod, sessionInProgress }) => {
    const handleMethod = (event, method) => {
        method = method || projects[index].method;
        setMethod({ index: index, method: method });
    };

    const classes = useStyles();

    return (
        <div className={classes.toggleContainer}>
            <ToggleButtonGroup
                value={projects[index].method}
                exclusive
                onChange={handleMethod}
                aria-label="text alignment"
            >
                <ToggleButton
                    value={25}
                    aria-label="Pomodoro"
                    disabled={sessionInProgress}
                >
                    <Typography component="h4" variant="h4">
                        25
                    </Typography>
                </ToggleButton>
                <ToggleButton
                    value={90}
                    aria-label="90/30"
                    disabled={sessionInProgress}
                >
                    <Typography component="h4" variant="h4">
                        90
                    </Typography>
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

const mapStateToProps = state => ({
    projects: selectProjects(state),
    sessionInProgress: selectSessionInProgress(state),
});

const mapDispatchToProps = dispatch => ({
    setMethod: value => dispatch(setMethod(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsToggle);
