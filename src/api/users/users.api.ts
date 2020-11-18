import axios from "axios";

import { API_ENDPOINT } from "api/constants";

import { RegisterRequestBodyType, RegisterResponseBodyType } from "./types";

const ENDPOINT = `${API_ENDPOINT}/users`;

export const getUsers = async (
    token: string,
    offset: number,
    limit: number,
): Promise<any> => {
    const query = `?offset=${offset}&limit=${limit}`;

    const url = `${ENDPOINT}/${query}`;
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
): Promise<RegisterResponseBodyType> => {
    const url = `${ENDPOINT}`;
    const response = await axios.post(url, requestBody);
    const result = await response.data;
    return result;
};

export const putUsers = async (
    token: string,
    newUserInfo: any,
): Promise<any> => {
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

export const getUserById = async (
    userId: string,
    token: string,
): Promise<any> => {
    const url = `${ENDPOINT}/${userId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const deleteUserById = async (
    userId: string,
    token: string,
): Promise<any> => {
    const url = `${ENDPOINT}/${userId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(url, config);
    const result = await response.data;
    return result;
};

export const changeUserPassword = async (
    token: string,
    passwordChangeData: any,
): Promise<any> => {
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
