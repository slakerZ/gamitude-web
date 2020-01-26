import axios from "axios";

export const createUser = (
    apiEndpoint = "https://gamitude-workflow.herokuapp.com"
) => async user => {
    try {
        const { data } = await axios.post(`${apiEndpoint}/workflow/user/`, {
            ...user,
        });
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error getting profile: ${JSON.stringify(e)}`);
        return null;
    }
};
