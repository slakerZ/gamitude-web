import axios from "axios";

export const getProjectUsage = (
    apiEndpoint = "https://gamitude-projects.herokuapp.com",
    headerConfig
) => async id => {
    try {
        const requestConfig = {
            responseType: "json",
            ...headerConfig,
        };
        const { data } = await axios.get(
            `${apiEndpoint}/projectUsage/${id}`,
            requestConfig
        );
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error getting profile: ${JSON.stringify(e)}`);
        return null;
    }
};

export const getProjectUsageByProjectId = (
    apiEndpoint = "https://gamitude-projects.herokuapp.com",
    headerConfig
) => async projectId => {
    try {
        const requestConfig = {
            responseType: "json",
            ...headerConfig,
        };
        const { data } = await axios.get(
            `${apiEndpoint}/projects/project/${projectId}`,
            requestConfig
        );
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error getting projectUsage: ${JSON.stringify(e)}`);
        return null;
    }
};
