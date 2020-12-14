import { TimerVariants, ProjectVariants } from "configs/types";

export const STATS = ["STRENGTH", "CREATIVITY", "INTELLIGENCE", "FLUENCY"];

export const ENERGIES = ["BODY", "EMOTIONS", "MIND", "SOUL"];

export const ProjectSessionTypes: ProjectVariants = {
    STAT: "STAT",
    ENERGY: "ENERGY",
};

export const TimerTypes: TimerVariants = {
    STOPWATCH: "STOPWATCH",
    TIMER: "TIMER",
};

export const INCLUDE_LOWERCASE_REGEX = /(?=.*[a-z])/;
export const INCLUDE_UPPERCASE_REGEX = /(?=.*[A-Z])/;
export const INCLUDE_NUMERIC_REGEX = /(?=.*[0-9])/;
