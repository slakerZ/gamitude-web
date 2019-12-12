import { combineReducers } from "redux";
// Reducers
import statsAndEnergiesReducer from "./stats-and-energies/stats-and-energies.reducer";

export default combineReducers({
    statsAndEnergies: statsAndEnergiesReducer,
});
