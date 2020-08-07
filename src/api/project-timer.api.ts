export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5030/api/stats/time"
        : "https://gamitude.rocks/api/stats/time";

export const headers = (token: string) => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});

// WARN Currently projects don't have type field
// WARN I was lazy so I've just put in the method is there a window for cheating?
export const request_body = (
    id: number,
    totalTime: number,
    boosted: string[],
    dominant: string,
) => ({
    ProjectId: id,
    ProjectType: "STATS",
    Duration: totalTime,
    Stats: mapBoostedToStats(boosted),
    DominantStat: mapDominantToDominantStat(dominant),
});

const mapBoostedToStats = (boosted: string[]) => {
    return boosted.map((stat) => {
        return stat.toUpperCase();
    });
};

const mapDominantToDominantStat = (dominant: string) => {
    return dominant.toUpperCase();
};
