import { UserActionTypes } from "./user.types";

export const setUser = (value: any) => ({
    type: UserActionTypes.SET_USER,
    payload: value,
});
