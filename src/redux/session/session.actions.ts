import { SessionActionTypes } from "./session.types";

export const setSessionInProgress = (value: any) => ({
    type: SessionActionTypes.SET_SESSION_IN_PROGRESS,
    payload: value,
});

export const setSessionsComplete = (value: any) => ({
    type: SessionActionTypes.SET_SESSIONS_COMPLETE,
    payload: value,
});

export const setSessionType = (value: any) => ({
    type: SessionActionTypes.SET_SESSION_TYPE,
    payload: value,
});
