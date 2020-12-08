import { TimerTypes } from "gamitude_constants";
import { TimerVariantType } from "types";

import React, { useState, useEffect, ReactElement } from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import { postTimer } from "api/timers/timers.api";

import CustomDialog from "components/atoms/custom-dialog/custom-dialog.component";

import { NewTimerDialogPropTypes } from "./types";

const NewTimerDialog = ({
    open,
    setOpen,
    getMethodsList,
    token,
    setSnackbarState,
}: NewTimerDialogPropTypes): ReactElement => {
    const [label, setLabel] = useState("");
    const [name, setName] = useState("");
    const [workTime, setWorkTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [overTime, setOverTime] = useState(5);
    const [hasLongBreak, setHasLongBreak] = useState(false);
    const [longerBreakTime, setLongerBreakTime] = useState(0);
    const [breakInterval, setBreakInterval] = useState(0);
    const [type, setType] = useState<TimerVariantType>(TimerTypes.TIMER);

    const [postMethodState, postMethod] = useAsyncFn(async () => {
        const newTimer = {
            name: name,
            label: label,
            timerType: type,
            countDownInfo: {
                workTime: workTime,
                breakTime: breakTime,
                overTime: overTime,
                longerBreakTime: longerBreakTime === 0 ? null : longerBreakTime,
                breakInterval: breakInterval === 0 ? null : breakInterval,
            },
        };
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

    useEffect(() => {
        if (postMethodState.error) {
            setSnackbarState({
                message: "Failed to create new timer",
                open: true,
                severity: "error",
                autoHideDuration: 3000,
            });
        }
    }, [postMethodState, setSnackbarState]);

    return (
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
                        <MenuItem value={TimerTypes.TIMER}>
                            {TimerTypes.TIMER}
                        </MenuItem>
                        <MenuItem value={TimerTypes.STOPWATCH}>
                            {TimerTypes.STOPWATCH}
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
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTimerDialog);
