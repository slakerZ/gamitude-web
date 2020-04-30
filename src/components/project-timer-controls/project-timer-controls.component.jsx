import React from "react";
import { connect } from "react-redux";
import { useUpdateEffect } from "react-use";
// Actions
import { setSessionInProgress } from "../../redux/session/session.actions";
// UI core
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {
    selectSessionInProgress,
    selectBreakInProgress,
} from "../../redux/session/session.selectors";

const ProjectTimerControls = ({
    localSession,
    setLocalSession,
    sessionInProgress,
    breakInProgress,
}) => {
    // Break/Session in progress
    useUpdateEffect(() => {
        setSessionInProgress(localSession);
    }, [localSession]);

    return (
        <ButtonGroup size="medium">
            <Button
                onClick={() => setLocalSession(!localSession)}
                variant={localSession ? "outlined" : "contained"}
                disabled={
                    (!localSession && sessionInProgress) || breakInProgress
                }
            >
                <Typography variant="h6" component="h6">
                    {localSession ? "Give Up" : "Start"}
                </Typography>
            </Button>
        </ButtonGroup>
    );
};

const mapStateToProps = state => ({
    sessionInProgress: selectSessionInProgress(state),
    breakInProgress: selectBreakInProgress(state),
});

const mapDispatchToProps = dispatch => ({
    setSessionInProgress: value => dispatch(setSessionInProgress(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectTimerControls);
