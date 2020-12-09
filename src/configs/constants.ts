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
