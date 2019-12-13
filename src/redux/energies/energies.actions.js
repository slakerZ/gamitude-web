import { EnergiesActionTypes } from "./energies.types";

export const setBody = value => ({
    type: EnergiesActionTypes.SET_BODY,
    payload: value,
});

export const setEmotions = value => ({
    type: EnergiesActionTypes.SET_EMOTIONS,
    payload: value,
});
