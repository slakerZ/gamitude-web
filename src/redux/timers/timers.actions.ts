import { TimersActionTypes } from "./timers.types";

export const setSelectedTimer = (value: any) => ({
    type: TimersActionTypes.SET_SELECTED_TIMER,
    payload: value,
});

export const addTimer = (value: any) => ({
    type: TimersActionTypes.ADD_TIMER,
    payload: value,
});

export const setTimers = (value: any) => ({
    type: TimersActionTypes.SET_TIMERS,
    payload: value,
});

export const setSelectedTimerById = (value: string) => ({
    type: TimersActionTypes.SET_SELECTED_TIMER_BY_ID,
    payload: value,
});
