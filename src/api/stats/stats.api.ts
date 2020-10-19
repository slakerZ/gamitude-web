import axios from "axios";
import { mapBoostedToStats, mapDominantToDominantStat } from "../mappings";
import {
    LogTimeValuesType,
    LogTimeRequestBodyType,
    LogTimeHeadersType,
    GetRankType,
    GetEnergiesType,
    GetStatsType,
} from "./types";

const DEV_ENDPOINT = `${process.env.REACT_APP_DEV_ENDPOINT}:5030/api`;
const PROD_ENDPOINT = process.env.REACT_APP_PRODUCTION_ENDPOINT;

// Url
export const logTimeUrl =
    process.env.NODE_ENV === "development"
        ? `${DEV_ENDPOINT}/stats/time`
        : `${PROD_ENDPOINT}/stats/time`;

// Headers
export const logTimeHeaders = (token: string): LogTimeHeadersType => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});

// Request Body
export const logTimeRequestBody = ({
    id,
    totalTime,
    boosted,
    dominant,
}: LogTimeValuesType): LogTimeRequestBodyType => ({
    ProjectId: id,
    ProjectType: "STATS",
    Duration: totalTime,
    Stats: mapBoostedToStats(boosted),
    DominantStat: mapDominantToDominantStat(dominant),
});

// Functions
export const getRank = async (token: string): Promise<GetRankType> => {
    const getRankUrl =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/stats/UserRank/rank`
            : `${PROD_ENDPOINT}/stats/UserRank/rank`;

    const getRankHeaders = (token: string) => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const response = await axios.get(getRankUrl, getRankHeaders(token));
    const result = await response.data.data;
    return result;
};

export const getEnergies = async (token: string): Promise<GetEnergiesType> => {
    const getEnergiesUrl =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/stats/statistics/energy`
            : `${PROD_ENDPOINT}/stats/statistics/energy`;
    const getEnergiesHeaders = (token: string) => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const response = await axios.get(getEnergiesUrl, getEnergiesHeaders(token));
    const result = await response.data.data;
    return result;
};

export const getStats = async (token: string): Promise<GetStatsType> => {
    const getStatsUrl =
        process.env.NODE_ENV === "development"
            ? `${DEV_ENDPOINT}/stats/statistics/stats`
            : `${PROD_ENDPOINT}/stats/statistics/stats`;

    const getStatsHeaders = (token: string) => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const response = await axios.get(getStatsUrl, getStatsHeaders(token));
    const result = await response.data.data;
    return result;
};
