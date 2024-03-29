import axios from "axios";

import { API_ENDPOINT } from "api/constants";

import { PageResponseBodyType, PageRequestBodyType } from "./types";

const ENDPOINT = `${API_ENDPOINT}/pages`;

export const getPages = async (
    token: string,
    journalId: string,
): Promise<PageResponseBodyType> => {
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

export const postPage = async (
    token: string,
    requestBody: PageRequestBodyType,
): Promise<PageResponseBodyType> => {
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

export const getPageById = async (
    token: string,
    pageId: string,
): Promise<PageResponseBodyType> => {
    const url = `${ENDPOINT}/${pageId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const putPageById = async (
    token: string,
    requestBody: PageRequestBodyType,
    pageId: string,
): Promise<PageResponseBodyType> => {
    const url = `${ENDPOINT}/${pageId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(url, requestBody, config);
    const result = await response.data;
    return result;
};

export const deletePageById = async (
    token: string,
    pageId: string,
): Promise<null> => {
    const url = `${ENDPOINT}/${pageId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(url, config);
    const result = await response.data;
    return result;
};
