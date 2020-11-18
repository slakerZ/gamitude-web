import { ReduxStateType } from "../root.reducer";

export const selectSelectedTimer = (state: ReduxStateType) =>
    state.timers.selectedTimer;

export const selectTimers = (state: ReduxStateType) => state.timers.timers;
