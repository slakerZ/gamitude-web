import { TimerTypes } from "configs/constants";
import { Form, Formik } from "formik";

import React, {
    useState,
    useEffect,
    ReactElement,
    useReducer,
    Fragment,
} from "react";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectToken } from "redux/user/user.selectors";

import { postTimer } from "api/timers/timers.api";

import { TabPanel } from "components/atoms/tab-panel/tab-panel.component";

import FormikField from "../../atoms/formik-field/formik-field.component";
import { FieldType } from "../../atoms/formik-form/types";
import { NewTimerVariants } from "./constants";
import {
    StopwatchSchema,
    StopwatchInitialValues,
    StopwatchFields,
    CountdownSimpleSchema,
    CountdownSimpleInitialValues,
    CountdownSimpleFields,
    CountdownComplexSchema,
    CountdownComplexInitialValues,
    CountdownComplexFields,
    NewTimerFormikInfo,
} from "./new-timer-dialog.schema";
import useCustomDialogStyles from "./styles";
import {
    NewTimerDialogPropTypes,
    NewTimerVariantTypes,
    FormikInfoType,
    FormikInfoActionType,
} from "./types";

const NewTimerDialog = ({
    open,
    setOpen,
    getMethodsList,
    token,
    setSnackbarState,
}: NewTimerDialogPropTypes): ReactElement => {
    const classes = useCustomDialogStyles();

    // useReducer
    const formikInfoReducer = (
        state: FormikInfoType,
        action: FormikInfoActionType,
    ) => {
        switch (action.type) {
            case NewTimerVariants.STOPWATCH:
                return {
                    ...state,
                    name: NewTimerVariants.STOPWATCH,
                    validationSchema: StopwatchSchema,
                    initialValues: StopwatchInitialValues,
                    formFields: StopwatchFields,
                };
            case NewTimerVariants.COUNTDOWN_STATIC:
                return {
                    ...state,
                    name: NewTimerVariants.COUNTDOWN_STATIC,
                    validationSchema: CountdownSimpleSchema,
                    initialValues: CountdownSimpleInitialValues,
                    formFields: CountdownSimpleFields,
                };
            case NewTimerVariants.COUNTDOWN_DYNAMIC:
                return {
                    ...state,
                    name: NewTimerVariants.COUNTDOWN_DYNAMIC,
                    validationSchema: CountdownComplexSchema,
                    initialValues: CountdownComplexInitialValues,
                    formFields: CountdownComplexFields,
                };
            default:
                return state;
        }
    };

    const [formikInfo, dispatchFormikInfo] = useReducer(formikInfoReducer, {
        name: NewTimerVariants.COUNTDOWN_STATIC,
        validationSchema: CountdownSimpleSchema,
        initialValues: CountdownSimpleInitialValues,
        formFields: CountdownSimpleFields,
    });

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
            console.log(values);

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
        dispatchFormikInfo({ type: newValue });
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
            PaperProps={{ className: classes.rootPaper }}
            onClose={handleCancel}
        >
            <DialogTitle>{"Create new timer"}</DialogTitle>
            <DialogContent>
                <Tabs
                    value={currentVariant}
                    onChange={handleTimerVariantChange}
                    aria-label="available timer variants"
                >
                    <Tab
                        label={"Simple Countdown"}
                        value={NewTimerVariants.COUNTDOWN_STATIC}
                    />
                    <Tab
                        label={"Complex Countdown"}
                        value={NewTimerVariants.COUNTDOWN_DYNAMIC}
                    />
                    <Tab
                        label={"Stopwatch"}
                        value={NewTimerVariants.STOPWATCH}
                    />
                </Tabs>
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
                                    {({ dirty, isValid, submitForm }) => {
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
                                                                    key={index}
                                                                    label={
                                                                        label
                                                                    }
                                                                    name={name}
                                                                    type={type}
                                                                />
                                                            );
                                                        },
                                                    )}
                                                </Form>

                                                <DialogActions>
                                                    <Button
                                                        variant={"outlined"}
                                                        onClick={submitForm}
                                                        disabled={
                                                            !dirty || !isValid
                                                        }
                                                    >
                                                        {"SUBMIT"}
                                                    </Button>
                                                    <Button
                                                        variant={"outlined"}
                                                        onClick={handleCancel}
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
            </DialogContent>
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
