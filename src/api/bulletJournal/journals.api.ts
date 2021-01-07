import axios from "axios";

import { API_ENDPOINT } from "api/constants";

import { JournalResponseBodyType, JournalRequestBodyType } from "./types";

const ENDPOINT = `${API_ENDPOINT}/journals`;

export const getJournals = async (
    token: string,
): Promise<JournalResponseBodyType> => {
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

export const postJournal = async (
    token: string,
    requestBody: JournalRequestBodyType,
): Promise<JournalResponseBodyType> => {
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

export const getJournalById = async (
    token: string,
    journalId: string,
): Promise<JournalResponseBodyType> => {
    const url = `${ENDPOINT}/${journalId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const putJournalById = async (
    token: string,
    requestBody: JournalRequestBodyType,
    journalId: string,
): Promise<JournalResponseBodyType> => {
    const url = `${ENDPOINT}/${journalId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(url, requestBody, config);
    const result = await response.data;
    return result;
};

export const deleteJournalById = async (
    token: string,
    journalId: string,
): Promise<null> => {
    const url = `${ENDPOINT}/${journalId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(url, config);
    const result = await response.data;
    return result;
};
