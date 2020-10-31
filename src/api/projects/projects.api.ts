import {
    mapMethodToPrimaryMethod,
    mapBoostedToStats,
    mapDominantToDominantStat,
} from "../mappings";
import { DEV_ENDPOINT, PROD_ENDPOINT } from "../constants";

export const getAddProjectsUrl =
    process.env.NODE_ENV === "development"
        ? `${DEV_ENDPOINT}/pro/Projects`
        : `${PROD_ENDPOINT}/pro/Projects`;

export const getProjectsHeaders = (token: string) => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});

export const putDeleteProjectUrl = (id: number) => {
    return process.env.NODE_ENV === "development"
        ? `${DEV_ENDPOINT}/pro/Projects/${id}`
        : `${PROD_ENDPOINT}/pro/Projects/${id}`;
};

export const putDeleteAddProjectHeaders = (token: string) => ({
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    },
});

export const putProjectRequestBody = (
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

export const addProjectRequestBody = (
    name: string,
    boosted: string[],
    dominant: string,
) => ({
    Name: name,
    PrimaryMethod: "POMODORO",
    ProjectStatus: "ACTIVE",
    Stats: mapBoostedToStats(boosted),
    DominantStat: mapDominantToDominantStat(dominant),
});