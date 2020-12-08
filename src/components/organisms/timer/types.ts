import { FullProjectType } from "api/projects/types";
import { TimerType } from "api/timers/types";

export interface TimerPropTypes {
    selectedProject: FullProjectType;
    selectedTimer: TimerType;
    setSelectedTimer: any;
    timers: TimerType[];
    setSessionInProgress: any;
    sessionInProgress: boolean;
    token: string;
    incrementSessionsComplete: any;
    setSessionType: any;
    setSnackbarState: any;
    sessionsComplete: number;
    isBreak: boolean;
    toggleIsBreak: any;
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
    onClick: any;
}

export interface TimerBadgedPropTypes {
    children: any;
    selectedTimer: TimerType;
    selectedProject: FullProjectType;
    sessionInProgress: boolean;
    handleOvertime: any;
    handleSkipBreak: any;
}
