import { StatsActionTypes } from "./stats.types";

const INITIAL_STATE = {
    strength: 0,
    creativity: 0,
    intelligence: 0,
    fluency: 0,
};

const statsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case StatsActionTypes.SET_STATS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

export default statsReducer;
