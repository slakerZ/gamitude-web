import React, { Fragment, useEffect, useState } from "react";
import { useEffectOnce, useAsyncFn } from "react-use";
import { postTimer, getTimers } from "api/timers/timers.api";
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
import CustomDialog from "../../atoms/custom-dialog/custom-dialog.component";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { selectSelectedTimer } from "../../../redux/timers/timers.selectors";
import { selectToken } from "redux/user/user.selectors";
import { setTimers } from "redux/timers/timers.actions";
import {
    editMessage,
    editSeverity,
    setOpen as setSnackbarOpen,
} from "redux/snackbar/snackbar.actions";
import Skeleton from "@material-ui/lab/Skeleton";

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

    const [label, setLabel] = useState("");
    const [name, setName] = useState("");
    const [workTime, setWorkTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [overTime, setOverTime] = useState(5);
    const [hasLongBreak, setHasLongBreak] = useState(false);
    const [longerBreakTime, setLongerBreakTime] = useState(0);
    const [breakInterval, setBreakInterval] = useState(0);
    const [type, setType] = useState("TIMER");

    const [postMethodState, postMethod] = useAsyncFn(async () => {
        const newTimer = {
            // label,
            workTime: workTime,
            breakTime: breakTime,
            overTime: overTime,
            name: name,
            longerBreakTime: longerBreakTime,
            breakInterval: breakInterval,
            // type,
        };
        console.log(newTimer);
        const response = await postTimer(token, newTimer);
        setOpen(false);
        getMethodsList();
        return response;
    }, [
        label,
        name,
        workTime,
        breakTime,
        longerBreakTime,
        breakInterval,
        type,
        overTime,
    ]);

    const [getMethodsListState, getMethodsList] = useAsyncFn(async () => {
        const response = await getTimers(token);
        const timers = response.data;
        setTimers(timers);
        setSelectedTimer(timers[0]);
        return response;
    });

    const handleChangeLabel = (e: any) => {
        if (e.target.value.length < 3) {
            setLabel(e.target.value);
        }
    };

    const handleChangeName = (e: any) => {
        if (e.target.value.length < 30) {
            setName(e.target.value);
        }
    };

    const handleChangeMinutes = (e: any) => {
        setWorkTime(parseInt(e.target.value));
    };

    const handleChangeShortBreak = (e: any) => {
        setBreakTime(parseInt(e.target.value));
    };

    const handleChangeLongBreak = (e: any) => {
        setLongerBreakTime(parseInt(e.target.value));
    };

    const handleChangeLongBreakInterval = (e: any) => {
        setBreakInterval(parseInt(e.target.value));
    };

    const handleChangeType = (e: any) => {
        setType(e.target.value);
    };

    const handleChangeHasLongBreak = () => {
        setHasLongBreak(!hasLongBreak);
    };

    const handleChangeOvertime = (e: any) => {
        setOverTime(parseInt(e.target.value));
    };

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
        if (postMethodState.error) {
            setSnackbarSeverity("error");
            setSnackbarMessage("Failed to create new timer");
            setSnackbarOpen(true);
        }
    }, [
        postMethodState,
        setSnackbarMessage,
        setSnackbarOpen,
        setSnackbarSeverity,
    ]);

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

            <CustomDialog
                open={open}
                setOpen={setOpen}
                title={"Add new method"}
                onSubmit={postMethod}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Label"
                            fullWidth
                            value={label}
                            onChange={handleChangeLabel}
                            variant={"outlined"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={handleChangeName}
                            variant={"outlined"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Type"
                            select
                            fullWidth
                            value={type}
                            onChange={handleChangeType}
                            variant={"outlined"}
                        >
                            <MenuItem value={"TIMER"}>{"Timer"}</MenuItem>
                            <MenuItem value={"STOPWATCH"}>
                                {"Stopwatch"}
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            value={workTime}
                            onChange={handleChangeMinutes}
                            label="Minutes"
                            type="number"
                            fullWidth
                            variant={"outlined"}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Short Break"
                            fullWidth
                            type="number"
                            value={breakTime}
                            onChange={handleChangeShortBreak}
                            variant={"outlined"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Over Time step"
                            fullWidth
                            type="number"
                            value={overTime}
                            onChange={handleChangeOvertime}
                            variant={"outlined"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="has_long_break"
                                    checked={hasLongBreak}
                                    onChange={handleChangeHasLongBreak}
                                />
                            }
                            label="Has Long Break"
                        />
                    </Grid>
                    {hasLongBreak ? (
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Long Break"
                                fullWidth
                                type="number"
                                value={longerBreakTime}
                                onChange={handleChangeLongBreak}
                                variant={"outlined"}
                            />
                        </Grid>
                    ) : null}
                    {hasLongBreak ? (
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Long Break Interval"
                                fullWidth
                                type="number"
                                value={breakInterval}
                                onChange={handleChangeLongBreakInterval}
                                variant={"outlined"}
                            />
                        </Grid>
                    ) : null}
                </Grid>
            </CustomDialog>
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
