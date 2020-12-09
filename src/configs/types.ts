export type TierType = "S" | "A" | "B" | "C" | "D" | "E" | "F";

export type EnergyType = "BODY" | "EMOTIONS" | "MIND" | "SOUL";

export type StatType = "STRENGTH" | "CREATIVITY" | "INTELLIGENCE" | "FLUENCY";

export type ProjectSessionType = "STAT" | "ENERGY";

export type TimerVariantType = "STOPWATCH" | "TIMER";

export interface TimerVariants {
    STOPWATCH: TimerVariantType;
    TIMER: TimerVariantType;
}

export interface ProjectVariants {
    ENERGY: ProjectSessionType;
    STAT: ProjectSessionType;
}
