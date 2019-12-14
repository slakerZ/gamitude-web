import { NavigationActionTypes } from "./navigation.types";

export const setTab = value => ({
    type: NavigationActionTypes.SET_TAB,
    payload: value,
});

export const setWidth = value => ({
    type: NavigationActionTypes.SET_WIDTH,
    payload: value,
});
