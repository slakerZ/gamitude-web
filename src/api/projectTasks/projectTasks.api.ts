import axios from "axios";

import { API_ENDPOINT } from "api/constants";

import {
    ProjectTaskResponseBodyType,
    ProjectTaskRequestBodyType,
} from "./types";

const ENDPOINT = `${API_ENDPOINT}/projecttasks`;

export const getAllProjectTasks = async (
    token: string,
): Promise<ProjectTaskResponseBodyType> => {
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

export const postProjectTask = async (
    token: string,
    requestBody: ProjectTaskRequestBodyType,
): Promise<ProjectTaskResponseBodyType> => {
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

export const getProjectTasksForPage = async (
    token: string,
    journalId: string,
    pageId: string,
): Promise<ProjectTaskResponseBodyType> => {
    const url = `${ENDPOINT}/journal/${journalId}/page/${pageId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const putProjectTaskById = async (
    token: string,
    requestBody: ProjectTaskRequestBodyType,
    projectTaskId: string,
): Promise<ProjectTaskResponseBodyType> => {
    const url = `${ENDPOINT}/${projectTaskId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(url, requestBody, config);
    const result = await response.data;
    return result;
};

export const deleteProjectTaskById = async (
    token: string,
    projectTaskId: string,
): Promise<null> => {
    const url = `${ENDPOINT}/${projectTaskId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(url, config);
    const result = await response.data;
    return result;
};
