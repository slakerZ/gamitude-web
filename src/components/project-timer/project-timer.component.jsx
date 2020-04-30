import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useAsyncFn, useUpdateEffect } from "react-use";
// API
import { url, headers, request_body } from "./project-timer.api";
// Moment
import { duration } from "moment/moment";
// Selectors
import { selectSessionsComplete } from "../../redux/session/session.selectors";
import { selectProjects } from "../../redux/projects/projects.selectors";
import { selectToken } from "../../redux/user/user.selectors";
// Actions
import { setSessionsComplete } from "../../redux/session/session.actions";
// Components
import TimerDisplays from "../timer-displays/timer-displays.component.jsx";
import Uifx from "../uifx/uifx.component.jsx";
import ProjectTimerControls from "../project-timer-controls/project-timer-controls.component.jsx";

const ProjectTimer = ({
    index,
    projects,
    sessionsComplete,
    setSessionsComplete,
    token,
}) => {
    const method = projects[index].method;

    const [sessionTime, setSessionTime] = useState(duration(method, "minutes"));
    const [localSession, setLocalSession] = useState(false);

    const [state, submit] = useAsyncFn(async () => {
        const { id, boosted, dominant } = projects[index];
        const response = await axios.post(
            url,
            headers(token),
            request_body(id, method, boosted, dominant)
        );
        const result = await response.data;
        return result;
    }, [url]);

    // Listern for method change
    useEffect(() => {
        setSessionTime(duration(method, "minutes"));
    }, [method]);

    // Session completed successfully
    useUpdateEffect(() => {
        if (sessionTime.asSeconds() === 0) {
            // Update sessions count
            setSessionsComplete(sessionsComplete + 1);
            // Reset timer
            setSessionTime(duration(method, "minutes"));
            // Stop timer
            setLocalSession(false);

            // Sync with api
            submit();
        }
    }, [sessionTime]);

    // TODO: Abstract hooks into custom ones then extract hooks into separate files
    useEffect(() => {
        const interval = localSession
            ? setInterval(
                  () =>
                      setSessionTime(() => {
                          if (sessionTime.asSeconds() > 0) {
                              sessionTime.subtract(1, "second");
                              return duration(duration(sessionTime));
                          } else {
                              return sessionTime;
                          }
                      }),
                  process.env.NODE_ENV === "development" ? 1 : 1000
              )
            : null;
        if (!localSession) {
            // Give up has been clicked
            const sessionContinues = sessionTime.asSeconds() > 0;
            const methodSessionTimesDiffer =
                duration(method, "minutes").asSeconds() !==
                sessionTime.asSeconds();
            if (sessionContinues && methodSessionTimesDiffer) {
                // ResetTimer
                setSessionTime(duration(duration(method, "minutes")));
            }
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [localSession, method, sessionTime, setSessionsComplete, submit]);

    return (
        <div className="timer">
            <Uifx sessionTime={sessionTime} />
            <TimerDisplays time={sessionTime} />
            <div>{state.error ? state.error.message : null}</div>
            <ProjectTimerControls
                localSession={localSession}
                setLocalSession={setLocalSession}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    sessionsComplete: selectSessionsComplete(state),
    projects: selectProjects(state),
    token: selectToken(state),
});

const mapDispatchToProps = dispatch => ({
    setSessionsComplete: value => dispatch(setSessionsComplete(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTimer);
