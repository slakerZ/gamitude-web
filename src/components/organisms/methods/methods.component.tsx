import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { a11yProps } from "../../atoms/tab-panel/tab-panel.component";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TimerIcon from "@material-ui/icons/Timer";
import useMethodsStyles from "./styles";
import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";
import { setSelectedMethod } from "../../../redux/methods/methods.actions";
import { MethodsPropType } from "./types";
import AddAlarm from "@material-ui/icons/AddAlarm";
import { ReduxStateType } from "../../../redux/root.reducer";
import { selectMethods } from "../../../redux/methods/methods.selectors";
import { setMethods } from "../../../redux/methods/methods.actions";
import IconButton from "@material-ui/core/IconButton";
import CustomDialog from "../../atoms/custom-dialog/custom-dialog.component";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";

const Methods = ({
    methods,
    setSelectedMethod,
    setMethods,
}: MethodsPropType) => {
    const classes = useMethodsStyles();
    const [method, setMethod] = useState(0);
    const [open, setOpen] = useState(false);

    const [label, setLabel] = useState(" ");
    const [name, setName] = useState(" ");
    const [minutes, setMinues] = useState(0);
    const [shortBrake, setShortBrake] = useState(0);
    const [hasLongBreak, setHasLongBreak] = useState(false);
    const [longBreak, setLongBreak] = useState(0);
    const [longBreakInterval, setLongBreakInterval] = useState(0);
    const [type, setType] = useState("TIMER");

    const postMethod = () => {
        setMethods({
            label,
            name,
            minutes,
            shortBrake,
            hasLongBreak,
            longBreak,
            longBreakInterval,
            type,
        });
        setOpen(false);
    };

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
        setMinues(parseInt(e.target.value));
    };

    const handleChangeShortBreak = (e: any) => {
        setShortBrake(parseInt(e.target.value));
    };

    const handleChangeLongBreak = (e: any) => {
        setLongBreak(parseInt(e.target.value));
    };

    const handleChangeLongBreakInterval = (e: any) => {
        setLongBreakInterval(parseInt(e.target.value));
    };

    const handleChangeType = (e: any) => {
        setType(e.target.value);
    };

    const handleChangeHasLongBreak = () => {
        setHasLongBreak(!hasLongBreak);
    };

    const handleMethodChange = (e: any, newValue: any) => {
        setMethod(newValue);
        setSelectedMethod(newValue);
    };

    const handleOpenDialog = (e: any) => {
        setOpen(true);
    };

    useEffect(() => {
        setSelectedMethod(0);
    }, [setSelectedMethod]);

    return (
        <div className={classes.root} aria-label="methods root">
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
            <CustomDialog
                open={open}
                setOpen={setOpen}
                title={"Add new method"}
                onSubmit={postMethod}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Label"
                            fullWidth
                            value={label}
                            onChange={handleChangeLabel}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={handleChangeName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Type"
                            select
                            fullWidth
                            value={type}
                            onChange={handleChangeType}
                        >
                            <MenuItem value={"TIMER"}>{"Timer"}</MenuItem>
                            <MenuItem value={"STOPWATCH"}>
                                {"Stopwatch"}
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            value={minutes}
                            onChange={handleChangeMinutes}
                            label="Minutes"
                            type="number"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Short Break"
                            fullWidth
                            type="number"
                            value={shortBrake}
                            onChange={handleChangeShortBreak}
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
                                value={longBreak}
                                onChange={handleChangeLongBreak}
                            />
                        </Grid>
                    ) : null}
                    {hasLongBreak ? (
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Long Break Interval"
                                fullWidth
                                type="number"
                                value={longBreakInterval}
                                onChange={handleChangeLongBreakInterval}
                            />
                        </Grid>
                    ) : null}
                </Grid>
            </CustomDialog>
        </div>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    methods: selectMethods(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedMethod: (value: number) => dispatch(setSelectedMethod(value)),
    setMethods: (value: any) => dispatch(setMethods(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Methods);
