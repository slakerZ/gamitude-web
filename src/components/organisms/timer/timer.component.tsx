import { ProjectSessionTypes, TimerTypes } from "configs/constants";
import useSound from "use-sound";

import React, {
    ReactElement,
    Fragment,
    useEffect,
    useState,
    useCallback,
    lazy,
    Suspense,
} from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useSpeechRecognition } from "react-speech-recognition";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { selectSelectedProject } from "redux/projects/projects.selectors";
import { ReduxStateType } from "redux/root.reducer";
import {
    setSessionInProgress,
    incrementSessionsComplete,
    setSessionType,
    toggleIsBreak,
    setIsBreak,
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

import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import TimerBadges from "components/molecules/custom-badge/timer-badges.component";

import { MINUTE_AS_MS, MS_ERROR_MARGIN, INTERVAL_FREQUENCY } from "./constants";
import useTimerStyles from "./styles";
import { TimerPropTypes } from "./types";
import { leftPad, milisecondsToMinutes } from "./utils";

const SkipBreakDialog = lazy(
    () =>
        import(
            "components/molecules/custom-dialog/skip-break-dialog.component"
        ),
);
const GiveUpSessionDialog = lazy(
    () =>
        import(
            "components/molecules/custom-dialog/give-up-session-dialog.component"
        ),
);

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
    setIsBreak,
}: TimerPropTypes): ReactElement => {
    const classes = useTimerStyles();

    // useState
    const [sessionTime, setSessionTime] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [startDateAsMs, setStartDateAsMs] = useState(0);
    const [endDate, setEndDate] = useState(new Date());
    const [endDateAsMs, setEndDateAsMs] = useState(0);
    const [isConfirmGiveUpDialogOpen, setIsConfirmGiveUpDialogOpen] = useState(
        false,
    );
    const [isSkipBreakDialogOpen, setIsSkipBreakDialogOpen] = useState(false);

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
            // Start date
            const currStartDate = new Date();
            setStartDate(currStartDate);
            setStartDateAsMs(currStartDate.getTime());

            // End date
            const currEndDate = new Date();
            // Set to work time or break time
            const sessionOrBreakTime = isBreak
                ? handleShortOrLongBreak(selectedTimer, sessionsComplete) /
                  MINUTE_AS_MS
                : selectedTimer.countDownInfo.workTime;
            // Take date now as ms and add work time
            const currEndDateAsMs = currEndDate.setMinutes(
                currEndDate.getMinutes() + sessionOrBreakTime,
            );

            setEndDate(currEndDate);
            setEndDateAsMs(currEndDateAsMs);

            setSessionInProgress(true);
        } else {
            // Give up if countdown
            if (selectedTimer.timerType === TimerTypes.TIMER) {
                if (isBreak) {
                    setIsSkipBreakDialogOpen(true);
                } else {
                    setIsConfirmGiveUpDialogOpen(true);
                }
            }
            // Manual finish if stopwatch
            else {
                const minutesSpend = milisecondsToMinutes(
                    Date.now() - startDateAsMs,
                ).minutes;
                if (minutesSpend) {
                    setSnackbarState({
                        message: "Session Finished",
                        severity: "info",
                        open: true,
                        autoHideDuration: null,
                    });
                    // Api call
                    const requestBody = {
                        projectId: selectedProject.id,
                        projectTaskId: null,
                        log: "",
                        timeSpend: minutesSpend + 1,
                        type: selectedProject.projectType,
                    };
                    postProjectLog(token, requestBody).then(() => {
                        incrementSessionsComplete();
                    });
                }
                // Don't log anything below 1 minute
                else {
                    setSnackbarState({
                        message: "Finished before 1 minute - no progress",
                        severity: "info",
                        open: true,
                        autoHideDuration: null,
                    });
                }
                setSessionTime(0);
            }
            setSessionInProgress(false);
        }
    };

    const handleGiveUp = () => {
        setSessionInProgress(false);
        setIsConfirmGiveUpDialogOpen(false);
        setSessionTime(selectedTimer.countDownInfo.workTime * MINUTE_AS_MS);
    };

    const handleSkipBreak = () => {
        setIsBreak(false);
        setSessionInProgress(false);
        setIsSkipBreakDialogOpen(false);
        setSessionTime(selectedTimer.countDownInfo.workTime * MINUTE_AS_MS);
    };

    const handleShortOrLongBreak = (
        selectedTimer: TimerType,
        sessionsComplete: number,
    ) => {
        const lBreak = selectedTimer.countDownInfo.longerBreakTime;
        const sBreak = selectedTimer.countDownInfo.breakTime;
        const inter = selectedTimer.countDownInfo.breakInterval;
        // Timer has longer break?
        if (inter && lBreak && sessionsComplete !== 0) {
            // Longer break?
            if (sessionsComplete % inter === 0) {
                return lBreak * MINUTE_AS_MS;
            }
            // Shorter break?
            else {
                return sBreak * MINUTE_AS_MS;
            }
        }
        // If it doesn't set to short
        else {
            return sBreak * MINUTE_AS_MS;
        }
    };

    const handleStopwatch = useCallback(() => {
        const distance = Date.now() - startDateAsMs;
        setSessionTime(distance);
    }, [startDateAsMs]);

    const handleCountdown = useCallback(() => {
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
                const minutesSpend = milisecondsToMinutes(
                    endDate.getTime() - startDate.getTime(),
                ).minutes;
                // Api call
                const requestBody = {
                    projectId: selectedProject.id,
                    projectTaskId: null,
                    log: "",
                    timeSpend: minutesSpend + 1,
                    type: ProjectSessionTypes.BREAK,
                };
                postProjectLog(token, requestBody).then(() => {
                    incrementSessionsComplete();
                });
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
                const minutesSpend = milisecondsToMinutes(
                    endDate.getTime() - startDate.getTime(),
                ).minutes;
                // Api call
                const requestBody = {
                    projectId: selectedProject.id,
                    projectTaskId: null,
                    log: "",
                    timeSpend: minutesSpend + 1,
                    type: selectedProject.projectType,
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
            setSessionInProgress(false);
        }
    }, [
        endDateAsMs,
        endDate,
        incrementSessionsComplete,
        isBreak,
        isPlaying,
        play,
        playMin,
        selectedProject,
        selectedTimer,
        sessionsComplete,
        setSessionInProgress,
        setSnackbarState,
        startDate,
        toggleIsBreak,
        token,
    ]);

    // voice rec
    const commands = [
        {
            command: "start (session)",
            callback: handleSession,
        },
        {
            command: "overtime",
            callback:
                selectedTimer.timerType === "TIMER"
                    ? handleOvertime
                    : () => {
                          return null;
                      },
        },
        {
            command: "end (session)",
            callback:
                selectedTimer.timerType === "TIMER"
                    ? handleGiveUp
                    : handleSession,
        },
    ];

    useSpeechRecognition({
        commands,
    });

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
    }, [selectedProject, setSelectedTimer, timers, setSessionType]);

    useEffect(() => {
        const currSessionTime = selectedTimer
            ? selectedTimer.countDownInfo.workTime * MINUTE_AS_MS
            : 0;
        setSessionTime(currSessionTime);
    }, [selectedTimer]);

    useEffect(() => {
        const countdownOrStopwatch =
            selectedTimer && selectedTimer.timerType === TimerTypes.TIMER
                ? handleCountdown
                : handleStopwatch;
        const interval = sessionInProgress
            ? setInterval(countdownOrStopwatch, INTERVAL_FREQUENCY)
            : setInterval(() => null, 1);
        return () => {
            clearInterval(interval);
        };
    }, [
        sessionInProgress,
        sessionTime,
        selectedTimer,
        handleCountdown,
        handleStopwatch,
    ]);

    useEffect(() => {
        if (sessionInProgress) {
            document.title = `${leftPad(
                milisecondsToMinutes(sessionTime).minutes,
            )}:${leftPad(milisecondsToMinutes(sessionTime).seconds)}`;
        } else {
            document.title = "Gamitude | Projects";
        }
    }, [sessionInProgress, sessionTime]);

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{"Gamitude | Projects"}</title>
            </Helmet>
            <Suspense fallback={<Fragment />}>
                <GiveUpSessionDialog
                    open={isConfirmGiveUpDialogOpen}
                    setOpen={setIsConfirmGiveUpDialogOpen}
                    onSubmit={handleGiveUp}
                />
                <SkipBreakDialog
                    open={isSkipBreakDialogOpen}
                    setOpen={setIsSkipBreakDialogOpen}
                    onSubmit={handleSkipBreak}
                />
            </Suspense>
            <Typography
                variant="h6"
                component="h1"
                gutterBottom
                align="justify"
            >
                {selectedProject.id && !isBreak
                    ? selectedProject.name
                    : isBreak
                    ? `BRAKE after session of ${selectedProject.name}`
                    : "Please select a project"}
            </Typography>
            <TimerBadges handleOvertime={handleOvertime}>
                <ToggleAbleTooltip
                    target={
                        selectedTimer &&
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
    setIsBreak: (value: any) => dispatch(setIsBreak(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
