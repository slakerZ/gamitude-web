import * as Yup from "yup";

import { FieldType } from "components/atoms/formik-form/types";

import { passValidation } from "pages/authentication/sign-up-schema";

export const ChangePasswordSchema = Yup.object().shape({
    oldPassword: passValidation,
    newPassword: passValidation,
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("This field is required"),
});

export const ChangePasswordInitialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
};

export const ChangePasswordFields: FieldType[] = [
    {
        label: "Old Password",
        name: "oldPassword",
        type: "password",
        xs: 12,
        sm: 12,
    },
    {
        label: "New Password",
        name: "newPassword",
        type: "password",
        xs: 12,
        sm: 12,
    },
    {
        label: "Confirm New Password",
        name: "confirmNewPassword",
        type: "password",
        xs: 12,
        sm: 12,
    },
];
