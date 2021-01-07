import { ReduxStateType } from "redux/root.reducer";

export const selectSessionInProgress = (state: ReduxStateType): boolean =>
    state.session.sessionInProgress;
export const selectSessionsComplete = (state: ReduxStateType): number =>
    state.session.sessionsComplete;
export const selectSessionType = (state: ReduxStateType): string =>
    state.session.sessionType;
export const selectIsBreak = (state: ReduxStateType): boolean =>
    state.session.isBreak;
