import axios from "axios";

export const getById = (
    apiEndpoint = "https://gamitude-ranks.herokuapp.com",
    headerConfig
) => async id => {
    try {
        const requestConfig = {
            responseType: "json",
            ...headerConfig,
        };
        const { data } = await axios.get(
            `${apiEndpoint}/stats/${firebaseId}`,
            requestConfig
        );
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error getting project: ${JSON.stringify(e)}`);
        return null;
    }
};
