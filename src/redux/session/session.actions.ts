import { SessionActionTypes } from "./session.types";

export const setBreakInProgress = (value: any) => ({
    type: SessionActionTypes.SET_BREAK_IN_PROGRESS,
    payload: value,
});

export const setSessionInProgress = (value: any) => ({
    type: SessionActionTypes.SET_SESSION_IN_PROGRESS,
    payload: value,
});

export const setSessionsComplete = (value: any) => ({
    type: SessionActionTypes.SET_SESSIONS_COMPLETE,
    payload: value,
});

export const setBreakTime = (value: any) => ({
    type: SessionActionTypes.SET_BREAK_TIME,
    payload: value,
});

export const setProjectsTab = (value: any) => ({
    type: SessionActionTypes.SET_PROJECTS_TAB,
    payload: value,
});
