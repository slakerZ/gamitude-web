import { MethodsActionTypes } from "./methods.types";

export const setSelectedMethod = (value: any) => ({
    type: MethodsActionTypes.SET_SELECTED_METHOD,
    payload: value,
});
