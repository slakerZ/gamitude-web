export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5030/api/stats/statistics/energy"
        : "https://gamitude.rocks/api/stats/statistics/energy";

export const headers: Function = (token: string) => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});