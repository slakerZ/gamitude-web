import { JournalsActionTypes } from "./journals.types";

const INITIAL_STATE = {
    journals: [],
};

const journalsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case JournalsActionTypes.SET_JOURNALS:
            return {
                ...state,
                journals: action.payload,
            };
        case JournalsActionTypes.ADD_JOURNAL:
            return {
                ...state,
                journals: [...state.journals, action.payload],
            };
        default:
            return state;
    }
};

export default journalsReducer;
