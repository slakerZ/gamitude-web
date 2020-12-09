import clsx from "clsx";
import { TimerTypes } from "configs/constants";
import { Form, Formik } from "formik";

import React, { useState, useEffect, ReactElement, Fragment } from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import { Grid, Slide } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import { postTimer } from "api/timers/timers.api";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import {
    TabPanel,
    a11yProps,
} from "components/atoms/tab-panel/tab-panel.component";

import FormikField from "../../atoms/formik-field/formik-field.component";
import { FieldType } from "../../atoms/formik-form/types";
import { NewTimerVariants } from "./constants";
import { NewTimerFormikInfo } from "./new-timer-dialog.schema";
import useCustomDialogStyles from "./styles";
import {
    NewTimerDialogPropTypes,
    NewTimerVariantTypes,
    FormikInfoType,
} from "./types";

const NewTimerDialog = ({
    open,
    setOpen,
    getMethodsList,
    token,
    setSnackbarState,
}: NewTimerDialogPropTypes): ReactElement => {
    const classes = useCustomDialogStyles();

    // useState
    const [currentVariant, setCurrentVariant] = useState(
        NewTimerVariants.COUNTDOWN_STATIC,
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
                    : currentVariant === NewTimerVariants.COUNTDOWN_STATIC
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
                    : currentVariant === NewTimerVariants.COUNTDOWN_DYNAMIC
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
            getMethodsList();
            return response;
        },
        [currentVariant],
    );

    // handlers
    const handleCancel = () => {
        setOpen(false);
    };

    const handleTimerVariantChange = (
        e: any,
        newValue: NewTimerVariantTypes,
    ) => {
        setCurrentVariant(newValue);
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
                {"Create new timer"}
            </DialogTitle>
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
                            value={NewTimerVariants.COUNTDOWN_STATIC}
                            wrapped
                            icon={
                                <CustomIcon
                                    variant={"countdown"}
                                    size="small"
                                />
                            }
                            {...a11yProps(
                                NewTimerVariants.COUNTDOWN_STATIC,
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
                            value={NewTimerVariants.COUNTDOWN_DYNAMIC}
                            wrapped
                            icon={
                                <CustomIcon
                                    variant={"countdown"}
                                    size="small"
                                />
                            }
                            {...a11yProps(
                                NewTimerVariants.COUNTDOWN_DYNAMIC,
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
                                            validationSchema={validationSchema}
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
        </Dialog>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTimerDialog);
