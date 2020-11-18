import { ReduxStateType } from "redux/root.reducer";

export const selectSessionInProgress = (state: ReduxStateType) =>
    state.session.sessionInProgress;
export const selectSessionsComplete = (state: ReduxStateType) =>
    state.session.sessionsComplete;
export const selectSessionType = (state: ReduxStateType) =>
    state.session.sessionType;
