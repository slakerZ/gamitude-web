export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5020/api/auth/Authorization/Register"
        : "http://gamitude.rocks:31777/api/auth/Authorization/Register";

export const request_body = (values: any) => ({
    Name: values.username,
    Email: values.email,
    Password: values.password,
});
