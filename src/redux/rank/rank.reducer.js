import RANKS_DATA from "./rank.data.js";

const INITIAL_STATE = {
    ...RANKS_DATA,
};

const rankReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default rankReducer;
