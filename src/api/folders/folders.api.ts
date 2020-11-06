import { API_ENDPOINT } from "api/constants";
import axios from "axios";
import { FolderResponseBodyType, FolderRequestBodyType } from "./types";

const ENDPOINT = `${API_ENDPOINT}/folders`;

export const getFolders = async (
    token: string,
): Promise<FolderResponseBodyType> => {
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

export const postFolder = async (
    token: string,
    requestBody: FolderRequestBodyType,
): Promise<FolderResponseBodyType> => {
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

export const getFolderById = async (
    token: string,
    folderId: string,
): Promise<FolderResponseBodyType> => {
    const url = `${ENDPOINT}/${folderId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const putFolderById = async (
    token: string,
    requestBody: FolderRequestBodyType,
    folderId: string,
): Promise<FolderResponseBodyType> => {
    const url = `${ENDPOINT}/${folderId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(url, requestBody, config);
    const result = await response.data;
    return result;
};

export const deleteFolderById = async (token: string, folderId: string) => {
    const url = `${ENDPOINT}/${folderId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(url, config);
    const result = await response.data;
    return result;
};
