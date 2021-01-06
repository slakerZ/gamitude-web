import clsx from "clsx";
import { TimerTypes } from "configs/constants";
import { Form, Formik } from "formik";

import React, {
    useState,
    useEffect,
    ReactElement,
    Fragment,
    useReducer,
} from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";

import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectTimers } from "redux/timers/timers.selectors";
import { selectToken } from "redux/user/user.selectors";

import {
    deleteTimerById,
    postTimer,
    putTimerById,
} from "api/timers/timers.api";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import FormikField from "components/atoms/formik-field/formik-field.component";
import FormikForm from "components/atoms/formik-form/formik-form.component";
import { FieldType } from "components/atoms/formik-form/types";
import {
    TabPanel,
    a11yProps,
} from "components/atoms/tab-panel/tab-panel.component";

import {
    NewTimerVariants,
    TimerSettingsNavTabs,
    CHANGE_INIT_VALUES,
} from "./constants";
import useCustomDialogStyles from "./styles";
import {
    CountdownComplexFields,
    CountdownComplexSchema,
    CountdownSimpleFields,
    CountdownSimpleSchema,
    NewTimerFormikInfo,
    StopwatchFields,
    StopwatchSchema,
} from "./timer-settings-dialog.schema";
import { TimerSettingsDialogPropTypes, FormikInfoType } from "./types";

