import axios from "axios";

import { API_ENDPOINT } from "api/constants";

import {
    StatisticsStatsResponseBodyType,
    StatisticsEnergiessResponseBodyType,
} from "./types";

const ENDPOINT = `${API_ENDPOINT}/statistics`;

export const getStats = async (
    token: string,
): Promise<StatisticsStatsResponseBodyType> => {
    const url = `${ENDPOINT}/stats`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const getEnergies = async (
    token: string,
): Promise<StatisticsEnergiessResponseBodyType> => {
    const url = `${ENDPOINT}/energy`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};
