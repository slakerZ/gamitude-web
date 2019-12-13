import { combineReducers } from "redux";
// Reducers
import energiesReducer from "./energies/energies.reducer";
import statsReducer from "./stats/stats.reducer";

export default combineReducers({
    energies: energiesReducer,
    stats: statsReducer,
});
