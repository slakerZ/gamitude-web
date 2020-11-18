import axios from "axios";

import { API_ENDPOINT } from "api/constants";

import { TimerRequestBodyType, TimerResponseBodyType } from "./types";

const ENDPOINT = `${API_ENDPOINT}/timers`;

export const getTimers = async (
    token: string,
): Promise<TimerResponseBodyType> => {
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

export const postTimer = async (
    token: string,
    requestBody: TimerRequestBodyType,
): Promise<TimerResponseBodyType> => {
    const url = `${ENDPOINT}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(url, requestBody, config);
    const result = await response.data;
    return result;
};

export const getTimerById = async (
    token: string,
    timerId: string,
): Promise<TimerResponseBodyType> => {
    const url = `${ENDPOINT}/${timerId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const putTimerById = async (
    token: string,
    timerId: string,
    requestBody: TimerRequestBodyType,
): Promise<TimerResponseBodyType> => {
    const url = `${ENDPOINT}/${timerId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(url, requestBody, config);
    const result = await response.data;
    return result;
};

export const deleteTimerById = async (
    token: string,
    timerId: string,
): Promise<TimerResponseBodyType> => {
    const url = `${ENDPOINT}/${timerId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(url, config);
    const result = await response.data;
    return result;
};
