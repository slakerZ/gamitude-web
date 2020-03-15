import { UserActionTypes } from "./user.types";

export const setUser = value => ({
    type: UserActionTypes.SET_USER,
    payload: value,
});
