import { StatsActionTypes } from "./stats.types";

export const setStats = (value: any) => ({
    type: StatsActionTypes.SET_STATS,
    payload: value,
});
