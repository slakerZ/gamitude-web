import { MethodsActionTypes } from "./methods.types";

export const setSelectedMethod = (value: any) => ({
    type: MethodsActionTypes.SET_SELECTED_METHOD,
    payload: value,
});

export const addTimer = (value: any) => ({
    type: MethodsActionTypes.ADD_TIMER,
    payload: value,
});
