import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// Hooks
import { useUpdateEffect } from "react-use";
// Actions
import {
    setBreakInProgress,
    setBreakTime,
} from "../../redux/session/session.actions";
// Moment
import { duration } from "moment/moment";
// UI Core
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// Components
import TimerDisplays from "../timer-displays/timer-displays.component.jsx";
// Selectors
import { selectBreakTime } from "../../redux/session/session.selectors";

const ProjectBreakTimer = ({
    breakInProgress,
    sessionInProgress,
    breakCompleteSound,
    reduxBreakTime,
    setReduxBreakTime,
}) => {
    const [breakTime, setBreakTime] = useState(duration(0, "minutes"));
    const [localBreak, setLocalBreak] = useState(false);

    const useStyles = makeStyles(theme => ({
        root: {
            backgroundColor: theme.palette.primary.main,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            position: "sticky",
            top: "calc(100vh - 50px)",
        },
    }));
    const classes = useStyles();

    useEffect(() => {
        setBreakTime(reduxBreakTime);
    }, [reduxBreakTime]);

    useEffect(() => {
        if (breakTime.asSeconds() === 0 && localBreak) {
            breakCompleteSound.play();
        }
    }, [breakTime, localBreak, breakCompleteSound]);

    useUpdateEffect(() => {
        setBreakInProgress(localBreak);
    }, [localBreak]);

    useEffect(() => {
        const breakInterval = localBreak
            ? setInterval(
                  () =>
                      setBreakTime(() => {
                          // break continues
                          if (breakTime.asSeconds() > 0) {
                              breakTime.subtract(1, "second");
                              return duration(duration(breakTime));
                          } else {
                              // break ended sync with redux
                              setLocalBreak(false);
                              setReduxBreakTime(
                                  duration(breakTime.asSeconds(), "seconds")
                              );
                              return breakTime;
                          }
                      }),
                  process.env.NODE_ENV === "development" ? 1 : 1000
              )
            : null;
        if (!localBreak) {
            clearInterval(breakInterval);
        }
        return () => clearInterval(breakInterval);
    }, [breakTime, localBreak, setReduxBreakTime]);

    return (
        <div className={classes.root}>
            <TimerDisplays time={breakTime} />
            <Button
                onClick={() => {
                    // pause break
                    setLocalBreak(!localBreak);
                    // sync with redux
                    setReduxBreakTime(
                        duration(breakTime.asSeconds(), "seconds")
                    );
                }}
                variant={breakTime.asSeconds() > 0 ? "contained" : "outlined"}
                disabled={sessionInProgress || breakTime.asSeconds() === 0}
            >
                {!breakInProgress && breakTime.asSeconds() > 0
                    ? "Take Break"
                    : "End Break"}
            </Button>
        </div>
    );
};

const mapStateToProps = state => ({
    breakInProgress: state.session.breakInProgress,
    sessionInProgress: state.session.sessionInProgress,
    breakCompleteSound: state.uifx.projectSounds.breakCompleteSound,
    reduxBreakTime: selectBreakTime(state),
});

const mapDispatchToProps = dispatch => ({
    setBreakInProgress: value => dispatch(setBreakInProgress(value)),
    setReduxBreakTime: value => dispatch(setBreakTime(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBreakTimer);
