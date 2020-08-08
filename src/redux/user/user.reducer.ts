import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
    token: null,
};

const userReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
