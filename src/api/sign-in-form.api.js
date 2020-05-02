export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5020/api/auth/Authorization/Login"
        : "http://gamitude.rocks:31777/api/auth/Authorization/Login";

export const request_body = values => ({
    Email: values.email,
    Password: values.password,
});
