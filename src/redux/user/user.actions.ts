import { UserActionTypes } from "./user.types";

export const setUser = (value: any) => ({
    type: UserActionTypes.SET_USER,
    payload: value,
});

export const setTooltipToggle = (value: any) => ({
    type: UserActionTypes.SET_TOOLTIP_TOGGLE,
    payload: value,
});
