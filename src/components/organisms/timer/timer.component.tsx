import useSound from "use-sound";

import React, { ReactElement, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { selectSelectedProject } from "redux/projects/projects.selectors";
import {
    setSessionInProgress,
    incrementSessionsComplete,
    setSessionType,
} from "redux/session/session.actions";
import { selectSessionInProgress } from "redux/session/session.selectors";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { setSelectedTimer } from "redux/timers/timers.actions";
import {
    selectSelectedTimer,
    selectTimers,
} from "redux/timers/timers.selectors";
import { selectToken } from "redux/user/user.selectors";

import { postProjectLog } from "api/projectLogs/projectLogs.api";

import CustomDialog from "components/atoms/custom-dialog/custom-dialog.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import { MINUTE_AS_MS, MS_ERROR_MARGIN, INTERVAL_FREQUENCY } from "./constants";
import useTimerStyles from "./styles";
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
}: TimerPropTypes): ReactElement => {
    const classes = useTimerStyles();

    // useState
    const [sessionTime, setSessionTime] = useState(
        selectedTimer.workTime * MINUTE_AS_MS,
    );
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [endDateAsMs, setEndDateAsMs] = useState(0);
    const [currWorkTime, setCurrWorkTime] = useState(selectedTimer.workTime);
    const [currBreakTime, setCurrBreakTime] = useState(selectedTimer.breakTime);
    const [currOverTime, setCurrOvertime] = useState(selectedTimer.overTime);
    const [isConfirmGiveUpDialogOpen, setIsConfirmGiveUpDialogOpen] = useState(
        false,
    );
    const [currSessionType, setCurrSessionType] = useState(
        selectedProject.projectType,
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
            const currEndDateAsMs = currEndDate.setMinutes(
                currEndDate.getMinutes() + currWorkTime,
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
            // Finished work session
            if (currSessionType === "STAT") {
                setSnackbarState({
                    message:
                        "Congratulations on finishing session! Click on timer to start a break.",
                    severity: "info",
                    open: true,
                });
                setCurrSessionType("ENERGY");
                setSessionType("ENERGY");
                // Set to break's time
                setSessionTime(currBreakTime * MINUTE_AS_MS);
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
            }
            // Finished earned break or energy project
            else {
                const isEnergyProject =
                    selectedProject.projectType === "ENERGY";
                setSnackbarState({
                    message: isEnergyProject
                        ? "Congratulations on finishing session!"
                        : "Break finished, keep up the good work.",
                    severity: "info",
                    open: true,
                });
                // Stat project have STAT so toggle works
                // Energy projects won't toggle
                setCurrSessionType(selectedProject.projectType);
                setSessionType(selectedProject.projectType);
                // Reset work time
                setSessionTime(currWorkTime * MINUTE_AS_MS);
                if (isEnergyProject) {
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
                }
            }
            // Common for both
            play();
            clearInterval(interval);
            setSessionInProgress(false);
        }
    };

    // useEffect
    useEffect(() => {
        const defaultTimer = timers.find(
            (timer: any) => timer.id === selectedProject.defaultTimerId,
        );
        if (defaultTimer) {
            setSelectedTimer(defaultTimer);
            setSessionTime(defaultTimer.workTime * MINUTE_AS_MS);
            setCurrSessionType(selectedProject.projectType);
        }
    }, [selectedProject]);

    useEffect(() => {
        setCurrOvertime(selectedTimer.overTime);
        setCurrWorkTime(selectedTimer.workTime);
        setSessionTime(selectedTimer.workTime * MINUTE_AS_MS);
        setCurrBreakTime(selectedTimer.breakTime);
    }, [selectedTimer]);

    useEffect(() => {
        const interval = sessionInProgress
            ? setInterval(handleCountdown, INTERVAL_FREQUENCY)
            : setInterval(() => null, 1);
        if (!sessionInProgress) {
            // Give up has been clicked
            const sessionContinues = sessionTime > 0;
            const methodSessionTimesDiffer =
                currWorkTime * MINUTE_AS_MS !== sessionTime;
            if (sessionContinues && methodSessionTimesDiffer) {
                // ResetTimer
                setSessionTime(currWorkTime * MINUTE_AS_MS);
            }
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [sessionInProgress, sessionTime]);

    return (
        <div className={classes.root}>
            <CustomDialog
                open={isConfirmGiveUpDialogOpen}
                setOpen={setIsConfirmGiveUpDialogOpen}
                onSubmit={handleGiveUp}
                title="WARNING"
            >
                <Typography variant="h6" component="h6">
                    {"Current session progress will be lost."}
                </Typography>
                <Typography variant="body1" component="p">
                    {"No stats will be added, no time will be logged."}
                </Typography>
            </CustomDialog>
            <Typography
                variant="h6"
                component="h6"
                aria-label="Selected project name or please select message"
            >
                {selectedProject.id
                    ? selectedProject.name
                    : "Please select a project"}
            </Typography>
            <Badge
                overlap="circle"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                badgeContent={
                    <ToggleAbleTooltip target="add5">
                        <Button
                            aria-label="Overtime button"
                            variant="text"
                            onClick={handleOvertime}
                            className={classes.overTimeButton}
                            disabled={!selectedProject.id || !sessionInProgress}
                        >
                            <Typography variant="h4" component="h4">
                                +{currOverTime}
                            </Typography>
                        </Button>
                    </ToggleAbleTooltip>
                }
            >
                <ToggleAbleTooltip target="sessionTimer">
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
                                    aria-label="Colon Between mintues and seconds"
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
            </Badge>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    selectedProject: selectSelectedProject(state),
    selectedTimer: selectSelectedTimer(state),
    timers: selectTimers(state),
    sessionInProgress: selectSessionInProgress(state),
    token: selectToken(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedTimer: (value: any) => dispatch(setSelectedTimer(value)),
    setSessionInProgress: (value: any) => dispatch(setSessionInProgress(value)),
    incrementSessionsComplete: () => dispatch(incrementSessionsComplete()),
    setSessionType: (value: any) => dispatch(setSessionType(value)),
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
