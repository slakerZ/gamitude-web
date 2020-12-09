import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useEffectOnce, useAsyncFn } from "react-use";

import IconButton from "@material-ui/core/IconButton";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AddAlarm from "@material-ui/icons/AddAlarm";
import TimerIcon from "@material-ui/icons/Timer";
import Skeleton from "@material-ui/lab/Skeleton";

import { ReduxStateType } from "redux/root.reducer";
import {
    selectIsBreak,
    selectSessionInProgress,
} from "redux/session/session.selectors";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { setSelectedTimer } from "redux/timers/timers.actions";
import { setTimers } from "redux/timers/timers.actions";
import { selectTimers } from "redux/timers/timers.selectors";
import { selectSelectedTimer } from "redux/timers/timers.selectors";
import { selectToken } from "redux/user/user.selectors";

import { getTimers } from "api/timers/timers.api";
import { TimerType } from "api/timers/types";

import { a11yProps } from "components/atoms/tab-panel/tab-panel.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import NewTimerDialog from "components/molecules/custom-dialog/new-timer-dialog.component";

import useMethodsStyles from "./styles";
import { TimersPropType } from "./types";

const Methods = ({
    timers,
    setSelectedTimer,
    selectedTimer,
    token,
    setTimers,
    setSnackbarState,
    sessionInProgress,
    isBreak,
}: TimersPropType) => {
    const classes = useMethodsStyles();

    const defaultSelected =
        timers.indexOf(selectedTimer) !== -1
            ? timers.indexOf(selectedTimer)
            : 0;

    // useState
    const [timerIndex, setTimerIndex] = useState(defaultSelected);
    const [isNewTimerDialogOpen, setIsNewTimerDialogOpen] = useState(false);

    // useAsyncFn
    const [getTimersListState, getTimersList] = useAsyncFn(async () => {
        const response = await getTimers(token);
        const timers = response.data;
        setTimers(timers);
        setSelectedTimer(timers[0]);
        return response;
    });

    // handlers
    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleMethodChange = (e: React.ChangeEvent<{}>, newValue: number) => {
        if (!sessionInProgress && !isBreak) {
            setTimerIndex(newValue);
            setSelectedTimer(timers[newValue]);
        } else if (isBreak) {
            setSnackbarState({
                severity: "info",
                message:
                    "Cannot change selected timer when there's a break available, either complete it or skip it",
                open: true,
                autoHideDuration: 3000,
            });
        } else if (sessionInProgress) {
            setSnackbarState({
                severity: "info",
                message: "Cannot change selected timer during session",
                open: true,
                autoHideDuration: 3000,
            });
        }
    };

    const handleOpenDialog = () => {
        setIsNewTimerDialogOpen(true);
    };

    useEffect(() => {
        const methodIndex = timers.indexOf(selectedTimer);
        if (methodIndex !== -1) {
            setTimerIndex(methodIndex);
        }
    }, [selectedTimer, timers]);

    useEffect(() => {
        if (getTimersListState.error) {
            setSnackbarState({
                severity: "error",
                message: "Failed to get timers list",
                open: true,
                autoHideDuration: 3000,
            });
        }
    }, [getTimersListState, setSnackbarState]);

    useEffectOnce(() => {
        getTimersList();
    });

    return (
        <div className={classes.root} aria-label="timers root">
            {getTimersListState.loading ? (
                <Skeleton
                    variant="rect"
                    animation="wave"
                    className={classes.placeholder}
                />
            ) : (
                <ToggleAbleTooltip target={"timers"} placement="top-start">
                    <div className={classes.container}>
                        <Tabs
                            selectionFollowsFocus
                            aria-label="list of custom timers"
                            value={timerIndex}
                            onChange={handleMethodChange}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            {timers.map(({ label }, index) => {
                                return (
                                    <Tab
                                        className={classes.tab}
                                        key={index}
                                        label={label}
                                        {...a11yProps(index, "custom-timer")}
                                        icon={<TimerIcon />}
                                    />
                                );
                            })}
                        </Tabs>
                        <IconButton
                            aria-label={"add new timer"}
                            className={classes.addMethod}
                            onClick={handleOpenDialog}
                        >
                            <AddAlarm />
                        </IconButton>
                    </div>
                </ToggleAbleTooltip>
            )}
            <NewTimerDialog
                open={isNewTimerDialogOpen}
                setOpen={setIsNewTimerDialogOpen}
                getMethodsList={getTimersList}
            />
        </div>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    timers: selectTimers(state),
    selectedTimer: selectSelectedTimer(state),
    token: selectToken(state),
    sessionInProgress: selectSessionInProgress(state),
    isBreak: selectIsBreak(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setTimers: (value: TimerType[]) => dispatch(setTimers(value)),
    setSelectedTimer: (value: number) => dispatch(setSelectedTimer(value)),
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Methods);
