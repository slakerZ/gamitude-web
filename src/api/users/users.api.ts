import axios from "axios";

import { API_ENDPOINT } from "api/constants";

import {
    RegisterRequestBodyType,
    OwnDetailsResponseBodyType,
    OwnMoneyResponseBodyType,
    PasswordChangeRequestBodyType,
    EmailChangeRequestBodyType,
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

export const postVerifyOwnEmail = async (
    login: string,
    verifyToken: string,
): Promise<any> => {
    const url = `${ENDPOINT}/verifyemail`;
    const requestBody = { login: login, token: verifyToken };

    const response = await axios.post(url, requestBody);
    const result = await response.data;
    return result;
};

export const postVerifyChangedEmail = async (
    login: string,
    verifyToken: string,
    email: string,
): Promise<any> => {
    const url = `${ENDPOINT}/verifyemailnew`;
    const requestBody = { login: login, token: verifyToken, email: email };

    const response = await axios.post(url, requestBody);
    const result = await response.data;
    return result;
};

export const postResendEmailVerification = async (
    login: string,
): Promise<any> => {
    const url = `${ENDPOINT}/verifyemail/resend/${login}`;

    const response = await axios.post(url);
    const result = await response.data;
    return result;
};

export const getCheckIfEmailExists = async (email: string): Promise<any> => {
    const url = `${ENDPOINT}/ifexists/email/${email}`;

    const response = await axios.get(url);
    const result = await response.data;
    return result;
};

export const getCheckIfLoginExists = async (login: string): Promise<any> => {
    const url = `${ENDPOINT}/ifexists/login/${login}`;

    const response = await axios.get(url);
    const result = await response.data;
    return result;
};

export const putChangeOwnPassword = async (
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

export const putChangeOwnEmail = async (
    token: string,
    emailChangeData: EmailChangeRequestBodyType,
): Promise<any> => {
    const url = `${ENDPOINT}/email`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(url, emailChangeData, config);
    const result = await response.data;
    return result;
};
