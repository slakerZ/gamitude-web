export interface postLoginRequestBodyType {
    login: string;
    password: string;
}

export interface postLoginResponseBodyType {
    data: {
        userId: string;
        token: string;
        user: null | string;
        data_expires: string;
    };
    success: boolean;
}
