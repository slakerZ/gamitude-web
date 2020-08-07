export const url = (id: number) => {
    return process.env.NODE_ENV === "development"
        ? `http://localhost:5010/api/pro/Projects/${id}`
        : `https://gamitude.rocks/api/pro/Projects/${id}`;
};

export const headers = (token: string) => ({
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    },
});

export const request_body = (
    name: string,
    method: number,
    boosted: string[],
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
const mapBoostedToStats = (boosted: string[]) => {
    return boosted.map((stat) => {
        return stat.toUpperCase();
    });
};

const mapDominantToDominantStat = (dominant: string) => {
    return dominant.toUpperCase();
};
