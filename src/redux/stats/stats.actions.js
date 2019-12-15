import { StatsActionTypes } from "./stats.types";

export const setStrength = value => ({
    type: StatsActionTypes.SET_STRENGTH,
    payload: value,
});

export const setCreativity = value => ({
    type: StatsActionTypes.SET_CREATIVITY,
    payload: value,
});

export const setIntelligence = value => ({
    type: StatsActionTypes.SET_INTELLIGENCE,
    payload: value,
});

export const setFluency = value => ({
    type: StatsActionTypes.SET_FLUENCY,
    payload: value,
});
