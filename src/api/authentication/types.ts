export interface SignUpValuesType {
    username: string;
    email: string;
    password: string;
}

export interface SignInValuesType {
    email: string;
    password: string;
}

export interface SignInRequestBodyType {
    Email: string;
    Password: string;
}

export interface SignUpRequestBodyType {
    Name: string;
    Email: string;
    Password: string;
}
