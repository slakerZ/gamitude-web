import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .lowercase()
        .email("Must be a valid email")
        .required("This field is required"),
    password: Yup.string().required("This field is required"),
});

export const initialValues = {
    email: "",
    password: "",
};

export const fields = [
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
];