import { EnergiesActionTypes } from "./energies.types";

export const setEnergies = (value: any) => ({
    type: EnergiesActionTypes.SET_ENERGIES,
    payload: value,
});
