import * as Yup from "yup";

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

export const initialValues = {
    username: "",

    email: "",
    password: "",
    passwordConfirm: "",
};

export const fields = [
    {
        label: "Username",
        name: "username",
        type: "text",
    },

    {
        label: "Email",
        name: "email",
        type: "email",
    },
    {
        label: "Password",
        name: "password",
        type: "password",
    },
    {
        label: "Confirm Password",
        name: "passwordConfirm",
        type: "password",
    },
];
