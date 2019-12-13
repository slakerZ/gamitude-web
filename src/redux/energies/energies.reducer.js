import { EnergiesActionTypes } from "./energies.types";

const INITIAL_STATE = {
    body: 100,
    emotions: 100,
    mind: 100,
    soul: 100,
};

const energiesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EnergiesActionTypes.SET_BODY:
            return {
                ...state,
                body: action.payload,
            };
        case EnergiesActionTypes.SET_EMOTIONS:
            return {
                ...state,
                emotions: action.payload,
            };
        default:
            return state;
    }
};

export default energiesReducer;
