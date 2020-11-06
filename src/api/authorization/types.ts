export interface LoginRequestBodyType {
    login: string;
    password: string;
}

export interface LoginResponseBodyType {
    data: {
        userId: string;
        token: string;
        user: null | string;
        data_expires: string;
    };
    success: boolean;
}
