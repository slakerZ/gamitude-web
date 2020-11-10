import { EnergyType } from "types";
import { StatType } from "types";
import { ProjectSessionType } from "types";

export interface FullProjectType {
    id: string;
    name: string;
    folderId: string;
    defaultTimerId: string;
    projectType: string;
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
    projectType: string;
    dominantStat: StatType | EnergyType | string;
    stats: StatType[] | EnergyType[] | any[];
    daysPerWeek: number;
    hoursPerDay: number;
    dayInterval: number;
}

export interface ProjectResponseBodyType {
    data: FullProjectType[] | FullProjectType;
    success: boolean;
}
