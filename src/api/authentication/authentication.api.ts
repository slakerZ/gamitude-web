import {
    SignUpRequestBodyType,
    SignInRequestBodyType,
    SignUpValuesType,
    SignInValuesType,
} from "./types";

// Url
export const signInUrl =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5020/api/auth/Authorization/Login"
        : "https://gamitude.rocks/api/auth/Authorization/Login";
export const signUpUrl =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5020/api/auth/Authorization/Register"
        : "https://gamitude.rocks/api/auth/Authorization/Register";

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
