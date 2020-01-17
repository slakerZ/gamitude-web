import axios from "axios";

export const getByFirebase = (
    apiEndpoint = "https://gamitude-workflow.herokuapp.com",
    headerConfig
) => async firebaseId => {
    try {
        const requestConfig = {
            params: { firebaseId: firebaseId },
            ...headerConfig,
        };
        const { data } = await axios.get(
            `${apiEndpoint}/workflow/user`,
            requestConfig
        );
        if (!data || !data.length) return null; // no user returned
        return data[0];
    } catch (e) {
        console.error(`Error getting profile: ${JSON.stringify(e)}`);
        return null;
    }
};
