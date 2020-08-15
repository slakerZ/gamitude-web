import axios from "axios";

interface GetRankType {
    name: string;
    tier: string;
    imageUrl: string;
    rankFortes: string[];
}

export const getRank = async (token: string): Promise<GetRankType> => {
    const getRankUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:5030/api/stats/UserRank/rank"
            : "https://gamitude.rocks/api/stats/UserRank/rank";

    const getRankHeaders = (token: string) => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const response = await axios.get(getRankUrl, getRankHeaders(token));
    const result = await response.data.data;
    return result;
};
