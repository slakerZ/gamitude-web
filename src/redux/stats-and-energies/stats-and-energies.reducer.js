const INITIAL_STATE = {
    body: 40,
    emotions: 100,
    mind: 100,
    soul: 100,
    strength: 0,
    creativity: 0,
    intelligence: 0,
    fluency: 0,
};

const statsAndEnergiesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_BODY_ENERGY":
            return {
                ...state,
                body: action.payload,
            };
        default:
            return state;
    }
};

export default statsAndEnergiesReducer;
