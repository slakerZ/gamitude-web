import { ReduxStateType } from "redux/root.reducer";

export const selectJournals = (state: ReduxStateType) =>
    state.journals.journals;
