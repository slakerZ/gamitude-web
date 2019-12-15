import { StatsActionTypes } from "./stats.types";

const INITIAL_STATE = {
    strength: 100,
    creativity: 100,
    intelligence: 100,
    fluency: 100,
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
