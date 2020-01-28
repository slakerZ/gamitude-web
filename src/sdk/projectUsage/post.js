import axios from "axios";

export const createProjectUsage = (
    apiEndpoint = "https://gamitude-projects.herokuapp.com"
) => async projectUsage => {
    try {
        const { data } = await axios.post(`${apiEndpoint}/projectUsage`, {
            ...projectUsage,
        });
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error creating projectUsage: ${JSON.stringify(e)}`);
        return null;
    }
};
