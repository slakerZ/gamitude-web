export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5030/api/stats/time"
        : "http://gamitude.rocks:31779/api/stats/time";

export const headers = token => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});

// WARN Currently projects don't have type field
// WARN I was lazy so I've just put in the method is there a window for cheating?
export const request_body = (id, method, boosted, dominant) => ({
    ProjectId: id,
    ProjectType: "STATS",
    Duration: method,
    Stats: mapBoostedToStats(boosted),
    DominantStat: mapDominantToDominantStat(dominant),
});

const mapBoostedToStats = boosted => {
    return boosted.map(stat => {
        return stat.toUpperCase();
    });
};

const mapDominantToDominantStat = dominant => {
    return dominant.toUpperCase();
};