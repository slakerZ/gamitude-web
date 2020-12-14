import {
    INCLUDE_LOWERCASE_REGEX,
    INCLUDE_UPPERCASE_REGEX,
    INCLUDE_NUMERIC_REGEX,
} from "configs/constants";
import * as Yup from "yup";

import { FieldType } from "components/atoms/formik-form/types";

export const passValidation = Yup.string()
    .matches(INCLUDE_LOWERCASE_REGEX, "Must include lowercase letter")
    .matches(INCLUDE_UPPERCASE_REGEX, "Must include UPPERCASE letter")
    .matches(INCLUDE_NUMERIC_REGEX, "Must include at least 1 number")
    .min(8, "Minimum 8 characters")
    .required("This field is required");

export const SignUpSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, "Too Short")
        .required("This field is required"),
    email: Yup.string()
        .lowercase()
        .email("Must be a valid email")
        .required("This field is required"),
    password: passValidation,
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
