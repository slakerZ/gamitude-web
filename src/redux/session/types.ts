export interface SessionMethodType {
    label: string;
    name: string;
    minutes: number;
    shortBreak: number;
    hasLongBreak: boolean;
    longBreak: number | undefined;
    longBreakInterval: number | undefined;
    type: "timer" | "stopwatch";
}

export interface SessionType {
    sessionInProgress: boolean;
    sessionsComplete: number;
    sessionType: "stat" | "energy";
    sessionMethod: SessionMethodType;
}
