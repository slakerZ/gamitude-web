import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// Hooks
import { useUpdateEffect } from "react-use";
// Actions
import {
    setBreakInProgress,
    setBreakTime,
} from "../../../redux/session/session.actions";
// Moment
import { duration } from "moment/moment";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
// Components
import TimerDisplays from "../../atoms/timer-displays/timer-displays.component";
// Selectors
import { selectBreakTime } from "../../../redux/session/session.selectors";
// Tooltip
import BreakTimerTooltip from "../../../tooltips/projects/break-timer.tooltip";

const ProjectBreakTimer = ({
    breakInProgress,
    sessionInProgress,
    breakCompleteSound,
    reduxBreakTime,
    setReduxBreakTime,
}: {
    breakInProgress: any;
    sessionInProgress: any;
    breakCompleteSound: any;
    reduxBreakTime: any;
    setReduxBreakTime: any;
}) => {
    const [breakTime, setBreakTime] = useState(duration(0, "minutes"));
    const [localBreak, setLocalBreak] = useState(false);

    const useStyles = makeStyles((theme) => ({
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
                                  duration(breakTime.asSeconds(), "seconds"),
                              );
                              return breakTime;
                          }
                      }),
                  process.env.NODE_ENV === "development" ? 1 : 1000,
              )
            : setInterval(() => 0, 0);
        if (!localBreak) {
            clearInterval(breakInterval);
        }
        return () => clearInterval(breakInterval);
    }, [breakTime, localBreak, setReduxBreakTime]);

    return (
        <div className={classes.root}>
            <Tooltip placement="top" title={<BreakTimerTooltip />}>
                <div>
                    <TimerDisplays time={breakTime} />
                </div>
            </Tooltip>
            <Button
                onClick={() => {
                    // pause break
                    setLocalBreak(!localBreak);
                    // sync with redux
                    setReduxBreakTime(
                        duration(breakTime.asSeconds(), "seconds"),
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

const mapStateToProps = (state: any) => ({
    breakInProgress: state.session.breakInProgress,
    sessionInProgress: state.session.sessionInProgress,
    breakCompleteSound: state.uifx.projectSounds.breakCompleteSound,
    reduxBreakTime: selectBreakTime(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setBreakInProgress: (value: any) => dispatch(setBreakInProgress(value)),
    setReduxBreakTime: (value: any) => dispatch(setBreakTime(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBreakTimer);
