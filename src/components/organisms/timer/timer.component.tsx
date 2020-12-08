import { TimerTypes } from "gamitude_constants";
import useSound from "use-sound";

import React, { ReactElement, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { selectSelectedProject } from "redux/projects/projects.selectors";
import { ReduxStateType } from "redux/root.reducer";
import {
    setSessionInProgress,
    incrementSessionsComplete,
    setSessionType,
    toggleIsBreak,
} from "redux/session/session.actions";
import {
    selectSessionInProgress,
    selectSessionsComplete,
    selectIsBreak,
} from "redux/session/session.selectors";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { setSelectedTimer } from "redux/timers/timers.actions";
import {
    selectSelectedTimer,
    selectTimers,
} from "redux/timers/timers.selectors";
import { selectToken } from "redux/user/user.selectors";

import { postProjectLog } from "api/projectLogs/projectLogs.api";
import { TimerType } from "api/timers/types";

import GiveUpSessionDialog from "components/atoms/custom-dialog/give-up-session-dialog.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import { MINUTE_AS_MS, MS_ERROR_MARGIN, INTERVAL_FREQUENCY } from "./constants";
import useTimerStyles from "./styles";
import TimerBadges from "./timer-badges.component";
import { TimerPropTypes } from "./types";
import { leftPad, milisecondsToMinutes } from "./utils";

const endSound = require("assets/sounds/congratulations.mp3");
const minuteSound = require("assets/sounds/bell.mp3");

const Timer = ({
    selectedProject,
    selectedTimer,
    setSelectedTimer,
    timers,
    setSessionInProgress,
    sessionInProgress,
    token,
    incrementSessionsComplete,
    setSessionType,
    setSnackbarState,
    sessionsComplete,
    isBreak,
    toggleIsBreak,
}: TimerPropTypes): ReactElement => {
    const classes = useTimerStyles();

    // useState
    const [sessionTime, setSessionTime] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [endDateAsMs, setEndDateAsMs] = useState(0);
    const [isConfirmGiveUpDialogOpen, setIsConfirmGiveUpDialogOpen] = useState(
        false,
    );

    // useSound
    const [playMin, { isPlaying }] = useSound(minuteSound, {
        volume: 0.2,
        interrupt: true,
    });
    const [play] = useSound(endSound, {
        volume: 0.2,
        interrupt: true,
    });

    // handlers
    const handleOvertime = () => {
        const currOverTime = selectedTimer.countDownInfo.overTime;
        const overtime = currOverTime * MINUTE_AS_MS;
        setEndDateAsMs(endDateAsMs + overtime);
        setSessionTime(sessionTime + overtime);
        const movedEndDate = new Date(
            endDate.getTime() + currOverTime * MINUTE_AS_MS,
        );
        setEndDate(movedEndDate);
    };

    const handleSession = () => {
        if (!sessionInProgress) {
            // Take date now as ms and add work time
            const currEndDate = new Date();
            const sessionOrBreakTime = isBreak
                ? handleShortOrLongBreak(selectedTimer, sessionsComplete) /
                  MINUTE_AS_MS
                : selectedTimer.countDownInfo.workTime;
            const currEndDateAsMs = currEndDate.setMinutes(
                currEndDate.getMinutes() + sessionOrBreakTime,
            );

            setEndDate(currEndDate);
            setEndDateAsMs(currEndDateAsMs);

            setSessionInProgress(true);
            setStartDate(new Date());
        } else {
            setIsConfirmGiveUpDialogOpen(true);
        }
    };

    const handleGiveUp = () => {
        setSessionInProgress(false);
        setIsConfirmGiveUpDialogOpen(false);
        setSessionTime(selectedTimer.countDownInfo.workTime * MINUTE_AS_MS);
    };

    const handleSkipBreak = () => {};

    const handleShortOrLongBreak = (
        selectedTimer: TimerType,
        sessionsComplete: number,
    ) => {
        if (
            selectedTimer.countDownInfo.longerBreakTime &&
            selectedTimer.countDownInfo.breakInterval
        ) {
            // Longer break?
            if (
                selectedTimer.countDownInfo.breakInterval %
                    (sessionsComplete + 1) ===
                0
            ) {
                return (
                    selectedTimer.countDownInfo.longerBreakTime * MINUTE_AS_MS
                );
            }
            // Shorter break?
            else {
                return selectedTimer.countDownInfo.breakTime * MINUTE_AS_MS;
            }
        } else {
            return selectedTimer.countDownInfo.breakTime * MINUTE_AS_MS;
        }
    };

    const handleCountdown = (interval: any) => {
        const distance = endDateAsMs - Date.now();
        // Is minute left?
        if (
            distance >= MINUTE_AS_MS &&
            distance < MINUTE_AS_MS + MS_ERROR_MARGIN
        ) {
            if (!isPlaying) {
                playMin();
            }
        }
        // Session in progress?
        if (distance > 0) {
            setSessionTime(distance);
        }
        // Session ended successfully?
        else {
            // Finished break
            if (isBreak) {
                setSnackbarState({
                    message: "Break finished, keep up the good work!",
                    severity: "info",
                    open: true,
                    autoHideDuration: null,
                });
                // Api call
                const requestBody = {
                    projectId: selectedProject.id,
                    projectTaskId: null,
                    log: "",
                    timeSpend:
                        milisecondsToMinutes(
                            endDate.getTime() - startDate.getTime(),
                        ).minutes + 1,
                    dominantStat: selectedProject.dominantStat,
                    stats: selectedProject.stats,
                    projectType: "BREAK",
                };
                postProjectLog(token, requestBody);
                setSessionTime(
                    selectedTimer.countDownInfo.workTime * MINUTE_AS_MS,
                );
            }
            // Finished work session
            else {
                setSnackbarState({
                    message:
                        "Congratulations on finishing session! Click on timer to start a break.",
                    severity: "info",
                    open: true,
                    autoHideDuration: null,
                });
                // Api call
                const requestBody = {
                    projectId: selectedProject.id,
                    projectTaskId: null,
                    log: "",
                    timeSpend:
                        milisecondsToMinutes(
                            endDate.getTime() - startDate.getTime(),
                        ).minutes + 1,
                    dominantStat: selectedProject.dominantStat,
                    stats: selectedProject.stats,
                    projectType: selectedProject.projectType,
                };
                postProjectLog(token, requestBody).then(() => {
                    incrementSessionsComplete();
                });
                // Set to break's time
                const time = handleShortOrLongBreak(
                    selectedTimer,
                    sessionsComplete,
                );
                setSessionTime(time);
            }
            toggleIsBreak();
            play();
            clearInterval(interval);
            setSessionInProgress(false);
        }
    };

    // useEffect
    useEffect(() => {
        const defaultTimer = timers.find(
            (timer: TimerType) => timer.id === selectedProject.defaultTimerId,
        );
        if (defaultTimer) {
            setSessionType(selectedProject.projectType);
            setSelectedTimer(defaultTimer);
            setSessionTime(defaultTimer.countDownInfo.workTime * MINUTE_AS_MS);
        }
    }, [selectedProject]);

    useEffect(() => {
        const currSessionTime = selectedTimer
            ? selectedTimer.countDownInfo.workTime * MINUTE_AS_MS
            : 0;
        setSessionTime(currSessionTime);
    }, [selectedTimer]);

    useEffect(() => {
        const interval = sessionInProgress
            ? setInterval(handleCountdown, INTERVAL_FREQUENCY)
            : setInterval(() => null, 1);
        return () => {
            clearInterval(interval);
        };
    }, [sessionInProgress, sessionTime]);

    return (
        <div className={classes.root}>
            <GiveUpSessionDialog
                open={isConfirmGiveUpDialogOpen}
                setOpen={setIsConfirmGiveUpDialogOpen}
                onSubmit={handleGiveUp}
            />
            <Typography
                variant="h6"
                component="h6"
                gutterBottom
                align="justify"
            >
                {selectedProject.id && !isBreak
                    ? selectedProject.name
                    : isBreak
                    ? `BRAKE after session of ${selectedProject.name}`
                    : "Please select a project"}
            </Typography>
            <TimerBadges
                handleSkipBreak={handleSkipBreak}
                handleOvertime={handleOvertime}
            >
                <ToggleAbleTooltip
                    target={
                        selectedTimer.timerType === TimerTypes.TIMER
                            ? "sessionCountdown"
                            : "sessionStopwatch"
                    }
                    placement="left"
                >
                    <Button
                        aria-label="Timer Button"
                        className={classes.timerButton}
                        variant="text"
                        onClick={handleSession}
                        disabled={!selectedProject.id}
                    >
                        <div className={classes.timerDisplay}>
                            <Fragment>
                                <Typography
                                    aria-label="Minutes on Timer"
                                    display="inline"
                                    variant="h2"
                                    component="h2"
                                >
                                    {leftPad(
                                        milisecondsToMinutes(sessionTime)
                                            .minutes,
                                    )}
                                </Typography>
                                <Typography
                                    display="inline"
                                    variant="h3"
                                    component="h3"
                                >
                                    {":"}
                                </Typography>
                                <Typography
                                    aria-label="Seconds on Timer"
                                    display="inline"
                                    variant="h3"
                                    component="h3"
                                >
                                    {leftPad(
                                        milisecondsToMinutes(sessionTime)
                                            .seconds,
                                    )}
                                </Typography>
                            </Fragment>
                        </div>
                    </Button>
                </ToggleAbleTooltip>
            </TimerBadges>
        </div>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    selectedProject: selectSelectedProject(state),
    selectedTimer: selectSelectedTimer(state),
    timers: selectTimers(state),
    sessionInProgress: selectSessionInProgress(state),
    token: selectToken(state),
    sessionsComplete: selectSessionsComplete(state),
    isBreak: selectIsBreak(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedTimer: (value: any) => dispatch(setSelectedTimer(value)),
    setSessionInProgress: (value: any) => dispatch(setSessionInProgress(value)),
    incrementSessionsComplete: () => dispatch(incrementSessionsComplete()),
    setSessionType: (value: any) => dispatch(setSessionType(value)),
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
    toggleIsBreak: () => dispatch(toggleIsBreak()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
