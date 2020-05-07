export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5030/api/stats/UserRank/rank"
        : "http://gamitude.rocks:31779/api/stats/UserRank/rank";

export const headers = token => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});
