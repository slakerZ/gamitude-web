import React, { Fragment, lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { useEffectOnce, useAsyncFn } from "react-use";

import IconButton from "@material-ui/core/IconButton";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TimerIcon from "@material-ui/icons/Timer";
import Skeleton from "@material-ui/lab/Skeleton";

import { setTimerSettingsDialogOpen } from "redux/dialogs/dialogs.actions";
import { selectIsTimerSettingsDialogOpen } from "redux/dialogs/dialogs.selectors";
import { ReduxStateType } from "redux/root.reducer";
import {
    selectIsBreak,
    selectSessionInProgress,
} from "redux/session/session.selectors";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { setSelectedTimerById } from "redux/timers/timers.actions";
import { setTimers } from "redux/timers/timers.actions";
import { selectTimers } from "redux/timers/timers.selectors";
import { selectSelectedTimer } from "redux/timers/timers.selectors";
import { selectToken } from "redux/user/user.selectors";

import { getTimers } from "api/timers/timers.api";
import { TimerType } from "api/timers/types";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import { a11yProps } from "components/atoms/tab-panel/tab-panel.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import useMethodsStyles from "./styles";
import { TimersPropType } from "./types";

const TimerSettingsDialog = lazy(
    () =>
        import(
            "components/molecules/custom-dialog/timer-settings-dialog.component"
        ),
);

const Methods = ({
    timers,
    setSelectedTimerById,
    selectedTimer,
    token,
    setTimers,
    setSnackbarState,
    sessionInProgress,
    isBreak,
    isTimerSettingsDialogOpen,
    setTimerSettingsDialogOpen,
}: TimersPropType) => {
    const classes = useMethodsStyles();

    // useAsyncFn
    const [getTimersListState, getTimersList] = useAsyncFn(async () => {
        const response = await getTimers(token);
        const timers = response.data;
        setTimers(timers);
        setSelectedTimerById(timers[0].id);
        return response;
    });

    // handlers
    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleMethodChange = (e: React.ChangeEvent<{}>, newValue: string) => {
        if (!sessionInProgress && !isBreak) {
            setSelectedTimerById(newValue);
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
        setTimerSettingsDialogOpen(true);
    };

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
                            value={selectedTimer.id}
                            onChange={handleMethodChange}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            {timers.map(({ label, id }, index) => {
                                return (
                                    <Tab
                                        className={classes.tab}
                                        key={index}
                                        label={label}
                                        {...a11yProps(index, "custom-timer")}
                                        icon={<TimerIcon />}
                                        value={id}
                                    />
                                );
                            })}
                        </Tabs>
                        <IconButton
                            aria-label={"add new timer"}
                            className={classes.addMethod}
                            onClick={handleOpenDialog}
                        >
                            <CustomIcon variant="settings" size="small" />
                        </IconButton>
                    </div>
                </ToggleAbleTooltip>
            )}
            <Suspense fallback={<Fragment />}>
                <TimerSettingsDialog
                    open={isTimerSettingsDialogOpen}
                    setOpen={setTimerSettingsDialogOpen}
                    getTimersList={getTimersList}
                />
            </Suspense>
        </div>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    timers: selectTimers(state),
    selectedTimer: selectSelectedTimer(state),
    token: selectToken(state),
    sessionInProgress: selectSessionInProgress(state),
    isBreak: selectIsBreak(state),
    isTimerSettingsDialogOpen: selectIsTimerSettingsDialogOpen(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setTimers: (value: TimerType[]) => dispatch(setTimers(value)),
    setSelectedTimerById: (value: string) =>
        dispatch(setSelectedTimerById(value)),
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
    setTimerSettingsDialogOpen: (value: boolean) =>
        dispatch(setTimerSettingsDialogOpen(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Methods);
