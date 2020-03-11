import { SessionActionTypes } from "./session.types";

export const setBreakInProgress = value => ({
    type: SessionActionTypes.SET_BREAK_IN_PROGRESS,
    payload: value,
});

export const setSessionInProgress = value => ({
    type: SessionActionTypes.SET_SESSION_IN_PROGRESS,
    payload: value,
});

export const setSessionsComplete = value => ({
    type: SessionActionTypes.SET_SESSIONS_COMPLETE,
    payload: value,
});

export const setBreakTime = value => ({
    type: SessionActionTypes.SET_BREAK_TIME,
    payload: value,
});
