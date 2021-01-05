import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
    token: null,
    tooltipToggle: true,
    boughtRanks: [],
};

const userReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return {
                ...state,
                ...action.payload,
            };
        case UserActionTypes.SET_TOOLTIP_TOGGLE:
            return {
                ...state,
                ...action.payload,
            };
        case UserActionTypes.ADD_BOUGHT_RANK:
            return {
                ...state,
                boughtRanks: [...state.boughtRanks, action.payload],
            };
        default:
            return state;
    }
};

export default userReducer;
