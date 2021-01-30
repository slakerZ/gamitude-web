import { TimerType } from "api/timers/types";

export interface TimersPropType {
    timers: TimerType[];
    setSelectedTimerById: (newId: string) => null;
    selectedTimer: TimerType;
    token: string;
    setTimers: any;
    setSnackbarState: any;
    sessionInProgress: boolean;
    isBreak: boolean;
    isTimerSettingsDialogOpen: boolean;
    setTimerSettingsDialogOpen: any;
}
