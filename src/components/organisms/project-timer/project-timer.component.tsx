import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useAsyncFn, useUpdateEffect } from "react-use";
// API
import { url, headers, request_body } from "../../../api/project-timer.api";
// Moment
import { duration } from "moment/moment";
// Selectors
import {
    selectSessionsComplete,
    selectBreakTime,
} from "../../../redux/session/session.selectors";
import { selectProjects } from "../../../redux/projects/projects.selectors";
import { selectToken } from "../../../redux/user/user.selectors";
// Actions
import {
    setSessionsComplete,
    setBreakTime,
} from "../../../redux/session/session.actions";
// Components
import TimerDisplays from "../../atoms/timer-displays/timer-displays.component";
import Uifx from "../../atoms/uifx/uifx.component";
import ProjectTimerControls from "../../molecules/project-timer-controls/project-timer-controls.component";
// UI Core
import Button from "@material-ui/core/Button";

const ProjectTimer = ({
    index,
    projects,
    sessionsComplete,
    setSessionsComplete,
    token,
    breakTime,
    setBreakTime,
}: {
    index: any;
    projects: any;
    sessionsComplete: any;
    setSessionsComplete: any;
    token: any;
    breakTime: any;
    setBreakTime: any;
}) => {
    const method = projects[index].method;

    const [sessionTime, setSessionTime] = useState(duration(method, "minutes"));
    const [localSession, setLocalSession] = useState(false);
    const [totalTime, setTotalTime] = useState(duration(method, "minutes"));

    const [state, submit] = useAsyncFn(
        async (totalTime: any) => {
            const realTime = totalTime.asMinutes();
            const { id, boosted, dominant } = projects[index];
            const response = await axios.post(
                url,
                request_body(id, realTime, boosted, dominant),
                headers(token),
            );
            const result = await response.data;
            return result;
        },
        [url],
    );

    // Listen for method change
    useEffect(() => {
        setSessionTime(duration(method, "minutes"));
        setTotalTime(duration(method, "minutes"));
    }, [method]);

    // Session completed successfully
    useUpdateEffect(() => {
        if (sessionTime.asSeconds() === 0) {
            // Add to break time
            const toAdd =
                totalTime.asMinutes() === 25
                    ? 5
                    : totalTime.asMinutes() === 90
                    ? 30
                    : totalTime.asMinutes() / 5;
            setBreakTime(duration(breakTime.asMinutes() + toAdd, "minutes"));
            // Update sessions count
            setSessionsComplete(sessionsComplete + 1);
            // Reset timer
            setSessionTime(duration(method, "minutes"));
            // Stop timer
            setLocalSession(false);
            // Sync with api
            submit(totalTime);
            // Reset Total time
            setTotalTime(duration(method, "minutes"));
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
                  process.env.NODE_ENV === "development" ? 1 : 1000,
              )
            : setInterval(() => 0, 0);
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
    }, [localSession, method, sessionTime, setSessionsComplete]);

    const addFiveMinutes = () => {
        setSessionTime(() => {
            sessionTime.add(5, "minutes");
            return duration(sessionTime);
        });
        setTotalTime(() => {
            totalTime.add(5, "minutes");
            return duration(totalTime);
        });
    };

    return (
        <div className="timer">
            <Uifx sessionTime={sessionTime} />
            <TimerDisplays time={sessionTime} />
            {localSession ? <Button onClick={addFiveMinutes}>+5</Button> : null}
            <div>{state.error ? state.error.message : null}</div>
            <ProjectTimerControls
                localSession={localSession}
                setLocalSession={setLocalSession}
            />
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    sessionsComplete: selectSessionsComplete(state),
    projects: selectProjects(state),
    token: selectToken(state),
    breakTime: selectBreakTime(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSessionsComplete: (value: any) => dispatch(setSessionsComplete(value)),
    setBreakTime: (value: any) => dispatch(setBreakTime(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTimer);
