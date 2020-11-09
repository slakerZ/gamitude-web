import { MethodsReducerType } from "./types";
import { MethodsActionTypes } from "./methods.types";

const INITIAL_STATE: MethodsReducerType = {
    selectedMethod: {
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
    methods: [],
};

const methodsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case MethodsActionTypes.SET_SELECTED_METHOD:
            return {
                ...state,
                selectedMethod: state.methods[action.payload],
            };
        case MethodsActionTypes.ADD_TIMER:
            return {
                ...state,
                methods: [...state.methods, action.payload],
            };
        default:
            return state;
    }
};

export default methodsReducer;
