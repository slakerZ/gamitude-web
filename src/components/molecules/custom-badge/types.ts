import { ReactNode } from "react";

import { FullProjectType } from "api/projects/types";
import { TimerType } from "api/timers/types";

export interface OvertimeBadgePropTypes {
    children: ReactNode;
    selectedTimer: TimerType;
    selectedProject: FullProjectType;
    sessionInProgress: boolean;
    handleOvertime: () => void;
    isBreak: boolean;
}

export interface DisplayBadgePropTypes {
    children: ReactNode;
    selectedTimer: TimerType;
}

export interface TimerBadgedPropTypes {
    children: ReactNode;
    handleOvertime: () => void;
}
