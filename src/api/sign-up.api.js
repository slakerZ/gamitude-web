export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5020/api/auth/Authorization/Register"
        : "https://gamitude.rocks/api/auth/Authorization/Register";

export const request_body = values => ({
    Name: values.username,
    Email: values.email,
    Password: values.password,
});
