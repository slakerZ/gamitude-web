import UIFX_DATA from "./uifx.data.js";

const INITIAL_STATE = {
    projectSounds: UIFX_DATA,
};

const uifxReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default uifxReducer;
