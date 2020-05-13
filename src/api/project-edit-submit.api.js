export const url = id => {
    return process.env.NODE_ENV === "development"
        ? `http://localhost:5010/api/pro/Projects/${id}`
        : `http://gamitude.rocks/api/pro/Projects/${id}`;
};

export const headers = token => ({
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    },
});

export const request_body = (name, method, boosted, dominant) => ({
    Name: name,
    PrimaryMethod: mapMethodToPrimaryMethod(method),
    Stats: mapBoostedToStats(boosted),
    DominantStat: mapDominantToDominantStat(dominant),
});

const mapMethodToPrimaryMethod = method => {
    switch (method) {
        case 25:
            return "POMODORO";
        case 90:
            return "NINETY";
        default:
            return "POMODORO";
    }
};
const mapBoostedToStats = boosted => {
    return boosted.map(stat => {
        return stat.toUpperCase();
    });
};

const mapDominantToDominantStat = dominant => {
    return dominant.toUpperCase();
};
