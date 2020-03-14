import React from "react";
import { connect } from "react-redux";
// Actions
import { setMethod } from "../../redux/projects/projects.actions";
// Selectors
import { selectSessionInProgress } from "../../redux/session/session.selectors";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// UI lab
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { selectProjects } from "../../redux/projects/projects.selectors";

const ProjectToggle = ({ index, projects, setMethod, sessionInProgress }) => {
    const method = projects[index].method;

    const useStyles = makeStyles(theme => ({
        toggleContainer: {
            margin: theme.spacing(2, 0),
        },
    }));
    const classes = useStyles();

    const handleMethod = (event, newMethod) => {
        newMethod = newMethod || method;
        setMethod({ index: index, method: newMethod });
    };

    return (
        <div className={classes.toggleContainer}>
            <ToggleButtonGroup
                value={method}
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
    sessionInProgress: selectSessionInProgress(state),
    projects: selectProjects(state),
});

const mapDispatchToProps = dispatch => ({
    setMethod: value => dispatch(setMethod(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectToggle);
