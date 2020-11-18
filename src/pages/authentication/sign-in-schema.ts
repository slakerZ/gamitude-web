import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
    login: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
});

export const signInInitialValues = {
    login: "",
    password: "",
};

export const signInFields = [
    {
        label: "Username",
        name: "login",
        type: "text",
        xs: 12,
        sm: 12,
    },
    {
        label: "Password",
        name: "password",
        type: "password",
        xs: 12,
        sm: 12,
    },
];
