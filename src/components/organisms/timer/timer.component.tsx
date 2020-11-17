import React, { ReactElement, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";
// Local
import { TimerPropTypes } from "./types";
import useTimerStyles from "./styles";
import { selectSelectedProject } from "../../../redux/projects/projects.selectors";
import {
    selectSelectedTimer,
    selectTimers,
} from "../../../redux/timers/timers.selectors";
import { setSelectedTimer } from "redux/timers/timers.actions";
import { setSessionInProgress } from "redux/session/session.actions";
import { selectSessionInProgress } from "redux/session/session.selectors";

const endSound = require("assets/sounds/congratulations.mp3");
const minuteSound = require("assets/sounds/bell.mp3");

const Timer = ({
    selectedProject,
    selectedTimer,
    setSelectedTimer,
    timers,
    setSessionInProgress,
    sessionInProgress,
}: TimerPropTypes): ReactElement => {
    const classes = useTimerStyles();

    const minuteAsMiliseconds = 60000;
    const milisecondsErrorMargin = 1000;
    const intervalFrequency = 250;

    const [sessionTime, setSessionTime] = useState(
        selectedTimer.workTime * minuteAsMiliseconds,
    );
    const [endDate, setEndDate] = useState(new Date());
    const [endDateAsMs, setEndDateAsMs] = useState(0);
    const [currWorkTime, setCurrWorkTime] = useState(selectedTimer.workTime);
    const [currOverTime, setCurrOvertime] = useState(selectedTimer.overTime);

    const [playMin, { isPlaying }] = useSound(minuteSound, {
        volume: 0.2,
        interrupt: true,
    });

    const [play] = useSound(endSound, {
        volume: 0.2,
        interrupt: true,
    });

    const leftPad = (val: number) => (val < 10 ? `0${val}` : `${val}`);

    const milisecondsToMinutes = (time: number) => {
        const minutes = Math.floor(time / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return {
            minutes: minutes,
            seconds: seconds,
        };
    };

    const handleOvertime = () => {};

    const handleSession = () => {
        const currEndDate = new Date();
        const currEndDateAsMs = currEndDate.setMinutes(
            currEndDate.getMinutes() + currWorkTime,
        );
        setEndDate(currEndDate);
        setEndDateAsMs(currEndDateAsMs);
        setSessionInProgress(!sessionInProgress);
    };

    useEffect(() => {
        const defaultTimer = timers.find(
            (timer: any) => timer.id === selectedProject.defaultTimerId,
        );
        if (defaultTimer) {
            setSelectedTimer(defaultTimer);
            setSessionTime(defaultTimer.workTime * minuteAsMiliseconds);
        }
    }, [selectedProject]);

    useEffect(() => {
        setCurrOvertime(selectedTimer.overTime);
        setCurrWorkTime(selectedTimer.workTime);
        setSessionTime(selectedTimer.workTime * minuteAsMiliseconds);
    }, [selectedTimer]);

    useEffect(() => {
        const interval = sessionInProgress
            ? setInterval(() => {
                  const distance = endDateAsMs - Date.now();
                  // Is minute left?
                  if (
                      distance >= minuteAsMiliseconds &&
                      distance < minuteAsMiliseconds + milisecondsErrorMargin
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
                      setSessionTime(currWorkTime * minuteAsMiliseconds);
                      clearInterval(interval);
                      setSessionInProgress(false);
                      //Play end sound
                      play();
                  }
              }, intervalFrequency)
            : setInterval(() => null, 1);
        if (!sessionInProgress) {
            // Give up has been clicked
            const sessionContinues = sessionTime > 0;
            const methodSessionTimesDiffer =
                currWorkTime * minuteAsMiliseconds !== sessionTime;
            if (sessionContinues && methodSessionTimesDiffer) {
                // ResetTimer
                setSessionTime(currWorkTime * minuteAsMiliseconds);
            }
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [sessionInProgress, sessionTime]);

    return (
        <Fragment>
            <div className={classes.root}>
                <Badge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    badgeContent={
                        <ToggleAbleTooltip target="add5">
                            <Button
                                variant="text"
                                onClick={handleOvertime}
                                className={classes.addFive}
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
                            className={classes.timerButton}
                            variant="text"
                            onClick={handleSession}
                        >
                            <div className={classes.timerDisplay}>
                                <div className={classes.minSecWrapper}>
                                    <Typography
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
                                        display="inline"
                                        variant="h3"
                                        component="h3"
                                    >
                                        {leftPad(
                                            milisecondsToMinutes(sessionTime)
                                                .seconds,
                                        )}
                                    </Typography>
                                </div>
                            </div>
                        </Button>
                    </ToggleAbleTooltip>
                </Badge>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    selectedProject: selectSelectedProject(state),
    selectedTimer: selectSelectedTimer(state),
    timers: selectTimers(state),
    sessionInProgress: selectSessionInProgress(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedTimer: (value: any) => dispatch(setSelectedTimer(value)),
    setSessionInProgress: (value: any) => dispatch(setSessionInProgress(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
