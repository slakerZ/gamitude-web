import {
    SignUpRequestBodyType,
    SignInRequestBodyType,
    SignUpValuesType,
    SignInValuesType,
} from "./types";

const DEV_ENDPOINT = `${process.env.REACT_APP_DEV_ENDPOINT}:5020/api`;
const PROD_ENDPOINT = process.env.REACT_APP_PRODUCTION_ENDPOINT;

// Url
export const signInUrl =
    process.env.NODE_ENV === "development"
        ? `${DEV_ENDPOINT}/auth/Authorization/Login`
        : `${PROD_ENDPOINT}/api/auth/Authorization/Login`;
export const signUpUrl =
    process.env.NODE_ENV === "development"
        ? `${DEV_ENDPOINT}/auth/Authorization/Register`
        : `${PROD_ENDPOINT}/auth/Authorization/Register`;

// Request Body
export const signInRequestBody = (
    values: SignInValuesType,
): SignInRequestBodyType => ({
    Email: values.email,
    Password: values.password,
});
export const signUpRequestBody = (
    values: SignUpValuesType,
): SignUpRequestBodyType => ({
    Name: values.username,
    Email: values.email,
    Password: values.password,
});
