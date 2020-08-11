export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5020/api/auth/Authorization/Login"
        : "https://gamitude.rocks/api/auth/Authorization/Login";

export const request_body = (values: any) => ({
    Email: values.email,
    Password: values.password,
});