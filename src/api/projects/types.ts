import { EnergyType } from "redux/energies/types";
import { StatType } from "redux/stats/types";

export type ProjectTypeType = "STAT" | "ENERGY";

export interface FullProjectType {
    id: string;
    name: string;
    folderId: string;
    defaultTimerId: string;
    projectType: ProjectTypeType;
    dominantStat: StatType | EnergyType;
    stats: StatType[] | EnergyType[];
    totalTimeSpend: number;
    totalTimeSpendBreak: number;
    daysPerWeek: number;
    hoursPerDay: number;
    dayInterval: number;
    dateCreated: string;
}

export interface ProjectRequestBodyType {
    name: string;
    folderId: string;
    defaultTimerId: string;
    projectType: ProjectTypeType;
    dominantStat: StatType | EnergyType;
    stats: StatType[] | EnergyType[];
    daysPerWeek: number;
    hoursPerDay: number;
    dayInterval: number;
}

export interface ProjectResponseBodyType {
    data: FullProjectType[] | FullProjectType;
    success: boolean;
}
