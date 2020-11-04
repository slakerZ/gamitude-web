export interface postRegisterRequestBodyType {
    userName: string;
    email: string;
    password: string;
}

export interface postRegisterResponseBodyType {
    data: {
        id: string;
        userName: string;
        email: string;
    };
    success: boolean;
}
