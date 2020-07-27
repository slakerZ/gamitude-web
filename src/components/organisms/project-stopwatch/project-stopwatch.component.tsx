import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useAsyncFn, useUpdateEffect } from "react-use";
// Selectors
import { selectToken } from "../../../redux/user/user.selectors";
import { selectSessionsComplete } from "../../../redux/session/session.selectors";
import { selectProjects } from "../../../redux/projects/projects.selectors";
import { selectSessionInProgress } from "../../../redux/session/session.selectors";
import { selectBreakTime } from "../../../redux/session/session.selectors";
// Actions
import { setSessionsComplete } from "../../../redux/session/session.actions";
import { setSessionInProgress } from "../../../redux/session/session.actions";
import { setBreakTime } from "../../../redux/session/session.actions";
// API
import { url, headers, request_body } from "../../../api/project-timer.api";
// UI Core
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Moment
import { duration } from "moment/moment";
// Components
import TimerDisplays from "../../atoms/timer-displays/timer-displays.component";

const ProjectStopWatch = ({
    index,
    projects,
    token,
    sessionsComplete,
    setSessionsComplete,
    sessionEndSound,
    setSessionInProgress,
    breakTime,
    setBreakTime,
}) => {
    const [sessionTime, setSessionTime] = useState(duration(0, "minutes"));
    const [localSession, setLocalSession] = useState(false);

    const [state, submit] = useAsyncFn(
        async (totalTime) => {
            const { id, boosted, dominant } = projects[index];
            const response = await axios.post(
                url,
                request_body(id, totalTime, boosted, dominant),
                headers(token),
            );
            const result = await response.data;
            return result;
        },
        [url],
    );

    // TODO: Abstract hooks into custom ones then extract hooks into separate files
    useEffect(() => {
        const interval = localSession
            ? setInterval(
                  () =>
                      setSessionTime(() => {
                          sessionTime.add(1, "second");
                          return duration(sessionTime);
                      }),
                  process.env.NODE_ENV === "development" ? 1 : 1000,
              )
            : null;
        return () => {
            clearInterval(interval);
        };
    }, [localSession, sessionTime]);

    // Session in progress
    useUpdateEffect(() => {
        setSessionInProgress(localSession);
    }, [localSession]);

    const onStart = () => {
        setLocalSession(true);
    };

    // Stopwatch stopped
    const onStop = () => {
        const totalTime = parseInt(sessionTime.asMinutes(), 10);
        // Add adequate break time
        setBreakTime(
            duration(
                breakTime.asMinutes() + parseInt(totalTime / 5, 10),
                "minutes",
            ),
        );
        // Stop timer
        setLocalSession(false);
        // Reset timer
        setSessionTime(duration(0, "minutes"));
        // Update session count
        setSessionsComplete(sessionsComplete + 1);
        // Play the sound
        sessionEndSound.play();
        // Sync with api
        submit(totalTime);
    };

    return (
        <div>
            <TimerDisplays time={sessionTime} />
            <div>{state.error ? state.error.message : null}</div>
            {!localSession ? (
                <Button variant="contained" onClick={onStart}>
                    <Typography variant="h6" component="h6">
                        {"Start"}
                    </Typography>
                </Button>
            ) : (
                <Button variant="outlined" onClick={onStop}>
                    <Typography variant="h6" component="h6">
                        {"Stop"}
                    </Typography>
                </Button>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    sessionInProgress: selectSessionInProgress(state),
    token: selectToken(state),
    sessionsComplete: selectSessionsComplete(state),
    projects: selectProjects(state),
    sessionEndSound: state.uifx.projectSounds.sessionEndSound,
    breakTime: selectBreakTime(state),
});

const mapDispatchToProps = (dispatch) => ({
    setSessionsComplete: (value) => dispatch(setSessionsComplete(value)),
    setSessionInProgress: (value) => dispatch(setSessionInProgress(value)),
    setBreakTime: (value) => dispatch(setBreakTime(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStopWatch);
