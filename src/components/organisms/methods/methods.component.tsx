import React, { Fragment, useEffect, useState } from "react";
import { useEffectOnce, useAsyncFn } from "react-use";
import { getTimers } from "api/timers/timers.api";
import { connect } from "react-redux";
import { a11yProps } from "../../atoms/tab-panel/tab-panel.component";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TimerIcon from "@material-ui/icons/Timer";
import useMethodsStyles from "./styles";
import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";
import { setSelectedTimer } from "redux/timers/timers.actions";
import { MethodsPropType } from "./types";
import AddAlarm from "@material-ui/icons/AddAlarm";
import { ReduxStateType } from "../../../redux/root.reducer";
import { selectTimers } from "../../../redux/timers/timers.selectors";
import IconButton from "@material-ui/core/IconButton";
import { selectSelectedTimer } from "../../../redux/timers/timers.selectors";
import { selectToken } from "redux/user/user.selectors";
import { setTimers } from "redux/timers/timers.actions";
import {
    editMessage,
    editSeverity,
    setOpen as setSnackbarOpen,
} from "redux/snackbar/snackbar.actions";
import Skeleton from "@material-ui/lab/Skeleton";
import NewTimerDialog from "components/atoms/custom-dialog/new-timer-dialog.component";

const Methods = ({
    methods,
    setSelectedTimer,
    selectedMethod,
    token,
    setTimers,
    setSnackbarMessage,
    setSnackbarOpen,
    setSnackbarSeverity,
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
        setMethod(newValue);
        setSelectedTimer(methods[newValue]);
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
            setSnackbarSeverity("error");
            setSnackbarMessage("Failed to get timers list");
            setSnackbarOpen(true);
        }
    }, [
        getMethodsListState,
        setSnackbarMessage,
        setSnackbarOpen,
        setSnackbarSeverity,
    ]);

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
});

const mapDispatchToProps = (dispatch: any) => ({
    setTimers: (value: any) => dispatch(setTimers(value)),
    setSelectedTimer: (value: number) => dispatch(setSelectedTimer(value)),
    setSnackbarOpen: (value: any) => dispatch(setSnackbarOpen(value)),
    setSnackbarSeverity: (value: any) => dispatch(editSeverity(value)),
    setSnackbarMessage: (value: any) => dispatch(editMessage(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Methods);
