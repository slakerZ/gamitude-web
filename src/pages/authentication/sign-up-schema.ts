import * as Yup from "yup";

import { FieldType } from "components/atoms/formik-form/types";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;

export const SignUpSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, "Too Short")
        .required("This field is required"),
    email: Yup.string()
        .lowercase()
        .email("Must be a valid email")
        .required("This field is required"),
    password: Yup.string()
        .matches(lowercaseRegex, "Must include lowercase letter")
        .matches(uppercaseRegex, "Must include UPPERCASE letter")
        .matches(numericRegex, "Must include at least 1 number")
        .min(8, "Minimum 8 characters")
        .required("This field is required"),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("This field is required"),
});

export const signUpInitialValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
};

export const signUpFields: FieldType[] = [
    {
        label: "Username",
        name: "username",
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
    {
        label: "Password",
        name: "password",
        type: "password",
        xs: 12,
        sm: 6,
    },
    {
        label: "Confirm Password",
        name: "passwordConfirm",
        type: "password",
        xs: 12,
        sm: 6,
    },
];
