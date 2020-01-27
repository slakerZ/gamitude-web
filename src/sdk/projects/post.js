import axios from "axios";

export const createProject = (
    apiEndpoint = "https://gamitude-projects.herokuapp.com"
) => async project => {
    try {
        const { data } = await axios.post(`${apiEndpoint}/projects`, {
            ...project,
        });
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error creating project: ${JSON.stringify(e)}`);
        return null;
    }
};
