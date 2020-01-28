import axios from "axios";

export const getById = (
    apiEndpoint = "https://gamitude-projects.herokuapp.com",
    headerConfig
) => async id => {
    try {
        const requestConfig = {
            responseType: "json",
            ...headerConfig,
        };
        const { data } = await axios.get(
            `${apiEndpoint}/projects/${id}`,
            requestConfig
        );
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error getting project: ${JSON.stringify(e)}`);
        return null;
    }
};

export const getByFirebaseId = (
    apiEndpoint = "https://gamitude-projects.herokuapp.com",
    headerConfig
) => async firebaseId => {
    try {
        const requestConfig = {
            responseType: "json",
            ...headerConfig,
        };
        const { data } = await axios.get(
            `${apiEndpoint}/projects/user/${firebaseId}`,
            requestConfig
        );
        if (!data) return null; // no user returned
        return data;
    } catch (e) {
        console.error(`Error getting project: ${JSON.stringify(e)}`);
        return null;
    }
};
