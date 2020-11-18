import axios from "axios";
import { API_ENDPOINT } from "api/constants";
import { ProjectResponseBodyType, ProjectRequestBodyType } from "./types";

const ENDPOINT = `${API_ENDPOINT}/projects`;

export const getProjects = async (
    token: string,
): Promise<ProjectResponseBodyType> => {
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

export const postProject = async (
    token: string,
    requestBody: ProjectRequestBodyType,
): Promise<ProjectResponseBodyType> => {
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

export const getProjectById = async (
    token: string,
    projectId: string,
): Promise<ProjectResponseBodyType> => {
    const url = `${ENDPOINT}/${projectId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const putProjectById = async (
    token: string,
    requestBody: ProjectRequestBodyType,
    projectId: string,
): Promise<ProjectResponseBodyType> => {
    const url = `${ENDPOINT}/${projectId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(url, requestBody, config);
    const result = await response.data;
    return result;
};

export const deleteProjectById = async (token: string, projectId: string) => {
    const url = `${ENDPOINT}/${projectId}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(url, config);
    const result = await response.data;
    return result;
};
