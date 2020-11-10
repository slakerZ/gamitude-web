import { SnackbarActionTypes } from "./snackbar.types";

const INITIAL_STATE = {
    message: "",
    severity: "info",
    open: false,
};

const snackbarReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SnackbarActionTypes.EDIT_MESSAGE:
            return {
                ...state,
                message: action.payload,
            };
        case SnackbarActionTypes.EDIT_SEVERITY:
            return {
                ...state,
                severity: action.payload,
            };
        case SnackbarActionTypes.SET_OPEN:
            return {
                ...state,
                open: action.payload,
            };
        default:
            return state;
    }
};

export default snackbarReducer;
