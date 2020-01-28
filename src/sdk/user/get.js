import axios from "axios";

export const getByFirebase = (
    apiEndpoint = "https://gamitude-workflow.herokuapp.com",
    headerConfig
) => async firebaseId => {
    try {
        const requestConfig = {
            responseType: "json",
            ...headerConfig,
        };
        const { data } = await axios.get(
            `${apiEndpoint}/workflow/user/${firebaseId}`,
            requestConfig
        );
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error getting profile: ${JSON.stringify(e)}`);
        return null;
    }
};
