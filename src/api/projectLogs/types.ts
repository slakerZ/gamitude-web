import { EnergyType } from "configs/types";
import { StatType } from "configs/types";

interface FullProjectLogType {
    id: string;
    projectId: string;
    projectTaskId: string;
    userId: string;
    projectType: any;
    log: string;
    timeSpend: number;
    dominantStat: EnergyType | StatType;
    stats: EnergyType[] | StatType[];
    dateCreated: string;
}

export interface ProjectLogRequestBodyType {
    projectId: string;
    projectTaskId: string | null;
    log: string;
    timeSpend: number;
    dominantStat: EnergyType | StatType;
    stats: EnergyType[] | StatType[];
    projectType: any;
}

export interface ProjectLogResponseBodyType {
    data: FullProjectLogType[] | FullProjectLogType;
    success: boolean;
}
