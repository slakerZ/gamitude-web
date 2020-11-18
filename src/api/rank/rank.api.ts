import axios from "axios";
import { API_ENDPOINT } from "api/constants";
import { RankResponseBodyType, FullRankType } from "./types";

const ENDPOINT = `${API_ENDPOINT}/rank`;

export const getRanks = async (
    token: string,
    page: number,
    limit: number,
    sortBy: Partial<FullRankType>,
): Promise<RankResponseBodyType> => {
    const params = `?page=${page}&limit=${limit}&sortBy=${sortBy}`;
    const url = `${ENDPOINT}/${params}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const getUsersRanks = async (
    token: string,
): Promise<RankResponseBodyType> => {
    const url = `${ENDPOINT}/user`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};

export const getUsersCurrentRank = async (
    token: string,
): Promise<RankResponseBodyType> => {
    const url = `${ENDPOINT}/current`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);
    const result = await response.data;
    return result;
};
