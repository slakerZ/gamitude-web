import { ReactNode } from "react";

import { ProjectType } from "api/projects/types";
import { TimerType } from "api/timers/types";

export interface OvertimeBadgePropTypes {
    children: ReactNode;
    selectedTimer: TimerType;
    selectedProject: ProjectType;
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

interface RankType {
    name: string;
    tier: string;
    imageUrl: string;
}

export interface RankTierBadgePropTypes {
    children: ReactNode;
    rank: RankType;
    getCurrentRankState: any;
}
