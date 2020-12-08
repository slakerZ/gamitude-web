import { TimerTypes } from "gamitude_constants";

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
import { BadgePropTypes, TimerBadgedPropTypes } from "./types";

const LongBreakProgressBadge = ({
    children,
    onClick,
    selectedProject,
    sessionInProgress,
    selectedTimer,
}: BadgePropTypes) => {
    const classes = useTimerStyles();

    return selectedTimer && selectedTimer.countDownInfo.longerBreakTime ? (
        <Badge
            aria-label="Progress towards long break"
            overlap="circle"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            badgeContent={
                <ToggleAbleTooltip target="breakInterval" placement="left">
                    <Button
                        aria-label="Skip break"
                        variant="text"
                        onClick={onClick}
                        className={classes.badgeButton}
                        disabled={!selectedProject.id || !sessionInProgress}
                    >
                        <Typography variant="h4" component="h4">
                            {selectedTimer.countDownInfo.breakInterval}
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
    onClick,
    selectedProject,
    sessionInProgress,
    selectedTimer,
}: BadgePropTypes) => {
    const classes = useTimerStyles();

    return selectedTimer.timerType === TimerTypes.TIMER ? (
        <Badge
            overlap="circle"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            badgeContent={
                <ToggleAbleTooltip target="overtime" placement="left-end">
                    <Button
                        aria-label="Overtime button"
                        variant="text"
                        onClick={onClick}
                        className={classes.badgeButton}
                        disabled={!selectedProject.id || !sessionInProgress}
                    >
                        <Typography variant="h4" component="h4">
                            +
                            {selectedTimer
                                ? selectedTimer.countDownInfo.overTime
                                : 0}
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

const ShortBreakBadge = ({
    children,
    onClick,
    selectedProject,
    sessionInProgress,
    selectedTimer,
}: BadgePropTypes) => {
    const classes = useTimerStyles();

    return selectedTimer.timerType === TimerTypes.TIMER ? (
        <Badge
            aria-label="Short break time display"
            overlap="circle"
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            badgeContent={
                <ToggleAbleTooltip target="shortBreak" placement="left">
                    <Button
                        aria-label="Short break time display / skip break"
                        variant="text"
                        onClick={onClick}
                        className={classes.badgeButton}
                        disabled={!selectedProject.id || !sessionInProgress}
                    >
                        <Typography variant="h4" component="h4">
                            {selectedTimer
                                ? selectedTimer.countDownInfo.breakTime
                                : 0}
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

const LongBreakBadge = ({
    children,
    onClick,
    selectedProject,
    sessionInProgress,
    selectedTimer,
}: BadgePropTypes) => {
    const classes = useTimerStyles();

    return selectedTimer && selectedTimer.countDownInfo.longerBreakTime ? (
        <Badge
            aria-label="Long break time display"
            overlap="circle"
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            badgeContent={
                <ToggleAbleTooltip target="longBreak" placement="left">
                    <Button
                        aria-label="Skip break"
                        variant="text"
                        onClick={onClick}
                        className={classes.badgeButton}
                        disabled={!selectedProject.id || !sessionInProgress}
                    >
                        <Typography variant="h4" component="h4">
                            {selectedTimer.countDownInfo.longerBreakTime}
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
    handleSkipBreak,
}: TimerBadgedPropTypes) => {
    return (
        <LongBreakProgressBadge
            onClick={handleSkipBreak}
            selectedProject={selectedProject}
            sessionInProgress={sessionInProgress}
            selectedTimer={selectedTimer}
        >
            <LongBreakBadge
                onClick={handleSkipBreak}
                selectedProject={selectedProject}
                sessionInProgress={sessionInProgress}
                selectedTimer={selectedTimer}
            >
                <ShortBreakBadge
                    onClick={handleSkipBreak}
                    selectedProject={selectedProject}
                    sessionInProgress={sessionInProgress}
                    selectedTimer={selectedTimer}
                >
                    <OvertimeBadge
                        onClick={handleOvertime}
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
