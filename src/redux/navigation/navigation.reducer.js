import { NavigationActionTypes } from "./navigation.types";

const INITIAL_STATE = {
    tab: 0,
    width: window.innerWidth,
};

const navigationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NavigationActionTypes.SET_TAB:
            return {
                ...state,
                tab: action.payload,
            };
        case NavigationActionTypes.SET_WIDTH:
            return {
                ...state,
                width: window.innerWidth,
            };
        default:
            return state;
    }
};

export default navigationReducer;
