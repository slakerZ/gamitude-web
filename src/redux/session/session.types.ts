export const SessionActionTypes = {
    SET_SESSION_IN_PROGRESS: "SET_SESSION_IN_PROGRESS",
    SET_SESSIONS_COMPLETE: "SET_SESSIONS_COMPLETE",
    SET_SESSION_TYPE: "SET_SESSION_TYPE",
    TOGGLE_SESSION_TYPE: "TOGGLE_SESSION_TYPE",
    INCREMENT_SESSIONS_COMPLETE: "INCREMENT_SESSIONS_COMPLETE",
    SET_IS_BREAK: "SET_IS_BREAK",
    TOGGLE_IS_BREAK: "TOGGLE_IS_BREAK",
};

export interface SessionReducerType {
    sessionInProgress: boolean;
    sessionsComplete: number;
    sessionType: string;
    isBreak: boolean;
}
