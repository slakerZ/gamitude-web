import axios from "axios";

interface GetEnergiesType {
    body: number;
    emotions: number;
    mind: number;
    soul: number;
}

export const getEnergies = async (token: string): Promise<GetEnergiesType> => {
    const getEnergiesUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:5030/api/stats/statistics/energy"
            : "https://gamitude.rocks/api/stats/statistics/energy";
    const getEnergiesHeaders = (token: string) => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const response = await axios.get(getEnergiesUrl, getEnergiesHeaders(token));
    const result = await response.data.data;
    return result;
};

interface GetStatsType {
    strength: number;
    creativity: number;
    intelligence: number;
    fluency: number;
}

export const getStats = async (token: string): Promise<GetStatsType> => {
    const getStatsUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:5030/api/stats/statistics/stats"
            : "https://gamitude.rocks/api/stats/statistics/stats";

    const getStatsHeaders = (token: string) => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const response = await axios.get(getStatsUrl, getStatsHeaders(token));
    const result = await response.data.data;
    return result;
};
