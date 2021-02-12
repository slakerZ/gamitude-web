import { TimersActionTypes } from "./timers.types";

const INITIAL_STATE = {
    selectedTimer: {
        label: "",
        id: "",
        userId: "",
        name: "",
        countDownInfo: {
            breakTime: 0,
            longerBreakTime: 0,
            breakInterval: 0,
            overTime: 5,
            workTime: 0,
        },
    },
    timers: [
        {
            label: "",
            id: "",
            userId: "",
            name: "",
            countDownInfo: {
                breakTime: 0,
                longerBreakTime: 0,
                breakInterval: 0,
                overTime: 5,
                workTime: 0,
            },
        },
    ],
};

const timersReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case TimersActionTypes.SET_SELECTED_TIMER:
            return {
                ...state,
                selectedTimer: action.payload,
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
        case TimersActionTypes.SET_SELECTED_TIMER_BY_ID:
            return {
                ...state,
                selectedTimer:
                    state.timers.find((timer) => timer.id === action.payload) ||
                    state.selectedTimer,
            };
        default:
            return state;
    }
};

export default timersReducer;
