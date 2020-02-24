import { StatsActionTypes } from "./stats.types";

export const setStats = value => ({
    type: StatsActionTypes.SET_STATS,
    payload: value,
});
