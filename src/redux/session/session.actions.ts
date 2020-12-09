import { SessionActionTypes } from "./session.types";

export const setSessionInProgress = (value: any) => ({
    type: SessionActionTypes.SET_SESSION_IN_PROGRESS,
    payload: value,
});

export const setSessionsComplete = (value: any) => ({
    type: SessionActionTypes.SET_SESSIONS_COMPLETE,
    payload: value,
});

export const setSessionType = (value: string) => ({
    type: SessionActionTypes.SET_SESSION_TYPE,
    payload: value,
});

export const toggleSessionType = () => ({
    type: SessionActionTypes.TOGGLE_SESSION_TYPE,
});

export const incrementSessionsComplete = () => ({
    type: SessionActionTypes.INCREMENT_SESSIONS_COMPLETE,
});

export const setIsBreak = (value: boolean) => ({
    type: SessionActionTypes.SET_IS_BREAK,
    payload: value,
});

export const toggleIsBreak = () => ({
    type: SessionActionTypes.TOGGLE_IS_BREAK,
});
