export const signInUrl =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5020/api/auth/Authorization/Login"
        : "https://gamitude.rocks/api/auth/Authorization/Login";

export const signInRequestBody = (values: any) => ({
    Email: values.email,
    Password: values.password,
});
