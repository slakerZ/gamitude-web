import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useAsyncFn, useUpdateEffect } from "react-use";
import useSound from "use-sound";
// API
import { url, headers, request_body } from "../../api/project-timer.api";
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
// UI Core
import Button from "@material-ui/core/Button";
import endSound from "../../assets/sounds/congratulations.mp3";
import minuteSound from "../../assets/sounds/bell.mp3";

const ProjectTimer = ({
    index,
    projects,
    sessionsComplete,
    setSessionsComplete,
    token,
}) => {
    const method = projects[index].method;

    const [sessionTime, setSessionTime] = useState(method * 60000);
    const [localSession, setLocalSession] = useState(false);
    const [totalTime, setTotalTime] = useState(method * 60000);
    const [date, setDate] = useState("");
    const [data, setData] = useState("");

    //zastąpić totaltime na wartość z
    const [state, submit] = useAsyncFn(
        async totalTime => {
            const realTime = totalTime;
            const { id, boosted, dominant } = projects[index];
            const response = await axios.post(
                url,
                request_body(id, realTime, boosted, dominant),
                headers(token)
            );
            const result = await response.data;
            return result;
        },
        [url]
    );

    const [playMin] = useSound(minuteSound, {
        volume: 0.2,
        interrupt: true,
    });

    const [play, { stop }] = useSound(endSound, {
        volume: 0.2,
        interrupt: true,
        onend: () => {
            stop();
        },
    });

    // Listen for method change
    useEffect(() => {
        setSessionTime(method * 60000);
        setTotalTime(method * 60000);
    }, [method]);

    // Session completed successfully
    useUpdateEffect(() => {
        if (sessionTime <= 0) {
            // Update sessions count
            setSessionsComplete(sessionsComplete + 1);
            // Reset timer
            setSessionTime(method * 60000);
            // Stop timer
            setLocalSession(false);
            // Sync with api
            submit(Math.floor(totalTime / 60000));
            // Reset Total time
            setTotalTime(method * 60000);
        }
    }, [sessionTime]);

    useEffect(() => {
        let temporary = new Date();
        temporary = temporary.setMinutes(temporary.getMinutes() + method);
        setDate(temporary);
    }, [localSession]);

    // TODO: Abstract hooks into custom ones then extract hooks into separate files
    // wywalić w setInterval wszystko
    useEffect(() => {
        const interval = localSession
            ? setInterval(
                  () => {
                      setData(new Date().getTime());
                      let distance = date - data;
                      if (distance >= 60000 && distance < 61000) {
                          playMin();
                      }
                      if (distance > 0) {
                          setSessionTime(distance);
                      } else {
                          setSessionTime(method * 60000);
                          clearInterval(interval);
                          setLocalSession(false);
                          //Play end sound
                          play();
                      }
                  },
                  process.env.NODE_ENV === "development" ? 1 : 1000
              )
            : null;
        if (!localSession) {
            // Give up has been clicked
            const sessionContinues = sessionTime > 0;
            const methodSessionTimesDiffer = method * 60000 !== sessionTime;
            if (sessionContinues && methodSessionTimesDiffer) {
                // ResetTimer
                setSessionTime(method * 60000);
            }
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [localSession, method, sessionTime, setSessionsComplete]);

    const addFiveMinutes = () => {
        setData(data.setMinutes(data.getMinutes() + 5));
        setSessionTime(sessionTime + 300000);
        setTotalTime(totalTime + 300000);
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

const mapStateToProps = state => ({
    sessionsComplete: selectSessionsComplete(state),
    projects: selectProjects(state),
    token: selectToken(state),
});

const mapDispatchToProps = dispatch => ({
    setSessionsComplete: value => dispatch(setSessionsComplete(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTimer);
