export interface UserType {
    id: string;
    userName: string;
    email: string;
}

export interface OwnDetailsResponseBodyType {
    data: UserType;
    success: boolean;
}

export interface RegisterRequestBodyType {
    userName: string;
    email: string;
    password: string;
}

export interface OwnMoneyResponseBodyType {
    data: number;
    success: boolean;
}
export interface PasswordChangeRequestBodyType {
    oldPassword: string;
    newPassword: string;
}