const TimerSettingsDialog = ({
    open,
    setOpen,
    getTimersList,
    token,
    setSnackbarState,
    timers,
}: TimerSettingsDialogPropTypes): ReactElement => {
    const classes = useCustomDialogStyles();

    // useState
    const [currentVariant, setCurrentVariant] = useState(
        NewTimerVariants.SIMPLE_COUNTDOWN,
    );
    const [currentNavTab, setCurrentNavTab] = useState(
        TimerSettingsNavTabs.NEW_TIMER,
    );
    const [currentEditedTimerId, setCurrentEditedTimerId] = useState(
        timers[0] ? timers[0].id : false,
    );
    const [editedTimerVariant, setEditedTimerVariant] = useState(
        NewTimerVariants.SIMPLE_COUNTDOWN,
    );

    // useAsyncFn
    const [postNewTimerState, postNewTimer] = useAsyncFn(
        async (values, { resetForm }) => {
            const requestBody =
                currentVariant === NewTimerVariants.STOPWATCH
                    ? {
                          ...values,
                          timerType: TimerTypes.STOPWATCH,
                          countDownInfo: null,
                      }
                    : currentVariant === NewTimerVariants.SIMPLE_COUNTDOWN
                    ? {
                          name: values.name,
                          label: values.label,
                          timerType: TimerTypes.TIMER,
                          countDownInfo: {
                              workTime: values.workTime,
                              breakTime: values.breakTime,
                              overTime: values.overTime,
                              longerBreakTime: null,
                              breakInterval: null,
                          },
                      }
                    : currentVariant === NewTimerVariants.COMPLEX_COUNTDOWN
                    ? {
                          name: values.name,
                          label: values.label,
                          timerType: TimerTypes.TIMER,
                          countDownInfo: {
                              workTime: values.workTime,
                              breakTime: values.breakTime,
                              overTime: values.overTime,
                              longerBreakTime: values.longerBreakTime,
                              breakInterval: values.breakInterval,
                          },
                      }
                    : { ...values };

            const response = await postTimer(token, requestBody);
            setOpen(false);
            resetForm();
            getTimersList();
            return response;
        },
        [currentVariant],
    );

    const [editTimerState, editTimer] = useAsyncFn(
        async (values, { resetForm }) => {
            const requestBody =
                currentVariant === NewTimerVariants.STOPWATCH
                    ? {
                          ...values,
                          timerType: TimerTypes.STOPWATCH,
                          countDownInfo: null,
                      }
                    : currentVariant === NewTimerVariants.SIMPLE_COUNTDOWN
                    ? {
                          name: values.name,
                          label: values.label,
                          timerType: TimerTypes.TIMER,
                          countDownInfo: {
                              workTime: values.workTime,
                              breakTime: values.breakTime,
                              overTime: values.overTime,
                              longerBreakTime: null,
                              breakInterval: null,
                          },
                      }
                    : currentVariant === NewTimerVariants.COMPLEX_COUNTDOWN
                    ? {
                          name: values.name,
                          label: values.label,
                          timerType: TimerTypes.TIMER,
                          countDownInfo: {
                              workTime: values.workTime,
                              breakTime: values.breakTime,
                              overTime: values.overTime,
                              longerBreakTime: values.longerBreakTime,
                              breakInterval: values.breakInterval,
                          },
                      }
                    : { ...values };
            const response = await putTimerById(
                token,
                currentEditedTimerId as string,
                requestBody,
            );
            setOpen(false);
            resetForm();
            getTimersList();
            return response;
        },
        [currentVariant],
    );

    const [deleteTimerState, deleteTimer] = useAsyncFn(async () => {
        setCurrentEditedTimerId(false);
        const response = await deleteTimerById(
            token,
            currentEditedTimerId as string,
        );
        setSnackbarState({
            message: "Successfully deleted timer",
            open: true,
            severity: "success",
            autoHideDuration: 3000,
        });
        getTimersList();
        return response;
    });

    //useReducer
    const currentFormikInfoReducer = (state: any, action: any) => {
        switch (action.type) {
            case NewTimerVariants.STOPWATCH:
                return {
                    ...state,
                    validationSchema: StopwatchSchema,
                    fields: StopwatchFields,
                };
            case NewTimerVariants.SIMPLE_COUNTDOWN:
                return {
                    ...state,
                    validationSchema: CountdownSimpleSchema,
                    fields: CountdownSimpleFields,
                };
            case NewTimerVariants.COMPLEX_COUNTDOWN:
                return {
                    ...state,
                    validationSchema: CountdownComplexSchema,
                    fields: CountdownComplexFields,
                };
            case CHANGE_INIT_VALUES:
                return {
                    ...state,
                    initialValues: action.payload,
                };
            default:
                return state;
        }
    };

    const [currentFormikInfo, dispatchCurrentFormikInfo] = useReducer(
        currentFormikInfoReducer,
        {
            validationSchema: timers[0]
                ? timers[0].timerType === "STOPWATCH"
                    ? StopwatchSchema
                    : timers[0].countDownInfo.breakInterval
                    ? CountdownComplexSchema
                    : CountdownSimpleSchema
                : CountdownSimpleSchema,
            initialValues: timers[0]
                ? {
                      name: timers[0].name,
                      label: timers[0].label,
                      workTime: timers[0].countDownInfo.workTime
                          ? timers[0].countDownInfo.workTime
                          : 0,
                      breakTime: timers[0].countDownInfo.breakTime
                          ? timers[0].countDownInfo.breakTime
                          : 0,
                      overTime: timers[0].countDownInfo.overTime
                          ? timers[0].countDownInfo.overTime
                          : 0,
                      longerBreakTime: timers[0].countDownInfo.longerBreakTime
                          ? timers[0].countDownInfo.longerBreakTime
                          : 0,
                      breakInterval: timers[0].countDownInfo.breakInterval
                          ? timers[0].countDownInfo.breakInterval
                          : 0,
                  }
                : {
                      name: "",
                      label: "",
                      workTime: 0,
                      breakTime: 0,
                      overTime: 0,
                      longerBreakTime: 0,
                      breakInterval: 0,
                  },
            fields: timers[0]
                ? timers[0].timerType === "STOPWATCH"
                    ? StopwatchFields
                    : timers[0].countDownInfo.breakInterval
                    ? CountdownComplexFields
                    : CountdownSimpleFields
                : CountdownSimpleFields,
        },
    );

    // handlers
    const handleCancel = () => {
        setOpen(false);
    };

    const handleNavTabChange = (e: any, newTab: string) => {
        setCurrentNavTab(newTab);
    };

    const handleChangeEditedTimer = (e: any, newTimer: string) => {
        setCurrentEditedTimerId(newTimer);
        const foundTimer = timers.find((timer) => timer.id === newTimer);
        let foundVariant = NewTimerVariants.SIMPLE_COUNTDOWN;
        if (foundTimer) {
            if (foundTimer.timerType === "STOPWATCH") {
                foundVariant = NewTimerVariants.STOPWATCH;
            } else if (!foundTimer.countDownInfo.breakInterval) {
                foundVariant = NewTimerVariants.SIMPLE_COUNTDOWN;
            } else {
                foundVariant = NewTimerVariants.COMPLEX_COUNTDOWN;
            }
        }
        setCurrentVariant(foundVariant);
        setEditedTimerVariant(foundVariant);
        dispatchCurrentFormikInfo({ type: foundVariant });
        dispatchCurrentFormikInfo({
            type: CHANGE_INIT_VALUES,
            payload: {
                name: foundTimer ? foundTimer.name : "",
                label: foundTimer ? foundTimer.label : "",
                workTime:
                    foundTimer && foundTimer.countDownInfo.workTime
                        ? foundTimer.countDownInfo.workTime
                        : 0,
                breakTime:
                    foundTimer && foundTimer.countDownInfo.breakTime
                        ? foundTimer.countDownInfo.breakTime
                        : 0,
                overTime:
                    foundTimer && foundTimer.countDownInfo.overTime
                        ? foundTimer.countDownInfo.overTime
                        : 0,
                longerBreakTime:
                    foundTimer && foundTimer.countDownInfo.longerBreakTime
                        ? foundTimer.countDownInfo.longerBreakTime
                        : 0,
                breakInterval:
                    foundTimer && foundTimer.countDownInfo.breakInterval
                        ? foundTimer.countDownInfo.breakInterval
                        : 0,
            },
        });
    };

    const handleTimerVariantChange = (e: any, newValue: any) => {
        setCurrentVariant(newValue);
    };

    const handleSelectedVariantChange = (
        event: React.ChangeEvent<{ value: unknown }>,
    ) => {
        setCurrentVariant(event.target.value as string);
        setEditedTimerVariant(event.target.value as string);
        dispatchCurrentFormikInfo({
            type: event.target.value as string,
        });
    };

    // useEffect
    useEffect(() => {
        if (postNewTimerState.error) {
            setSnackbarState({
                message: "Failed to create new timer",
                open: true,
                severity: "error",
                autoHideDuration: 3000,
            });
        }
    }, [postNewTimerState, setSnackbarState]);

    useEffect(() => {
        if (editTimerState.error) {
            setSnackbarState({
                message: "Failed to edit timer",
                open: true,
                severity: "error",
                autoHideDuration: 3000,
            });
        }
    }, [editTimerState, setSnackbarState]);

    useEffect(() => {
        if (deleteTimerState.error) {
            setSnackbarState({
                message: "Failed to delete timer",
                open: true,
                severity: "error",
                autoHideDuration: 3000,
            });
        }
    }, [deleteTimerState, setSnackbarState]);

    useEffect(() => {
        if (timers.length === 0) {
            setCurrentNavTab(TimerSettingsNavTabs.NEW_TIMER);
            setCurrentEditedTimerId(false);
        }
    }, [timers]);
    return (
        <Dialog
            className={classes.root}
            open={open}
            PaperProps={{
                className: clsx(classes.rootPaper, classes.fixedHeightPaper),
            }}
            onClose={handleCancel}
            TransitionComponent={Slide}
        >
            <DialogTitle className={classes.newTimerDialogTitle}>
                {"Timers' Settings"}
            </DialogTitle>
            <Tabs
                value={currentNavTab}
                onChange={handleNavTabChange}
                variant="fullWidth"
                className={classes.navTabs}
            >
                <Tab
                    label={"New Timer"}
                    value={TimerSettingsNavTabs.NEW_TIMER}
                />
                <Tab
                    label={"Edit timers"}
                    value={TimerSettingsNavTabs.EDIT_TIMERS}
                    disabled={timers.length <= 0}
                />
            </Tabs>
            <TabPanel
                value={currentNavTab}
                index={TimerSettingsNavTabs.NEW_TIMER}
                id={"newTimer"}
                role={"directory"}
            >
                <Grid container>
                    <Grid item xs={4}>
                        <Tabs
                            selectionFollowsFocus
                            value={currentVariant}
                            onChange={handleTimerVariantChange}
                            aria-label="available timer variants"
                            orientation="vertical"
                            variant={"scrollable"}
                            className={classes.tabs}
                        >
                            <Tab
                                label={"Simple Countdown"}
                                value={NewTimerVariants.SIMPLE_COUNTDOWN}
                                wrapped
                                icon={
                                    <CustomIcon
                                        variant={"countdown"}
                                        size="small"
                                    />
                                }
                                {...a11yProps(
                                    NewTimerVariants.SIMPLE_COUNTDOWN,
                                    "folder-with-projects",
                                )}
                            />
                            <Tab
                                label={"Stopwatch"}
                                value={NewTimerVariants.STOPWATCH}
                                wrapped
                                icon={
                                    <CustomIcon
                                        variant={"stopwatch"}
                                        size="small"
                                    />
                                }
                                {...a11yProps(
                                    NewTimerVariants.STOPWATCH,
                                    "folder-with-projects",
                                )}
                            />
                            <Tab
                                label={"Complex Countdown"}
                                value={NewTimerVariants.COMPLEX_COUNTDOWN}
                                wrapped
                                icon={
                                    <CustomIcon
                                        variant={"countdown"}
                                        size="small"
                                    />
                                }
                                {...a11yProps(
                                    NewTimerVariants.COMPLEX_COUNTDOWN,
                                    "folder-with-projects",
                                )}
                            />
                        </Tabs>
                    </Grid>
                    <Grid item xs={8}>
                        <div className={classes.newTimerDialogForms}>
                            {NewTimerFormikInfo.map(
                                (
                                    {
                                        initialValues,
                                        validationSchema,
                                        formFields,
                                        name,
                                    }: FormikInfoType,
                                    index: number,
                                ) => {
                                    return (
                                        <TabPanel
                                            key={index}
                                            value={currentVariant}
                                            index={name}
                                            role={"directory"}
                                            id={`variant-${index}`}
                                        >
                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={
                                                    validationSchema
                                                }
                                                onSubmit={postNewTimer}
                                            >
                                                {({
                                                    dirty,
                                                    isValid,
                                                    submitForm,
                                                }) => {
                                                    return (
                                                        <Fragment>
                                                            <Form autoComplete="off">
                                                                {formFields.map(
                                                                    (
                                                                        {
                                                                            label,
                                                                            name,
                                                                            type,
                                                                        }: FieldType,
                                                                        index: number,
                                                                    ) => {
                                                                        return (
                                                                            <FormikField
                                                                                key={
                                                                                    index
                                                                                }
                                                                                label={
                                                                                    label
                                                                                }
                                                                                name={
                                                                                    name
                                                                                }
                                                                                type={
                                                                                    type
                                                                                }
                                                                                id={`${name}-${index}`}
                                                                            />
                                                                        );
                                                                    },
                                                                )}
                                                            </Form>

                                                            <DialogActions
                                                                className={
                                                                    classes.actionsInContent
                                                                }
                                                            >
                                                                <Button
                                                                    variant={
                                                                        "contained"
                                                                    }
                                                                    onClick={
                                                                        submitForm
                                                                    }
                                                                    disabled={
                                                                        !dirty ||
                                                                        !isValid
                                                                    }
                                                                >
                                                                    {"SUBMIT"}
                                                                </Button>
                                                                <Button
                                                                    variant={
                                                                        "contained"
                                                                    }
                                                                    onClick={
                                                                        handleCancel
                                                                    }
                                                                >
                                                                    {"CANCEL"}
                                                                </Button>
                                                            </DialogActions>
                                                        </Fragment>
                                                    );
                                                }}
                                            </Formik>
                                        </TabPanel>
                                    );
                                },
                            )}
                        </div>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel
                value={currentNavTab}
                index={TimerSettingsNavTabs.EDIT_TIMERS}
                id={"editTimers"}
                role={"directory"}
            >
                <Grid container>
                    <Grid item xs={4}>
                        <div className={classes.editedTimerSelectContainer}>
                            <Select
                                value={editedTimerVariant}
                                onChange={handleSelectedVariantChange}
                                className={classes.editedTimerSelect}
                            >
                                {Object.keys(NewTimerVariants).map(
                                    (key, index) => {
                                        return (
                                            <MenuItem key={index} value={key}>
                                                {key}
                                            </MenuItem>
                                        );
                                    },
                                )}
                            </Select>
                            <Typography variant="h6" component={"h6"}>
                                {"Select Timer to edit"}
                            </Typography>
                        </div>

                        <Tabs
                            value={currentEditedTimerId}
                            onChange={handleChangeEditedTimer}
                            orientation="vertical"
                            variant={"scrollable"}
                            className={classes.editTimerTabs}
                        >
                            {timers.map(({ id, name }) => {
                                return <Tab key={id} label={name} value={id} />;
                            })}
                        </Tabs>

                        <div className={classes.delButtonWrapper}>
                            <Button
                                onClick={deleteTimer}
                                className={classes.delButton}
                            >
                                <Typography
                                    variant={"h5"}
                                    component={"h5"}
                                    className={classes.delButtonTypo}
                                >
                                    {"Delete Timer"}
                                </Typography>
                            </Button>
                        </div>
                    </Grid>
                    {currentEditedTimerId ? (
                        <Grid item xs={8}>
                            <div className={classes.newTimerDialogForms}>
                                <FormikForm
                                    initialValues={
                                        currentFormikInfo.initialValues
                                    }
                                    schema={currentFormikInfo.validationSchema}
                                    fields={currentFormikInfo.fields}
                                    onSubmit={editTimer}
                                    state={editTimerState}
                                    enableReinitialize={true}
                                />
                            </div>
                        </Grid>
                    ) : (
                        <Grid item xs={8}>
                            <Typography variant={"h2"} component={"h2"}>
                                {"Please select timer to edit"}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </TabPanel>
        </Dialog>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
    timers: selectTimers(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TimerSettingsDialog);
