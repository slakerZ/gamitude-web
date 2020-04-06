export const url = id => {
    return process.env.NODE_ENV === "development"
        ? `http://localhost:5010/api/pro/Projects/${id}`
        : `http://gamitude.rocks:31778/api/pro/Projects/${id}`;
};

export const headers = token => ({
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    },
});

export const request_body = (name, method, status, boosted, dominant) => ({
    Name: name,
    PrimaryMethod: mapMethodToPrimaryMethod(method),
    ProjectStatus: mapStatusToProjectStatus(status),
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
const mapStatusToProjectStatus = status => {
    switch (status) {
        case 0:
            return "ACTIVE";
        case 1:
            return "ONHOLD";
        case 2:
            return "DONE";
        default:
            return "ACTIVE";
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
