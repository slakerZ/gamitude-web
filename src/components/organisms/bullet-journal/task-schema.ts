import * as Yup from "yup";

import { FieldType } from "components/atoms/formik-form/types";

export const TaskSchema = Yup.object().shape({
    taskname: Yup.string()
        .min(2, "Too Short")
        .required("This field is required"),
    description: Yup.string().required("This field is required"),
    due: Yup.string().required("This field is required"),
    associatedproject: Yup.string().required("This field is required"),
});

export const taskInitialValues = {
    taskname: "",
    description: "",
    due: "",
    associatedproject: "",
};

export const taskFields: FieldType[] = [
    {
        label: "Task Name",
        name: "taskname",
        type: "text",
        xs: 12,
        sm: 12,
    },

    {
        label: "Description",
        name: "description",
        type: "text",
        xs: 12,
        sm: 12,
    },
    {
        label: "Due",
        name: "due",
        type: "date",
        xs: 12,
        sm: 12,
    },
    {
        label: "Associated project",
        name: "associatedproject",
        type: "select",
        xs: 12,
        sm: 12,
    },
];
