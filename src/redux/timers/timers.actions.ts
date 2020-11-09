import { TimersActionTypes } from "./timers.types";

export const setSelectedTimer = (value: any) => ({
    type: TimersActionTypes.SET_SELECTED_TIMER,
    payload: value,
});

export const addTimer = (value: any) => ({
    type: TimersActionTypes.ADD_TIMER,
    payload: value,
});
