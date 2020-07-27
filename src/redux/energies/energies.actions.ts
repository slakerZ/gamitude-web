import { EnergiesActionTypes } from "./energies.types";

export const setEnergies = (value) => ({
    type: EnergiesActionTypes.SET_ENERGIES,
    payload: value,
});
