import { ProjectSessionTypes } from "configs/constants";

import { SessionActionTypes, SessionReducerType } from "./session.types";

const INITIAL_STATE = {
    sessionInProgress: false,
    sessionsComplete: 0,
    sessionType: "STAT",
    isBreak: false,
};

const sessionReducer = (
    state = INITIAL_STATE,
    action: any,
): SessionReducerType => {
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
        case SessionActionTypes.INCREMENT_SESSIONS_COMPLETE:
            return {
                ...state,
                sessionsComplete: state.sessionsComplete + 1,
            };
        case SessionActionTypes.SET_IS_BREAK:
            return {
                ...state,
                isBreak: action.payload,
            };
        case SessionActionTypes.TOGGLE_IS_BREAK:
            return {
                ...state,
                isBreak: !state.isBreak,
            };
        case SessionActionTypes.TOGGLE_SESSION_TYPE:
            return {
                ...state,
                sessionType:
                    state.sessionType === ProjectSessionTypes.ENERGY
                        ? ProjectSessionTypes.STAT
                        : ProjectSessionTypes.ENERGY,
            };
        default:
            return state;
    }
};

export default sessionReducer;
