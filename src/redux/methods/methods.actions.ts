import { MethodsActionTypes } from "./methods.types";

export const setSelectedMethod = (value: any) => ({
    type: MethodsActionTypes.SET_SELECTED_METHOD,
    payload: value,
});

export const setMethods = (value: any) => ({
    type: MethodsActionTypes.SET_METHODS,
    payload: value,
});
