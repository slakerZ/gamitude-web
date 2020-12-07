import React, { Fragment, useEffect, useState } from "react";
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

import NewTimerDialog from "components/atoms/custom-dialog/new-timer-dialog.component";
import { a11yProps } from "components/atoms/tab-panel/tab-panel.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import useMethodsStyles from "./styles";
import { MethodsPropType } from "./types";

const Methods = ({
    methods,
    setSelectedTimer,
    selectedMethod,
    token,
    setTimers,
    setSnackbarState,
    sessionInProgress,
    isBreak,
}: MethodsPropType) => {
    const classes = useMethodsStyles();
    const defaultSelected =
        methods.indexOf(selectedMethod) !== -1
            ? methods.indexOf(selectedMethod)
            : 0;

    const [method, setMethod] = useState(defaultSelected);
    const [open, setOpen] = useState(false);

    const [getMethodsListState, getMethodsList] = useAsyncFn(async () => {
        const response = await getTimers(token);
        const timers = response.data;
        setTimers(timers);
        setSelectedTimer(timers[0]);
        return response;
    });

    const handleMethodChange = (e: any, newValue: any) => {
        if (!sessionInProgress && !isBreak) {
            setMethod(newValue);
            setSelectedTimer(methods[newValue]);
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

    const handleOpenDialog = (e: any) => {
        setOpen(true);
    };

    useEffectOnce(() => {
        getMethodsList();
    });

    useEffect(() => {
        const methodIndex = methods.indexOf(selectedMethod);
        if (methodIndex !== -1) {
            setMethod(methodIndex);
        }
    }, [selectedMethod]);

    useEffect(() => {
        if (getMethodsListState.error) {
            setSnackbarState({
                severity: "error",
                message: "Failed to get timers list",
                open: true,
                autoHideDuration: 3000,
            });
        }
    }, [getMethodsListState, setSnackbarState]);

    return (
        <div className={classes.root} aria-label="methods root">
            {getMethodsListState.loading ? (
                <Skeleton
                    variant="rect"
                    animation="wave"
                    className={classes.placeholder}
                />
            ) : (
                <Fragment>
                    <Tabs
                        aria-label="list of custom methods"
                        value={method}
                        onChange={handleMethodChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {methods.map(({ label }, index) => {
                            return (
                                <Tab
                                    className={classes.tab}
                                    key={index}
                                    label={label}
                                    {...a11yProps(index, "custom-method")}
                                    icon={<TimerIcon />}
                                />
                            );
                        })}
                    </Tabs>
                    <IconButton
                        aria-label={"add new method"}
                        className={classes.addMethod}
                        onClick={handleOpenDialog}
                    >
                        <ToggleAbleTooltip target={"method"}>
                            <AddAlarm />
                        </ToggleAbleTooltip>
                    </IconButton>
                </Fragment>
            )}
            <NewTimerDialog
                open={open}
                setOpen={setOpen}
                getMethodsList={getMethodsList}
            />
        </div>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    methods: selectTimers(state),
    selectedMethod: selectSelectedTimer(state),
    token: selectToken(state),
    sessionInProgress: selectSessionInProgress(state),
    isBreak: selectIsBreak(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setTimers: (value: any) => dispatch(setTimers(value)),
    setSelectedTimer: (value: number) => dispatch(setSelectedTimer(value)),
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Methods);
