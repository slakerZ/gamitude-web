import { FullProjectType } from "api/projects/types";
import { TimerType } from "api/timers/types";

export interface TimerPropTypes {
    selectedProject: any;
    selectedTimer: any;
    setSelectedTimer: any;
    timers: any;
    setSessionInProgress: any;
    sessionInProgress: any;
    token: any;
    incrementSessionsComplete: any;
    setSessionType: any;
    setSnackbarState: any;
}

export interface MsToMinutesType {
    minutes: number;
    seconds: number;
}

export interface BadgePropTypes {
    children: any;
    selectedTimer: TimerType;
    selectedProject: FullProjectType;
    sessionInProgress: boolean;
    handleOvertime: any;
}
