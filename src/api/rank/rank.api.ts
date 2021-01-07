import axios from "axios";

import { API_ENDPOINT } from "api/constants";

import { RankResponseBodyType, CurrencyTypes } from "./types";

const ENDPOINT = `${API_ENDPOINT}/rank`;

export const getRanks = async (
    token: string,
    page: number,
    limit: number,
    sortBy: string,
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

export const postRankPurchase = async (
    token: string,
    id: string,
    currency: CurrencyTypes,
): Promise<any> => {
    const url = `${ENDPOINT}/purchase`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const requestBody = {
        id: id,
        currency: currency,
    };

    const response = await axios.post(url, requestBody, config);
    const result = await response.data;
    return result;
};

export const postRankSelection = async (
    token: string,
    rankId: string,
): Promise<any> => {
    const url = `${ENDPOINT}/select`;
    const requestBody = {
        id: rankId,
    };
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(url, requestBody, config);
    const result = await response.data;
    return result;
};
