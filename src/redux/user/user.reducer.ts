import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
    date_expires: "",
    token: null,
    tooltipToggle: true,
    user: null,
    userId: "",
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
        case UserActionTypes.SET_USER_FLAG:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
