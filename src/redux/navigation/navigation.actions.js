import { NavigationActionTypes } from "./navigation.types";

export const setTab = value => ({
    type: NavigationActionTypes.SET_TAB,
    payload: value,
});
