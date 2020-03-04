import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useUpdateEffect } from "react-use";
// UI core
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
// Moment
import { duration } from "moment/moment";
// Selectors
import {
    selectSessionInProgress,
    selectSessionsComplete,
    selectBreakInProgress,
} from "../../redux/session/session.selectors";
import { selectEnergies } from "../../redux/energies/energies.selectors";
import { selectStats } from "../../redux/stats/stats.selectors";
// Components
import TimerDisplays from "../timer-displays/timer-displays.component.jsx";
// Actions
import {
    setBreakInProgress,
    setSessionInProgress,
    setSessionsComplete,
} from "../../redux/session/session.actions";
import { setEnergies } from "../../redux/energies/energies.actions";
import { setStats } from "../../redux/stats/stats.actions";

const ProjectTimer = ({
    method,
    sessionInProgress,
    breakInProgress,
    sessionsComplete,
    setSessionInProgress,
    setSessionsComplete,
    setBreakInProgress,
    minuteLeftSound,
    breakCompleteSound,
    sessionEndSound,
    setEnergies,
    energies,
    setStats,
    stats,
}) => {
    const { body, emotions, mind, soul } = energies;
    const { strength, creativity, intelligence, fluency } = stats;

    const [sessionTime, setSessionTime] = useState(duration(method, "minutes"));
    const [localSession, setLocalSession] = useState(false);

    const [breakTime, setBreakTime] = useState(duration(0, "minutes"));
    const [localBreak, setLocalBreak] = useState(false);

    // Sound Effects Hooks
    useEffect(() => {
        if (breakTime.asSeconds() === 0 && localBreak) {
            breakCompleteSound.play();
        }
    }, [breakTime, localBreak, breakCompleteSound]);

    useEffect(() => {
        if (sessionTime.asSeconds() === 60) {
            minuteLeftSound.play();
        }
    }, [sessionTime, minuteLeftSound]);

    useEffect(() => {
        if (sessionTime.asSeconds() === 0) {
            sessionEndSound.play();
        }
    }, [sessionTime, sessionEndSound]);
    // Session Management
    useEffect(() => {
        setSessionTime(duration(method, "minutes"));
    }, [method]);
    // Break/Session in progress
    useUpdateEffect(() => {
        setSessionInProgress(localSession);
    }, [localSession]);

    useUpdateEffect(() => {
        setBreakInProgress(localBreak);
    }, [localBreak]);
    // TODO: Abstract hooks into custom ones then extract hooks into separate files
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

                              //Update Energies
                              setEnergies({
                                  body: body - 5,
                                  emotions: emotions - 10,
                                  mind: mind - 15,
                                  soul: soul - 5,
                              });

                              // Update Stats
                              setStats({
                                  strength: strength + 0,
                                  creativity: creativity + 5,
                                  intelligence: intelligence + 10,
                                  fluency: fluency + 0,
                              });

                              // Update sessions count
                              const newCount = sessionsComplete + 1;
                              setSessionsComplete(newCount);

                              // Reset timer
                              setSessionTime(duration(method, "minutes"));
                              // Add time to break timer
                              const accumulatedBreak =
                                  breakTime.asMinutes() + handleBreak(method);
                              setBreakTime(
                                  duration(accumulatedBreak, "minutes")
                              );
                              return sessionTime;
                          }
                      }),
                  process.env.NODE_ENV === "development" ? 1 : 1000
              )
            : null;
        if (!localSession) {
            if (
                sessionTime.asSeconds() > 0 &&
                duration(method, "minutes").asSeconds() !==
                    sessionTime.asSeconds()
            ) {
                setSessionTime(duration(duration(method, "minutes")));
            }
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [
        sessionTime,
        localSession,
        method,
        sessionsComplete,
        breakTime,
        setSessionsComplete,
        sessionEndSound,
        minuteLeftSound,
        setEnergies,
        setStats,
        strength,
        creativity,
        intelligence,
        fluency,
        body,
        mind,
        emotions,
        soul,
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
    sessionInProgress: selectSessionInProgress(state),
    sessionsComplete: selectSessionsComplete(state),
    breakInProgress: selectBreakInProgress(state),
    sessionEndSound: state.uifx.projectSounds.sessionEndSound,
    minuteLeftSound: state.uifx.projectSounds.minuteLeftSound,
    breakCompleteSound: state.uifx.projectSounds.breakCompleteSound,
    energies: selectEnergies(state),
    stats: selectStats(state),
});

const mapDispatchToProps = dispatch => ({
    setBreakInProgress: value => dispatch(setBreakInProgress(value)),
    setSessionInProgress: value => dispatch(setSessionInProgress(value)),
    setSessionsComplete: value => dispatch(setSessionsComplete(value)),
    setEnergies: value => dispatch(setEnergies(value)),
    setStats: value => dispatch(setStats(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTimer);
