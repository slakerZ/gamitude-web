import {
    SignUpRequestBodyType,
    SignInRequestBodyType,
    SignUpValuesType,
    SignInValuesType,
} from "./types";
import { DEV_ENDPOINT, PROD_ENDPOINT } from "../constants";

// Url
export const signInUrl =
    process.env.NODE_ENV === "development"
        ? `${DEV_ENDPOINT}/auth/Authorization/Login`
        : `${PROD_ENDPOINT}/auth/Authorization/Login`;
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
