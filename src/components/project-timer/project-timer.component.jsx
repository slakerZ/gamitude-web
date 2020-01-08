import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// UI core
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
// Moment
import { duration } from "moment/moment";
// Selectors
import {
    selectProjects,
    selectSessionInProgress,
    selectSessionsComplete,
    selectBreakInProgress,
} from "../../redux/projects/projects.selectors";
// Components
import TimerDisplays from "../timer-displays/timer-displays.component.jsx";
// Actions
import {
    setBreakInProgress,
    setSessionInProgress,
    setSessionsComplete,
} from "../../redux/projects/projects.actions";

const ProjectTimer = ({
    index,
    projects,
    sessionInProgress,
    breakInProgress,
    sessionsComplete,
    setSessionInProgress,
    setSessionsComplete,
    setBreakInProgress,
}) => {
    const project = projects[index];

    const [sessionTime, setSessionTime] = useState(
        duration(project.method, "minutes")
    );
    const [localSession, setLocalSession] = useState(false);

    const [breakTime, setBreakTime] = useState(duration(0, "minutes"));
    const [localBreak, setLocalBreak] = useState(false);

    useEffect(() => {
        setSessionTime(duration(project.method, "minutes"));
    }, [project.method]);

    useEffect(() => {
        setSessionInProgress(localSession);
    }, [localSession, setSessionInProgress]);

    useEffect(() => {
        setBreakInProgress(localBreak);
    }, [localBreak, setBreakInProgress]);

    useEffect(() => {
        const handleBreak = methodBaseTime => {
            switch (methodBaseTime) {
                case 25:
                    if ((sessionsComplete + 1) % 5 === 0) {
                        return 15;
                    } else {
                        return 5;
                    }
                case 90:
                    return 30;
                default:
                    return 0;
            }
        };
        const interval = localSession
            ? setInterval(
                  () =>
                      setSessionTime(() => {
                          if (sessionTime.asSeconds() > 0) {
                              sessionTime.subtract(1, "second");
                              return duration(duration(sessionTime));
                          } else {
                              // Stop timer
                              setLocalSession(false);

                              // Update sessions count
                              const newCount = sessionsComplete + 1;
                              setSessionsComplete(newCount);

                              // Reset timer
                              setSessionTime(
                                  duration(project.method, "minutes")
                              );
                              // Add time to break timer
                              const accumulatedBreak =
                                  breakTime.asMinutes() +
                                  handleBreak(project.method);
                              setBreakTime(
                                  duration(accumulatedBreak, "minutes")
                              );
                              return sessionTime;
                          }
                      }),
                  1
              )
            : null;
        if (!localSession) {
            if (
                sessionTime.asSeconds() > 0 &&
                duration(project.method, "minutes").asSeconds() !==
                    sessionTime.asSeconds()
            ) {
                setSessionTime(duration(duration(project.method, "minutes")));
            }
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [
        sessionTime,
        localSession,
        project.method,
        sessionsComplete,
        breakTime,
        setSessionsComplete,
    ]);

    useEffect(() => {
        const breakInterval = localBreak
            ? setInterval(
                  () =>
                      setBreakTime(() => {
                          if (breakTime.asSeconds() > 0) {
                              breakTime.subtract(1, "second");
                              return duration(duration(breakTime));
                          } else {
                              setLocalBreak(false);
                              return breakTime;
                          }
                      }),
                  1
              )
            : null;
        if (!localBreak) {
            clearInterval(breakInterval);
        }
        return () => clearInterval(breakInterval);
    }, [breakTime, localBreak]);

    return (
        <div className="timer">
            <TimerDisplays time={sessionTime} />
            <TimerDisplays time={breakTime} />

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

                <Button
                    onClick={() => setLocalBreak(!localBreak)}
                    variant={
                        breakTime.asSeconds() > 0 ? "contained" : "outlined"
                    }
                    disabled={sessionInProgress || breakTime.asSeconds() === 0}
                >
                    {!breakInProgress && breakTime.asSeconds() > 0
                        ? "Take Break"
                        : "End Break"}
                </Button>
            </ButtonGroup>
        </div>
    );
};

const mapStateToProps = state => ({
    projects: selectProjects(state),
    sessionInProgress: selectSessionInProgress(state),
    sessionsComplete: selectSessionsComplete(state),
    breakInProgress: selectBreakInProgress(state),
});

const mapDispatchToProps = dispatch => ({
    setBreakInProgress: value => dispatch(setBreakInProgress(value)),
    setSessionInProgress: value => dispatch(setSessionInProgress(value)),
    setSessionsComplete: value => dispatch(setSessionsComplete(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTimer);
