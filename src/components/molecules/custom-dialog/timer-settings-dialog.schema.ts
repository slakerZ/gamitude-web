import * as Yup from "yup";

import { FieldType } from "components/atoms/formik-form/types";

import { NewTimerVariants } from "./constants";
import { FormikInfoType } from "./types";

// Stopwatch

export const StopwatchSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too short").required("Name is required"),
    label: Yup.string()
        .min(2, "Must be exactly 2 characters long")
        .max(2, "Must be exactly 2 characters long")
        .required("Label is required"),
});

export const StopwatchInitialValues = {
    name: "",
    label: "",
};

export const StopwatchFields: FieldType[] = [
    {
        label: "Name",
        name: "name",
        type: "text",
        xs: 12,
        sm: 12,
    },
    {
        label: "Label",
        name: "label",
        type: "text",
        xs: 12,
        sm: 12,
    },
];

// Countdown Simple
export const CountdownSimpleSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too short").required("Name is required"),
    label: Yup.string()
        .min(2, "Must be exactly 2 characters long")
        .max(2, "Must be exactly 2 characters long")
        .required("Label is required"),
    workTime: Yup.number()
        .integer("Only integers allowed")
        .positive("Must be greater than 0")
        .required("Session time is required"),
    breakTime: Yup.number()
        .integer("Only integers allowed")
        .positive("Must be greater than 0")
        .required("Session time is required"),
    overTime: Yup.number()
        .integer("Only integers allowed")
        .positive("Must be greater than 0")
        .required("Session time is required"),
});

export const CountdownSimpleInitialValues = {
    name: "",
    label: "",
    workTime: 0,
    breakTime: 0,
    overTime: 0,
};

export const CountdownSimpleFields: FieldType[] = [
    {
        label: "Name",
        name: "name",
        type: "text",
        xs: 12,
        sm: 12,
    },
    {
        label: "Label",
        name: "label",
        type: "text",
        xs: 12,
        sm: 12,
    },
    {
        label: "Session length (in minutes)",
        name: "workTime",
        type: "number",
        xs: 12,
        sm: 12,
    },
    {
        label: "Break length (in minutes)",
        name: "breakTime",
        type: "number",
        xs: 12,
        sm: 12,
    },
    {
        label: "Overtime (in minutes)",
        name: "overTime",
        type: "number",
        xs: 12,
        sm: 12,
    },
];

// Countdown Complex

export const CountdownComplexSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too short").required("Name is required"),
    label: Yup.string()
        .min(2, "Must be exactly 2 characters long")
        .max(2, "Must be exactly 2 characters long")
        .required("Label is required"),
    workTime: Yup.number()
        .integer("Only integers allowed")
        .positive("Must be greater than 0")
        .required("Session time is required"),
    breakTime: Yup.number()
        .integer("Only integers allowed")
        .positive("Must be greater than 0")
        .required("Session time is required"),
    overTime: Yup.number()
        .integer("Only integers allowed")
        .positive("Must be greater than 0")
        .required("Session time is required"),
    longerBreakTime: Yup.number()
        .integer("Only integers allowed")
        .positive("Must be greater than 0")
        .required("Session time is required"),
    breakInterval: Yup.number()
        .integer("Only integers allowed")
        .positive("Must be greater than 0")
        .required("Session time is required"),
});

export const CountdownComplexInitialValues = {
    name: "",
    label: "",
    workTime: 0,
    breakTime: 0,
    overTime: 0,
    longerBreakTime: 0,
    breakInterval: 0,
};

export const CountdownComplexFields: FieldType[] = [
    {
        label: "Name",
        name: "name",
        type: "text",
        xs: 12,
        sm: 12,
    },
    {
        label: "Label",
        name: "label",
        type: "text",
        xs: 12,
        sm: 12,
    },
    {
        label: "Session length (in minutes)",
        name: "workTime",
        type: "number",
        xs: 12,
        sm: 12,
    },
    {
        label: "Short break length (in minutes)",
        name: "breakTime",
        type: "number",
        xs: 12,
        sm: 12,
    },
    {
        label: "Overtime (in minutes)",
        name: "overTime",
        type: "number",
        xs: 12,
        sm: 12,
    },
    {
        label: "Long break length (in minutes)",
        name: "longerBreakTime",
        type: "number",
        xs: 12,
        sm: 12,
    },
    {
        label: "Long break interval",
        name: "breakInterval",
        type: "number",
        xs: 12,
        sm: 12,
    },
];

export const NewTimerFormikInfo: FormikInfoType[] = [
    {
        name: NewTimerVariants.COUNTDOWN_STATIC,
        validationSchema: CountdownSimpleSchema,
        initialValues: CountdownSimpleInitialValues,
        formFields: CountdownSimpleFields,
    },
    {
        name: NewTimerVariants.COUNTDOWN_DYNAMIC,
        validationSchema: CountdownComplexSchema,
        initialValues: CountdownComplexInitialValues,
        formFields: CountdownComplexFields,
    },
    {
        name: NewTimerVariants.STOPWATCH,
        validationSchema: StopwatchSchema,
        initialValues: StopwatchInitialValues,
        formFields: StopwatchFields,
    },
];
