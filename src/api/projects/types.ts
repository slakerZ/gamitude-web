import { EnergyType, ProjectSessionType } from "configs/types";
import { StatType } from "configs/types";

export interface ProjectType {
    id: string;
    name: string;
    folderId: string;
    defaultTimerId: string;
    projectType: ProjectSessionType;
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
    data: ProjectType[] | ProjectType;
    success: boolean;
}
