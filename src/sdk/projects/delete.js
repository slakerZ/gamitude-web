import axios from "axios";

export const deleteProject = (
    apiEndpoint = "https://gamitude-projects.herokuapp.com"
) => async projectId => {
    try {
        const { data } = await axios.delete(
            `${apiEndpoint}/projects/${projectId}`
        );
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error deleting project: ${JSON.stringify(e)}`);
        return null;
    }
};
