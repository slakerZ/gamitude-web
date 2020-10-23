import { RootState } from "../root.reducer";

export const selectSessionInProgress = (state: RootState) =>
    state.session.sessionInProgress;
export const selectSessionsComplete = (state: RootState) =>
    state.session.sessionsComplete;
export const selectSessionType = (state: RootState) =>
    state.session.sessionType;
