export const urlEdit = (id: number) => {
    return process.env.NODE_ENV === "development"
        ? `http://localhost:5010/api/pro/Projects/${id}`
        : `http://gamitude.rocks:31778/api/pro/Projects/${id}`;
};

export const headersEdit = (token: string) => ({
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    },
});

export const request_bodyEdit = (
    name: string,
    method: number,
    boosted: [],
    dominant: string,
) => ({
    Name: name,
    PrimaryMethod: mapMethodToPrimaryMethod(method),
    Stats: mapBoostedToStats(boosted),
    DominantStat: mapDominantToDominantStat(dominant),
});

const mapMethodToPrimaryMethod = (method: number) => {
    switch (method) {
        case 25:
            return "POMODORO";
        case 90:
            return "NINETY";
        default:
            return "POMODORO";
    }
};
const mapBoostedToStats = (boosted: []) => {
    return boosted.map((stat: string) => {
        return stat.toUpperCase();
    });
};

const mapDominantToDominantStat = (dominant: string) => {
    return dominant.toUpperCase();
};
