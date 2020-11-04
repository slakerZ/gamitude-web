import { DEV_ENDPOINT, PROD_ENDPOINT } from "api/constants";
import {
    postRegisterRequestBodyType,
    postRegisterResponseBodyType,
} from "./types";
import axios from "axios";

export const getUsers = async (): Promise<any> => {
    const offset = 0;
    const limit = 20;
    const query = `?offset=${offset}&limit=${limit}`;

    const url =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/users/${query}`
            : `${PROD_ENDPOINT}/users${query}`;

    const response = await axios.get(url);
    const result = await response.data;
    return result;
};

export const postRegister = async (
    requestBody: postRegisterRequestBodyType,
): Promise<postRegisterResponseBodyType> => {
    const url =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/users`
            : `${PROD_ENDPOINT}/users`;

    const response = await axios.post(url, requestBody);
    const result = await response.data;
    return result;
};

export const putUsers = async (
    token: string,
    newUserInfo: any,
): Promise<any> => {
    const url =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/users`
            : `${PROD_ENDPOINT}/users`;
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
    const url =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/users/${userId}`
            : `${PROD_ENDPOINT}/users/${userId}`;

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
    const url =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/users/${userId}`
            : `${PROD_ENDPOINT}/users/${userId}`;

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
    const url =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/users/password`
            : `${PROD_ENDPOINT}/users/password`;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(url, passwordChangeData, config);
    const result = await response.data;
    return result;
};
