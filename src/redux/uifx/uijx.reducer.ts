import UIFX_DATA from "./uifx.data";

const INITIAL_STATE = {
    projectSounds: UIFX_DATA,
};

const uifxReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default uifxReducer;