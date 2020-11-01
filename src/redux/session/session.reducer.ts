import { SessionActionTypes } from "./session.types";
import { SessionType } from "./types";

const INITIAL_STATE: SessionType = {
    sessionInProgress: false,
    sessionsComplete: 0,
    sessionType: "STAT",
};

const sessionReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SessionActionTypes.SET_SESSION_IN_PROGRESS:
            return {
                ...state,
                sessionInProgress: action.payload,
            };
        case SessionActionTypes.SET_SESSIONS_COMPLETE:
            return {
                ...state,
                sessionsComplete: action.payload,
            };
        case SessionActionTypes.SET_SESSION_TYPE:
            return {
                ...state,
                sessionType: action.payload,
            };
        default:
            return state;
    }
};

export default sessionReducer;
