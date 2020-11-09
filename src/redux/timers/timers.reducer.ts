import { TimersReducerType } from "./types";
import { TimersActionTypes } from "./timers.types";

const INITIAL_STATE: TimersReducerType = {
    selectedTimer: {
        label: "",
        id: "",
        userId: "",
        name: "",
        workTime: 0,
        breakTime: 0,
        longerBreakTime: 0,
        breakInterval: 0,
        overTime: 5,
    },
    timers: [],
};

const timersReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case TimersActionTypes.SET_SELECTED_TIMER:
            return {
                ...state,
                selectedTimer: state.timers[action.payload],
            };
        case TimersActionTypes.ADD_TIMER:
            return {
                ...state,
                timers: [...state.timers, action.payload],
            };
        case TimersActionTypes.SET_TIMERS:
            return {
                ...state,
                timers: action.payload,
            };
        default:
            return state;
    }
};

export default timersReducer;
