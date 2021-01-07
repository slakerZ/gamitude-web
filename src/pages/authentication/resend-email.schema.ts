import * as Yup from "yup";

export const ResendEmailSchema = Yup.object().shape({
    login: Yup.string().required("Login is required"),
});

export const ResendEmailInitialValues = {
    login: "",
};

export const ResendEmailFields = [
    {
        label: "Username",
        name: "login",
        type: "text",
        xs: 12,
        sm: 12,
    },
];
