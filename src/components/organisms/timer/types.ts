import { ProjectType } from "api/projects/types";
import { TimerType } from "api/timers/types";

export interface TimerPropTypes {
    selectedProject: ProjectType;
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
    setIsBreak: any;
}

export interface MsToMinutesType {
    minutes: number;
    seconds: number;
}
