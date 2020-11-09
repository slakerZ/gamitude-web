import { TimerType } from "api/timers/types";

export interface TimersReducerType {
    selectedTimer: TimerType;
    timers: TimerType[];
}
