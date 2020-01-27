import axios from "axios";

export const deleteProjectUsage = (
    apiEndpoint = "https://gamitude-projects.herokuapp.com"
) => async id => {
    try {
        const { data } = await axios.delete(
            `${apiEndpoint}/projectUsage/${id}`
        );
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error deleting projectUsage: ${JSON.stringify(e)}`);
        return null;
    }
};

export const deleteProjectUsageByProjectId = (
    apiEndpoint = "https://gamitude-projects.herokuapp.com"
) => async projectId => {
    try {
        const { data } = await axios.delete(
            `${apiEndpoint}/projectUsage/project/${projectId}`
        );
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error deleting projectUsage: ${JSON.stringify(e)}`);
        return null;
    }
};
