import {
    mapDominantStatToDominant,
    mapStatsToBoosted,
    mapDominantToDominantStat,
    mapBoostedToStats,
} from "./mappings";

export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5010/api/pro/Projects"
        : "https://gamitude.rocks/api/pro/Projects";

export const headers = token => ({
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    },
});
export const requestData = ({ name, boosted, dominant }) => ({
    Name: name,
    PrimaryMethod: "POMODORO",
    ProjectStatus: "ACTIVE",
    Stats: mapBoostedToStats(boosted),
    DominantStat: mapDominantToDominantStat(dominant),
});

export const convertForFront = responseData => ({
    id: responseData.id,
    name: responseData.name,
    method: 25,
    status: 0,
    boosted: mapStatsToBoosted(responseData.stats),
    dominant: mapDominantStatToDominant(responseData.dominantStat),
});
