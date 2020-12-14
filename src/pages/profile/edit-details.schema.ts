import * as Yup from "yup";

import { FieldType } from "components/atoms/formik-form/types";

export const EditDetailsSchema = Yup.object().shape({
    userName: Yup.string().min(2, "Too short"),
    email: Yup.string().lowercase().email("Must be a valid email"),
});

export const EditDetailsInitialValues = {
    userName: "",
    email: "",
};

export const EditDetailsFields: FieldType[] = [
    {
        label: "Username",
        name: "userName",
        type: "text",
        xs: 12,
        sm: 12,
    },
    {
        label: "Email",
        name: "email",
        type: "email",
        xs: 12,
        sm: 12,
    },
];
