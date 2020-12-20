import axios from "axios";

import { API_ENDPOINT } from "api/constants";

import {
    RegisterRequestBodyType,
    OwnDetailsResponseBodyType,
    UserType,
    OwnMoneyResponseBodyType,
    PasswordChangeRequestBodyType,
} from "./types";

const ENDPOINT = `${API_ENDPOINT}/users`;

export const getOwnDetails = async (
    token: string,
): Promise<OwnDetailsResponseBodyType> => {
    const url = `${ENDPOINT}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const postRegister = async (
    requestBody: RegisterRequestBodyType,
): Promise<OwnDetailsResponseBodyType> => {
    const url = `${ENDPOINT}`;

    const response = await axios.post(url, requestBody);
    const result = await response.data;
    return result;
};

export const putOwnDetails = async (
    token: string,
    newUserInfo: Partial<UserType>,
): Promise<OwnDetailsResponseBodyType> => {
    const url = `${ENDPOINT}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(url, newUserInfo, config);
    const result = await response.data;
    return result;
};

export const deleteOwnAccount = async (token: string): Promise<void> => {
    const url = `${ENDPOINT}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(url, config);
    const result = await response.data;
    return result;
};

export const getOwnMoney = async (
    token: string,
): Promise<OwnMoneyResponseBodyType> => {
    const url = `${ENDPOINT}/money`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const verifyOwnEmail = async (
    login: string,
    verifyToken: string,
): Promise<any> => {
    const url = `${ENDPOINT}/verifyemail/${login}/${verifyToken}`;

    const response = await axios.post(url);
    const result = await response.data;
    return result;
};

export const changeOwnPassword = async (
    token: string,
    passwordChangeData: PasswordChangeRequestBodyType,
): Promise<OwnDetailsResponseBodyType> => {
    const url = `${ENDPOINT}/password`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(url, passwordChangeData, config);
    const result = await response.data;
    return result;
};
