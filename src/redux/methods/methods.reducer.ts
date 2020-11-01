import { MethodType, MethodsReducerType } from "./types";
import { MethodsActionTypes } from "./methods.types";
import { METHODS } from "./constants";

const INITIAL_STATE: MethodsReducerType = {
    selectedMethod: {
        label: "",
        name: "",
        type: "TIMER",
        minutes: 0,
        shortBreak: 0,
        hasLongBreak: false,
        longBreak: 0,
        longBreakInterval: 0,
    },
    methods: METHODS,
};

const methodsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case MethodsActionTypes.SET_SELECTED_METHOD:
            return {
                ...state,
                selectedMethod: state.methods[action.payload],
            };
        case MethodsActionTypes.SET_METHODS:
            return {
                ...state,
                methods: [...state.methods, action.payload],
            };
        default:
            return state;
    }
};

export default methodsReducer;
