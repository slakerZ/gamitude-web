export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5030/api/stats/statistics/energy"
        : "http://gamitude.rocks/api/stats/statistics/energy";

export const headers = token => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});
