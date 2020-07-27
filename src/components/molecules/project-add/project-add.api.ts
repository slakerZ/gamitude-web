export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5010/api/pro/Projects"
        : "http://gamitude.rocks:31778/api/pro/Projects";

export const headers = (token) => ({
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    },
});
export const request_data = {
    Name: "New Project",
    PrimaryMethod: "POMODORO",
    ProjectStatus: "ACTIVE",
    Stats: ["INTELLIGENCE"],
    DominantStat: "INTELLIGENCE",
};
