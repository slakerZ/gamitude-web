import React, { Fragment } from "react";
import { connect } from "react-redux";

import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { selectSelectedProject } from "redux/projects/projects.selectors";
import { ReduxStateType } from "redux/root.reducer";
import { selectSessionInProgress } from "redux/session/session.selectors";
import { selectSelectedTimer } from "redux/timers/timers.selectors";

import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import useTimerStyles from "./styles";
import { BadgePropTypes } from "./types";

const LongBreakProgressBadge = ({
    children,
    handleOvertime,
    selectedProject,
    sessionInProgress,
    selectedTimer,
}: BadgePropTypes) => {
    const classes = useTimerStyles();

    return selectedTimer.longerBreakTime ? (
        <Badge
            aria-label=""
            overlap="circle"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            badgeContent={
                <ToggleAbleTooltip target="breakInterval">
                    <Button
                        aria-label="Short long break display / skip break"
                        variant="text"
                        onClick={handleOvertime}
                        className={classes.overTimeButton}
                        disabled={!selectedProject.id || !sessionInProgress}
                    >
                        <Typography variant="h4" component="h4">
                            {selectedTimer.breakInterval}
                        </Typography>
                    </Button>
                </ToggleAbleTooltip>
            }
        >
            {children}
        </Badge>
    ) : (
        <Fragment>{children}</Fragment>
    );
};

const OvertimeBadge = ({
    children,
    handleOvertime,
    selectedProject,
    sessionInProgress,
    selectedTimer,
}: BadgePropTypes) => {
    const classes = useTimerStyles();

    return (
        <Badge
            overlap="circle"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            badgeContent={
                <ToggleAbleTooltip target="overtime">
                    <Button
                        aria-label="Overtime button"
                        variant="text"
                        onClick={handleOvertime}
                        className={classes.overTimeButton}
                        disabled={!selectedProject.id || !sessionInProgress}
                    >
                        <Typography variant="h4" component="h4">
                            +{selectedTimer.overTime}
                        </Typography>
                    </Button>
                </ToggleAbleTooltip>
            }
        >
            {children}
        </Badge>
    );
};

const ShortBreakBadge = ({
    children,
    handleOvertime,
    selectedProject,
    sessionInProgress,
    selectedTimer,
}: BadgePropTypes) => {
    const classes = useTimerStyles();

    return (
        <Badge
            aria-label="Break / Session time display"
            overlap="circle"
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            badgeContent={
                <ToggleAbleTooltip target="shortBreak">
                    <Button
                        aria-label="Short long break display / skip break"
                        variant="text"
                        onClick={handleOvertime}
                        className={classes.overTimeButton}
                        disabled={!selectedProject.id || !sessionInProgress}
                    >
                        <Typography variant="h4" component="h4">
                            {selectedTimer.breakTime}
                        </Typography>
                    </Button>
                </ToggleAbleTooltip>
            }
        >
            {children}
        </Badge>
    );
};

const LongBreakBadge = ({
    children,
    handleOvertime,
    selectedProject,
    sessionInProgress,
    selectedTimer,
}: BadgePropTypes) => {
    const classes = useTimerStyles();

    return selectedTimer.longerBreakTime ? (
        <Badge
            aria-label="Break / Session time display"
            overlap="circle"
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            badgeContent={
                <ToggleAbleTooltip target="longBreak">
                    <Button
                        aria-label="Short long break display / skip break"
                        variant="text"
                        onClick={handleOvertime}
                        className={classes.overTimeButton}
                        disabled={!selectedProject.id || !sessionInProgress}
                    >
                        <Typography variant="h4" component="h4">
                            {selectedTimer.longerBreakTime}
                        </Typography>
                    </Button>
                </ToggleAbleTooltip>
            }
        >
            {children}
        </Badge>
    ) : (
        <Fragment>{children}</Fragment>
    );
};

const TimerBadges = ({
    children,
    selectedTimer,
    selectedProject,
    sessionInProgress,
    handleOvertime,
}: BadgePropTypes) => {
    return (
        <LongBreakProgressBadge
            handleOvertime={handleOvertime}
            selectedProject={selectedProject}
            sessionInProgress={sessionInProgress}
            selectedTimer={selectedTimer}
        >
            <LongBreakBadge
                handleOvertime={handleOvertime}
                selectedProject={selectedProject}
                sessionInProgress={sessionInProgress}
                selectedTimer={selectedTimer}
            >
                <ShortBreakBadge
                    handleOvertime={handleOvertime}
                    selectedProject={selectedProject}
                    sessionInProgress={sessionInProgress}
                    selectedTimer={selectedTimer}
                >
                    <OvertimeBadge
                        handleOvertime={handleOvertime}
                        selectedProject={selectedProject}
                        sessionInProgress={sessionInProgress}
                        selectedTimer={selectedTimer}
                    >
                        {children}
                    </OvertimeBadge>
                </ShortBreakBadge>
            </LongBreakBadge>
        </LongBreakProgressBadge>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    selectedProject: selectSelectedProject(state),
    sessionInProgress: selectSessionInProgress(state),
    selectedTimer: selectSelectedTimer(state),
});

export default connect(mapStateToProps)(TimerBadges);
