import { SessionActionTypes } from "./session.types";

const INITIAL_STATE = {
    sessionInProgress: false,
    breakInProgress: false,
    sessionsComplete: 0,
};

const sessionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SessionActionTypes.SET_BREAK_IN_PROGRESS:
            return {
                ...state,
                breakInProgress: action.payload,
            };
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
        default:
            return state;
    }
};

export default sessionReducer;
