import axios from "axios";
import { API_ENDPOINT } from "api/constants";
import { ProjectLogRequestBodyType, ProjectLogResponseBodyType } from "./types";

const ENDPOINT = `${API_ENDPOINT}/projectlogs`;

export const getProjectLogs = async (
    token: string,
): Promise<ProjectLogResponseBodyType> => {
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

export const postProjectLog = async (
    token: string,
    requestBody: ProjectLogRequestBodyType,
): Promise<ProjectLogResponseBodyType> => {
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

export const getProjectLogById = async (
    token: string,
    projectLogId: string,
): Promise<ProjectLogResponseBodyType> => {
    const url = `${ENDPOINT}/${projectLogId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const putProjectLogById = async (
    token: string,
    projectLogId: string,
    requestBody: ProjectLogRequestBodyType,
): Promise<ProjectLogResponseBodyType> => {
    const url = `${ENDPOINT}/${projectLogId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(url, requestBody, config);
    const result = await response.data;
    return result;
};

export const deleteProjectLogById = async (
    token: string,
    projectLogId: string,
) => {
    const url = `${ENDPOINT}/${projectLogId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(url, config);
    const result = await response.data;
    return result;
};
