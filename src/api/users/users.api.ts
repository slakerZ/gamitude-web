import { DEV_ENDPOINT, PROD_ENDPOINT } from "api/constants";
import { postRegisterRequestBodyType } from "./types";
import axios from "axios";

export const getUsers = async (): Promise<any> => {
    const url =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/users`
            : `${PROD_ENDPOINT}/users`;

    const response = await axios.get(url);
    const result = await response.data.data;
    return result;
};

export const postRegister = async (
    requestBody: postRegisterRequestBodyType,
): Promise<any> => {
    const url =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/users`
            : `${PROD_ENDPOINT}/users`;

    const response = await axios.post(url, requestBody);
    const result = await response.data;
    return result;
};

export const putUsers = async (): Promise<any> => {
    const url =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/users`
            : `${PROD_ENDPOINT}/users`;

    const response = await axios.put(url);
    const result = await response.data.data;
    return result;
};

export const getUserById = async (): Promise<any> => {
    const url =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/users`
            : `${PROD_ENDPOINT}/users`;

    const response = await axios.get(url);
    const result = await response.data.data;
    return result;
};

export const deleteUserById = async (): Promise<any> => {
    const postLoginUrl =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/authorization/login`
            : `${PROD_ENDPOINT}/authorization/login`;

    const response = await axios.get(postLoginUrl);
    const result = await response.data.data;
    return result;
};

export const changeUserPassword = async (): Promise<any> => {
    const postLoginUrl =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/authorization/login`
            : `${PROD_ENDPOINT}/authorization/login`;

    const response = await axios.get(postLoginUrl);
    const result = await response.data.data;
    return result;
};
