import axios from "axios";

export const updateProject = (
    apiEndpoint = "https://gamitude-projects.herokuapp.com"
) => async (project, projectId) => {
    try {
        const { data } = await axios.put(
            `${apiEndpoint}/projects/${projectId}`,
            {
                ...project,
            }
        );
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error updating project: ${JSON.stringify(e)}`);
        return null;
    }
};
