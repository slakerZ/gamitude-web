import { NavigationActionTypes } from "./navigation.types";

const INITIAL_STATE = {
    tab: 0,
};

const navigationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NavigationActionTypes.SET_TAB:
            return {
                ...state,
                tab: action.payload,
            };
        default:
            return state;
    }
};

export default navigationReducer;
