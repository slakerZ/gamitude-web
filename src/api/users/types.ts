export interface RegisterRequestBodyType {
    userName: string;
    email: string;
    password: string;
}

export interface RegisterResponseBodyType {
    data: {
        id: string;
        userName: string;
        email: string;
    };
    success: boolean;
}
