export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5030/api/stats/statistics/stats"
        : "http://gamitude.rocks:31779/api/stats/statistics/stats";

export const headers = token => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});
