import * as Yup from "yup";

import { FieldType } from "components/atoms/formik-form/types";

export const ChangeEmailSchema = Yup.object().shape({
    newEmail: Yup.string().lowercase().email("Must be a valid email"),
});

export const ChangeEmailInitialValues = {
    newEmail: "",
};

export const ChangeEmailFields: FieldType[] = [
    {
        label: "New Email",
        name: "newEmail",
        type: "email",
        xs: 12,
        sm: 12,
    },
];
