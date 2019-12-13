import { StatsActionTypes } from "./stats.types";

export const setStrength = value => ({
    type: StatsActionTypes.SET_STRENGTH,
    payload: value,
});
