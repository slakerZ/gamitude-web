import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useAsyncFn, useUpdateEffect } from "react-use";
// Selectors
import { selectToken } from "../../redux/user/user.selectors";
import { selectSessionsComplete } from "../../redux/session/session.selectors";
import { selectProjects } from "../../redux/projects/projects.selectors";
import { selectSessionInProgress } from "../../redux/session/session.selectors";
// Actions
import { setSessionsComplete } from "../../redux/session/session.actions";
import { setSessionInProgress } from "../../redux/session/session.actions";
// API
import { url, headers, request_body } from "../../api/project-timer.api";
// UI Core
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Components
import TimerDisplays from "../timer-displays/timer-displays.component.jsx";

const ProjectStopWatch = ({
    index,
    projects,
    token,
    sessionsComplete,
    setSessionsComplete,
    sessionEndSound,
    setSessionInProgress,
}) => {
    const [sessionTime, setSessionTime] = useState(0);
    const [localSession, setLocalSession] = useState(false);
    const [date, setDate] = useState("");

    const [state, submit] = useAsyncFn(
        async totalTime => {
            const { id, boosted, dominant } = projects[index];
            const response = await axios.post(
                url,
                request_body(id, totalTime, boosted, dominant),
                headers(token)
            );
            const result = await response.data;
            return result;
        },
        [url]
    );

    useEffect(() => {
        setDate(new Date().getTime());
    }, [localSession]);

    // TODO: Abstract hooks into custom ones then extract hooks into separate files
    useEffect(() => {
        const interval = localSession
            ? setInterval(
                  () => {
                      const data = new Date().getTime();
                      let distance = data - date;
                      setSessionTime(distance);
                  },
                  process.env.NODE_ENV === "development" ? 1 : 1000
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
        const totalTime = parseInt(Math.floor(sessionTime / 60000), 10);
        // Stop timer
        setLocalSession(false);
        // Reset timer
        setSessionTime(0);
        // Update session count
        setSessionsComplete(sessionsComplete + 1);
        // Play the sound
        sessionEndSound.play();
        // Sync with api
        submit(totalTime);
        //Reset timer
        setSessionTime(0);
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

const mapStateToProps = state => ({
    sessionInProgress: selectSessionInProgress(state),
    token: selectToken(state),
    sessionsComplete: selectSessionsComplete(state),
    projects: selectProjects(state),
    sessionEndSound: state.uifx.projectSounds.sessionEndSound,
});

const mapDispatchToProps = dispatch => ({
    setSessionsComplete: value => dispatch(setSessionsComplete(value)),
    setSessionInProgress: value => dispatch(setSessionInProgress(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStopWatch);
