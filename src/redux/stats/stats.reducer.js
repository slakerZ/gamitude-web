import { StatsActionTypes } from "./stats.types";

const INITIAL_STATE = {
    strength: 0,
    creativity: 0,
    intelligence: 0,
    fluency: 0,
};

const statsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StatsActionTypes.SET_STRENGTH:
            return {
                ...state,
                strength: action.payload,
            };
        case StatsActionTypes.SET_CREATIVITY:
            return {
                ...state,
                creativity: action.payload,
            };
        case StatsActionTypes.SET_INTELLIGENCE:
            return {
                ...state,
                intelligence: action.payload,
            };
        case StatsActionTypes.SET_FLUENCY:
            return {
                ...state,
                fluency: action.payload,
            };
        default:
            return state;
    }
};

export default statsReducer;
